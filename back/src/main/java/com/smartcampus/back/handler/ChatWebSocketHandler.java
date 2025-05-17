package com.smartcampus.back.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.smartcampus.back.config.auth.JwtProvider;
import com.smartcampus.back.dto.community.chat.request.ChatMessageRequest;
import com.smartcampus.back.dto.community.chat.response.ChatMessageResponse;
import com.smartcampus.back.entity.auth.User;
import com.smartcampus.back.repository.auth.UserRepository;
import com.smartcampus.back.service.community.chat.ChatMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
@Slf4j
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final ChatMessageService chatMessageService;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    // ✅ LocalDateTime 직렬화 지원 설정
    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    private final Map<Long, Set<WebSocketSession>> roomSessions = new ConcurrentHashMap<>();
    private final Map<String, User> sessionUserMap = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String token = getTokenFromQuery(session);
        if (token == null) {
            session.close(CloseStatus.NOT_ACCEPTABLE.withReason("JWT 토큰이 누락되었습니다."));
            return;
        }

        try {
            if (!jwtProvider.validateTokenWithoutRedis(token)) {
                session.close(CloseStatus.NOT_ACCEPTABLE.withReason("JWT 토큰이 유효하지 않습니다."));
                return;
            }

            Long userId = jwtProvider.getUserIdFromToken(token);
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

            sessionUserMap.put(session.getId(), user);
            log.info("🔌 WebSocket 연결됨 - 세션 ID: {}, 사용자: {} (ID: {})", session.getId(), user.getUsername(), user.getId());

        } catch (Exception e) {
            log.error("❌ WebSocket 인증 실패: {}", e.getMessage());
            session.close(CloseStatus.NOT_ACCEPTABLE.withReason("WebSocket 인증 실패: " + e.getMessage()));
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            log.info("📥 수신 메시지 payload: {}", message.getPayload());
            ChatMessageRequest request = objectMapper.readValue(message.getPayload(), ChatMessageRequest.class);
            Long roomId = request.getRoomId();

            User sender = sessionUserMap.get(session.getId());
            if (sender == null) throw new IllegalStateException("인증된 사용자 정보를 찾을 수 없습니다.");

            ChatMessageResponse saved = chatMessageService.sendMessage(roomId, sender, request);
            roomSessions.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet()).add(session);

            String payload = objectMapper.writeValueAsString(saved);
            for (WebSocketSession s : roomSessions.get(roomId)) {
                if (s.isOpen()) s.sendMessage(new TextMessage(payload));
            }

        } catch (Exception e) {
            log.error("❌ WebSocket 메시지 처리 중 오류", e);
            try {
                session.sendMessage(new TextMessage("{\"error\":\"메시지 처리 중 오류 발생\"}"));
            } catch (Exception ignore) {}
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        roomSessions.values().forEach(sessions -> sessions.remove(session));
        sessionUserMap.remove(session.getId());
        log.info("❎ WebSocket 연결 종료: {}", session.getId());
    }

    private String getTokenFromQuery(WebSocketSession session) {
        String query = session.getUri() != null ? session.getUri().getQuery() : null;
        if (query != null && query.contains("token=")) {
            for (String param : query.split("&")) {
                if (param.startsWith("token=")) {
                    return param.substring("token=".length());
                }
            }
        }
        return null;
    }
}
