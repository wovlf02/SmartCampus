# 채팅 API

**관련 문서**: [API 개요](./api-overview.md)

---

## 1. 채팅방

### 채팅방 목록
**GET** `/api/chat/rooms`

### 채팅방 생성
**POST** `/api/chat/rooms`
```json
{
  "name": "채팅방 이름",
  "type": "GROUP",
  "participantIds": [1, 2, 3]
}
```

### 채팅방 상세
**GET** `/api/chat/rooms/{roomId}`

### 1:1 채팅방 생성/조회
**POST** `/api/chat/direct`
```json
{ "targetUserId": 2 }
```

---

## 2. 메시지

### 메시지 목록
**GET** `/api/chat/rooms/{roomId}/messages?page=0&size=100`

### 파일 업로드
**POST** `/api/chat/upload`
```
Content-Type: multipart/form-data
file: [파일]
roomId: 1
```

---

## 3. WebSocket

### 연결
```
ws://{server}:8080/ws/chat?token={accessToken}
```

### 메시지 전송
```json
{
  "roomId": 1,
  "type": "TEXT",
  "content": "메시지 내용"
}
```

### 메시지 수신
```json
{
  "messageId": 123,
  "roomId": 1,
  "senderId": 1,
  "nickname": "발신자",
  "content": "메시지",
  "type": "TEXT",
  "time": "2026-01-30T12:00:00"
}
```

---

**최종 업데이트**: 2026년 1월 30일
