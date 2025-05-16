package com.smartcampus.back.controller.community.chat;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartcampus.back.dto.common.MessageResponse;
import com.smartcampus.back.dto.community.chat.request.ChatRoomCreateRequest;
import com.smartcampus.back.dto.community.chat.request.ChatJoinRequest;
import com.smartcampus.back.dto.community.chat.response.ChatRoomListResponse;
import com.smartcampus.back.dto.community.chat.response.ChatRoomResponse;
import com.smartcampus.back.global.exception.CustomException;
import com.smartcampus.back.global.exception.ErrorCode;
import com.smartcampus.back.service.community.chat.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 채팅방 관리 컨트롤러
 * - 채팅방 생성, 입장, 퇴장, 조회, 삭제 기능 제공
 */
@RestController
@RequestMapping("/api/chat/rooms")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // 채팅방 생성
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ChatRoomResponse> createChatRoom(
            @RequestPart("roomName") String roomName,
            @RequestPart("invitedUserIds") String invitedUserIdsJson,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        List<Long> invitedUserIds;
        try {
            invitedUserIds = objectMapper.readValue(
                    invitedUserIdsJson, new TypeReference<List<Long>>() {});
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INVALID_INPUT);
        }

        ChatRoomCreateRequest request = ChatRoomCreateRequest.builder()
                .roomName(roomName)
                .invitedUserIds(invitedUserIds)
                .image(image)
                .build();

        ChatRoomResponse response = chatRoomService.createChatRoom(request);
        return ResponseEntity.ok(response);
    }



    /**
     * 로그인한 사용자의 채팅방 목록 조회
     *
     * @param userId 사용자 ID (✅ 추후 JWT 기반 인증으로 대체 예정)
     * @return 참여 중인 채팅방 목록
     */
    @GetMapping
    public ResponseEntity<List<ChatRoomListResponse>> getMyChatRooms(@RequestParam Long userId) {
        List<ChatRoomListResponse> response = chatRoomService.getChatRoomsByUserId(userId);
        return ResponseEntity.ok(response);
    }

    /**
     * 채팅방 상세 정보 조회
     *
     * @param roomId 채팅방 ID
     * @return 채팅방 상세 정보
     */
    @GetMapping("/{roomId}")
    public ResponseEntity<ChatRoomResponse> getChatRoom(@PathVariable Long roomId) {
        ChatRoomResponse response = chatRoomService.getChatRoomById(roomId);
        return ResponseEntity.ok(response);
    }

    /**
     * 채팅방 삭제 (빈 방 또는 관리자가 삭제할 때 사용)
     *
     * @param roomId 삭제할 채팅방 ID
     * @return 삭제 완료 메시지
     */
    @DeleteMapping("/{roomId}")
    public ResponseEntity<MessageResponse> deleteChatRoom(@PathVariable Long roomId) {
        chatRoomService.deleteChatRoom(roomId);
        return ResponseEntity.ok(new MessageResponse("채팅방이 삭제되었습니다."));
    }

    /**
     * 채팅방 입장
     *
     * @param roomId 입장할 채팅방 ID
     * @param request 입장 요청 (사용자 ID 포함)
     * @return 입장 완료 메시지
     */
    @PostMapping("/{roomId}/join")
    public ResponseEntity<MessageResponse> joinChatRoom(
            @PathVariable Long roomId,
            @RequestBody ChatJoinRequest request
    ) {
        chatRoomService.joinChatRoom(roomId, request);
        return ResponseEntity.ok(new MessageResponse("채팅방에 입장했습니다."));
    }

    /**
     * 채팅방 퇴장
     *
     * @param roomId 퇴장할 채팅방 ID
     * @param request 퇴장 요청 (사용자 ID 포함)
     * @return 퇴장 완료 메시지
     */
    @DeleteMapping("/{roomId}/exit")
    public ResponseEntity<MessageResponse> exitChatRoom(
            @PathVariable Long roomId,
            @RequestBody ChatJoinRequest request
    ) {
        chatRoomService.exitChatRoom(roomId, request);
        return ResponseEntity.ok(new MessageResponse("채팅방에서 퇴장했습니다."));
    }
}
