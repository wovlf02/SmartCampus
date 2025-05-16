package com.smartcampus.back.service.community.chat;

import com.smartcampus.back.dto.community.chat.request.ChatJoinRequest;
import com.smartcampus.back.dto.community.chat.request.ChatRoomCreateRequest;
import com.smartcampus.back.dto.community.chat.response.ChatParticipantDto;
import com.smartcampus.back.dto.community.chat.response.ChatRoomListResponse;
import com.smartcampus.back.dto.community.chat.response.ChatRoomResponse;
import com.smartcampus.back.entity.auth.User;
import com.smartcampus.back.entity.chat.ChatMessage;
import com.smartcampus.back.entity.chat.ChatParticipant;
import com.smartcampus.back.entity.chat.ChatRoom;
import com.smartcampus.back.entity.chat.ChatRoomType;
import com.smartcampus.back.global.exception.CustomException;
import com.smartcampus.back.global.exception.ErrorCode;
import com.smartcampus.back.repository.auth.UserRepository;
import com.smartcampus.back.repository.chat.ChatMessageRepository;
import com.smartcampus.back.repository.chat.ChatParticipantRepository;
import com.smartcampus.back.repository.chat.ChatRoomRepository;
import com.smartcampus.back.security.auth.CustomUserDetails;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * 채팅방 서비스
 * - 생성, 입장, 퇴장, 목록 및 상세 조회 등 전체 채팅방 흐름 처리
 */
@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final FileUploadService fileUploadService;

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) throw new CustomException("로그인 정보가 없습니다.");

        Object principal = auth.getPrincipal();
        if (principal instanceof CustomUserDetails userDetails) {
            return userDetails.getUserId();
        }

        throw new CustomException("사용자 정보를 불러올 수 없습니다.");
    }

    private User getCurrentUser() {
        return userRepository.findById(getCurrentUserId())
                .orElseThrow(() -> new CustomException("사용자 정보를 불러올 수 없습니다."));
    }

    /**
     * 채팅방 생성
     *
     * @param request 생성 요청
     * @return 생성된 채팅방 정보
     */
    public ChatRoomResponse createChatRoom(ChatRoomCreateRequest request) {
        User creator = getCurrentUser(); // 현재 로그인 사용자
        List<Long> inviteeIds = request.getInvitedUserIds();

        if (inviteeIds == null || inviteeIds.isEmpty()) {
            throw new CustomException(ErrorCode.INVALID_CHATROOM_INVITEE);
        }

        ChatRoomType type = (inviteeIds.size() == 1) ? ChatRoomType.DIRECT : ChatRoomType.GROUP;

        // 1. 이미지가 존재하면 저장 처리
        String imageUrl = null;
        if (request.getImage() != null && !request.getImage().isEmpty()) {
            imageUrl = fileUploadService.storeChatRoomImage(request.getImage());
        }

        // 2. 채팅방 생성
        ChatRoom room = ChatRoom.builder()
                .name(request.getRoomName())
                .type(type)
                .createdAt(LocalDateTime.now())
                .representativeImageUrl(imageUrl)
                .build();

        chatRoomRepository.save(room);

        // 3. 채팅방 멤버 등록 (자기 자신 포함)
        List<User> members = userRepository.findAllById(
                Stream.concat(Stream.of(creator.getId()), inviteeIds.stream())
                        .distinct()
                        .toList()
        );

        List<ChatParticipant> chatMembers = members.stream()
                .map(user -> ChatParticipant.builder()
                        .chatRoom(room)
                        .user(user)
                        .joinedAt(LocalDateTime.now())
                        .build())
                .toList();

        chatParticipantRepository.saveAll(chatMembers);

        // 4. 응답 변환
        return toResponse(room);
    }



    /**
     * 사용자가 참여 중인 채팅방 목록 조회
     *
     * @param userId 사용자 ID
     * @return 채팅방 목록 DTO 리스트
     */
    public List<ChatRoomListResponse> getChatRoomsByUserId(Long userId) {
        User user = User.builder().id(userId).build();
        List<ChatParticipant> participants = chatParticipantRepository.findByUser(user);

        return participants.stream().map(participant -> {
            ChatRoom room = participant.getChatRoom();
            ChatMessage lastMessage = chatMessageRepository.findTopByChatRoomOrderBySentAtDesc(room);

            int unreadCount = chatMessageRepository.countByChatRoomAndSenderNotAndIdGreaterThan(
                    room, user, participant.getLastReadMessageId() != null ? participant.getLastReadMessageId() : 0L
            );

            return ChatRoomListResponse.builder()
                    .roomId(room.getId())
                    .roomName(room.getName())
                    .roomType(room.getType().name())
                    .lastMessage(lastMessage != null ? lastMessage.getContent() : null)
                    .lastMessageAt(lastMessage != null ? lastMessage.getSentAt() : null)
                    .participantCount(chatParticipantRepository.countByChatRoom(room))
                    .unreadCount(unreadCount)
                    .build();
        }).toList();
    }

    /**
     * 채팅방 상세 조회
     */
    public ChatRoomResponse getChatRoomById(Long roomId) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방을 찾을 수 없습니다."));
        return toResponse(room);
    }

    /**
     * 채팅방 삭제
     */
    public void deleteChatRoom(Long roomId) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));
        chatRoomRepository.delete(room);
    }

    /**
     * 채팅방 입장
     */
    @Transactional
    public void joinChatRoom(Long roomId, ChatJoinRequest request) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

        User user = User.builder().id(request.getUserId()).build(); // 🔐 SecurityUtil 연동 가능
        boolean alreadyJoined = chatParticipantRepository.findByChatRoomAndUser(room, user).isPresent();

        if (!alreadyJoined) {
            ChatParticipant participant = ChatParticipant.builder()
                    .chatRoom(room)
                    .user(user)
                    .joinedAt(LocalDateTime.now())
                    .build();
            chatParticipantRepository.save(participant);
        }
    }

    /**
     * 채팅방 퇴장 (마지막 사용자가 퇴장 시 자동 삭제)
     */
    @Transactional
    public void exitChatRoom(Long roomId, ChatJoinRequest request) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않습니다."));

        User user = User.builder().id(request.getUserId()).build();
        ChatParticipant participant = chatParticipantRepository.findByChatRoomAndUser(room, user)
                .orElseThrow(() -> new IllegalArgumentException("입장한 사용자가 아닙니다."));

        chatParticipantRepository.delete(participant);

        if (chatParticipantRepository.findByChatRoom(room).isEmpty()) {
            chatRoomRepository.delete(room);
        }
    }

    // ================== DTO 변환 ==================

    private ChatRoomResponse toResponse(ChatRoom room) {
        List<ChatParticipantDto> participants = chatParticipantRepository.findByChatRoom(room)
                .stream()
                .map(p -> new ChatParticipantDto(
                        p.getUser().getId(),
                        p.getUser().getNickname(),
                        p.getUser().getProfileImageUrl()
                ))
                .collect(Collectors.toList());

        return ChatRoomResponse.builder()
                .roomId(room.getId())
                .roomName(room.getName())
                .roomType(room.getType().name())
                .referenceId(room.getReferenceId())
                .createdAt(room.getCreatedAt())
                .participants(participants)
                .build();
    }
}
