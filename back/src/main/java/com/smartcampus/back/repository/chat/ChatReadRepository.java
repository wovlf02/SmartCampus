package com.smartcampus.back.repository.chat;

import com.smartcampus.back.entity.chat.ChatRead;
import com.smartcampus.back.entity.chat.ChatMessage;
import com.smartcampus.back.entity.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatReadRepository extends JpaRepository<ChatRead, Long> {

    /**
     * 특정 메시지를 읽은 사용자 수 조회
     */
    long countByMessage(ChatMessage message);

    /**
     * 특정 메시지에 대해 특정 유저가 읽었는지 여부
     */
    boolean existsByMessageAndUser(ChatMessage message, User user);
}
