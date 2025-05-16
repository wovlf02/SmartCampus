package com.smartcampus.back.entity.chat;

import com.smartcampus.back.entity.auth.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 채팅 메시지 엔티티 (TEXT, IMAGE, FILE 지원) - Oracle Express 호환
 */
@Entity
@Table(name = "CHAT_MESSAGE",
        indexes = {
                @Index(name = "IDX_CHAT_ROOM_SENT_AT", columnList = "CHAT_ROOM_ID, SENT_AT")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chat_message_seq_generator")
    @SequenceGenerator(
            name = "chat_message_seq_generator",
            sequenceName = "CHAT_MESSAGE_SEQ",
            allocationSize = 1
    )
    private Long id;

    /** 소속 채팅방 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHAT_ROOM_ID", nullable = false)
    private ChatRoom chatRoom;

    /** 메시지 전송자 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SENDER_ID", nullable = false)
    private User sender;

    /** 메시지 내용 (TEXT만 필수) */
    @Column(name = "CONTENT", length = 2000)
    private String content;

    /** 메시지 타입 (TEXT, IMAGE, FILE) */
    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE", nullable = false, length = 50)
    private ChatMessageType type;

    /** 저장된 첨부파일명 */
    @Column(name = "STORED_FILE_NAME", length = 500)
    private String storedFileName;

    /** 첨부파일 MIME 타입 */
    @Column(name = "CONTENT_TYPE", length = 100)
    private String contentType;

    /** 전송 시각 */
    @Column(name = "SENT_AT", nullable = false, updatable = false)
    private LocalDateTime sentAt;

    // ===== 콜백 =====

    @PrePersist
    protected void onSend() {
        this.sentAt = LocalDateTime.now();
    }

    // ===== 유틸 =====

    public boolean isFileMessage() {
        return type == ChatMessageType.IMAGE || type == ChatMessageType.FILE;
    }

    public String getFileUrl() {
        return storedFileName != null ? "/uploads/chat/" + storedFileName : null;
    }
}
