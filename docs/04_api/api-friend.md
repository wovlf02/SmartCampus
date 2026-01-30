# 친구 API

**관련 문서**: [API 개요](./api-overview.md)

---

## 1. 친구 요청

### 1.1 친구 요청 전송
**POST** `/api/friends/request`
```json
{ "targetUserId": 2 }
```

**응답**
```json
{
  "success": true,
  "data": { "message": "친구 요청이 전송되었습니다." }
}
```

### 1.2 친구 요청 수락
**POST** `/api/friends/request/{requestId}/accept`
```json
{ "requestId": 1 }
```

### 1.3 친구 요청 거절
**POST** `/api/friends/request/{requestId}/reject`
```json
{ "requestId": 1 }
```

---

## 2. 친구 목록

### 2.1 친구 목록 조회
**GET** `/api/friends`

**응답**
```json
{
  "friends": [
    {
      "friendId": 1,
      "userId": 2,
      "nickname": "친구닉네임",
      "profileImageUrl": "/uploads/profile/xxx.jpg",
      "universityName": "OO대학교",
      "createdAt": "2026-01-30T10:00:00"
    }
  ]
}
```

### 2.2 받은 친구 요청 목록
**GET** `/api/friends/requests`

**응답**
```json
{
  "requests": [
    {
      "requestId": 1,
      "senderId": 3,
      "senderNickname": "요청자",
      "senderProfileUrl": "/uploads/profile/xxx.jpg",
      "createdAt": "2026-01-30T09:00:00"
    }
  ]
}
```

---

## 3. 사용자 검색

### GET /api/friends/search

닉네임으로 사용자 검색 (친구 추가 대상 찾기)

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| nickname | String | 검색할 닉네임 (부분 일치) |

**응답**
```json
{
  "results": [
    {
      "userId": 5,
      "nickname": "검색된사용자",
      "profileImageUrl": "/uploads/profile/xxx.jpg",
      "universityName": "OO대학교",
      "isFriend": false,
      "isPending": false
    }
  ]
}
```

---

## 4. 친구 삭제

### DELETE /api/friends/{friendId}

**응답**
```json
{ "message": "친구가 삭제되었습니다." }
```

---

## 5. 사용자 차단

### 5.1 사용자 차단
**POST** `/api/friends/block/{userId}`

### 5.2 차단 해제
**DELETE** `/api/friends/block/{userId}`

### 5.3 차단한 사용자 목록
**GET** `/api/friends/blocked`

**응답**
```json
{
  "blockedUsers": [
    {
      "userId": 10,
      "nickname": "차단된사용자",
      "profileImageUrl": "/uploads/profile/xxx.jpg",
      "blockedAt": "2026-01-29T15:00:00"
    }
  ]
}
```

---

## 6. 사용자 신고

### POST /api/friends/report/{userId}

특정 사용자 신고

```json
{ "reason": "신고 사유" }
```

**응답**
```json
{ "message": "해당 사용자가 신고되었습니다." }
```

---

**최종 업데이트**: 2026년 1월 30일
