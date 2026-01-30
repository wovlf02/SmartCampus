# 채팅 API

**관련 문서**: [API 개요](./api-overview.md)

---

## 1. 채팅방 관리

### 1.1 채팅방 생성 (그룹)
**POST** `/api/chat/rooms`
```
Content-Type: multipart/form-data
```

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| roomName | String (RequestPart) | O | 채팅방 이름 |
| invitedUserIds | String (JSON Array) | O | 초대할 사용자 ID 배열 |
| image | MultipartFile | X | 대표 이미지 |

**요청 예시**
```
roomName: "스터디 그룹"
invitedUserIds: "[1, 2, 3]"
image: (파일)
```

### 1.2 채팅방 목록 조회
**GET** `/api/chat/rooms?userId={userId}`

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| userId | Long | 사용자 ID |

**응답**
```json
[
  {
    "roomId": 1,
    "roomName": "스터디 그룹",
    "representativeImageUrl": "/uploads/chatroom/xxx.jpg",
    "lastMessage": "안녕하세요!",
    "lastMessageAt": "2026-01-30T12:00:00",
    "unreadCount": 3,
    "participantCount": 4
  }
]
```

### 1.3 채팅방 상세 조회
**GET** `/api/chat/rooms/{roomId}`

**응답**
```json
{
  "roomId": 1,
  "roomName": "스터디 그룹",
  "type": "GROUP",
  "representativeImageUrl": "/uploads/chatroom/xxx.jpg",
  "participants": [
    { "userId": 1, "nickname": "사용자1", "profileImageUrl": "..." }
  ],
  "createdAt": "2026-01-30T10:00:00"
}
```

### 1.4 채팅방 삭제
**DELETE** `/api/chat/rooms/{roomId}`

---

## 2. 1:1 채팅 (Direct Chat)

### 2.1 1:1 채팅 시작/조회
**POST** `/api/chat/direct/start`

기존 채팅방이 있으면 반환, 없으면 생성

```json
{ "targetUserId": 2 }
```

### 2.2 내 1:1 채팅방 목록
**GET** `/api/chat/direct/rooms`

### 2.3 특정 사용자와의 채팅방 조회
**GET** `/api/chat/direct/with/{userId}`

---

## 3. 메시지

### 3.1 메시지 목록 조회
**GET** `/api/chat/rooms/{roomId}/messages?page=0&size=30`

| 파라미터 | 타입 | 기본값 | 설명 |
|----------|------|--------|------|
| page | int | 0 | 페이지 번호 |
| size | int | 30 | 페이지당 메시지 수 |

**응답**
```json
[
  {
    "messageId": 123,
    "roomId": 1,
    "senderId": 1,
    "senderNickname": "사용자1",
    "senderProfileUrl": "/uploads/profile/xxx.jpg",
    "content": "메시지 내용",
    "type": "TEXT",
    "fileUrl": null,
    "time": "2026-01-30T12:00:00",
    "unreadCount": 2
  }
]
```

### 3.2 REST 방식 메시지 전송
**POST** `/api/chat/rooms/{roomId}/messages`
```json
{
  "type": "TEXT",
  "content": "메시지 내용"
}
```

### 3.3 파일 업로드
**POST** `/api/chat/upload`
```
Content-Type: multipart/form-data
```

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| file | MultipartFile | 업로드할 파일 |
| roomId | Long | 채팅방 ID |

**응답**
```json
{
  "fileUrl": "/uploads/chatroom/uuid_filename.jpg",
  "fileName": "original_filename.jpg",
  "fileType": "image/jpeg"
}
```

---

## 4. WebSocket 연결

### 4.1 연결 엔드포인트
```
ws://{server}:8080/ws/chat?token={accessToken}
```

**설명**: SockJS 폴백 지원, JWT 토큰 기반 인증

### 4.2 메시지 타입

| 타입 | 설명 |
|------|------|
| TEXT | 일반 텍스트 메시지 |
| IMAGE | 이미지 파일 |
| FILE | 일반 파일 |
| ENTER | 입장 알림 |
| LEAVE | 퇴장 알림 |
| READ | 읽음 처리 요청 |
| READ_ACK | 읽음 처리 응답 |

### 4.3 메시지 전송 (Client → Server)
```json
{
  "roomId": 1,
  "type": "TEXT",
  "content": "메시지 내용"
}
```

### 4.4 입장 메시지
```json
{
  "roomId": 1,
  "type": "ENTER",
  "content": "닉네임님이 입장하셨습니다.",
  "time": "2026-01-30T12:00:00"
}
```

### 4.5 읽음 처리 요청
```json
{
  "type": "READ",
  "roomId": 1,
  "messageId": 123
}
```

### 4.6 메시지 수신 (Server → Client)
```json
{
  "messageId": 123,
  "roomId": 1,
  "senderId": 1,
  "senderNickname": "발신자",
  "senderProfileUrl": "/uploads/profile/xxx.jpg",
  "content": "메시지",
  "type": "TEXT",
  "fileUrl": null,
  "time": "2026-01-30T12:00:00",
  "unreadCount": 0
}
```

### 4.7 읽음 처리 응답 (READ_ACK)
```json
{
  "type": "READ_ACK",
  "messageId": 123,
  "unreadCount": 0
}
```

---

**최종 업데이트**: 2026년 1월 30일
