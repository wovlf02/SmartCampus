# 사용자 API

**관련 문서**: [API 개요](./api-overview.md)

---

## 1. 내 정보 조회

### GET /api/users/me

**응답**
```json
{
  "id": 1,
  "username": "user123",
  "nickname": "닉네임",
  "email": "user@example.com",
  "profileImageUrl": "/uploads/profile/abc.jpg",
  "universityId": 1,
  "universityName": "OO대학교"
}
```

---

## 2. 사용자 조회

### GET /api/users/{id}

---

## 3. 닉네임 변경

### PATCH /api/users/nickname
```json
{ "nickname": "새닉네임" }
```

---

## 4. 이메일 변경

### PATCH /api/users/email
```json
{ "email": "new@example.com" }
```

---

## 5. 아이디 변경

### PATCH /api/users/username
```json
{ "username": "newuser123" }
```

---

## 6. 대학교 변경

### PATCH /api/users/university
```json
{ "universityId": 2 }
```

---

## 7. 프로필 이미지 변경

### PATCH /api/users/profile-image
```
Content-Type: multipart/form-data
profileImage: [파일]
```

---

## 8. 회원 탈퇴

### POST /api/users/withdraw
```json
{ "password": "currentPassword" }
```

---

**최종 업데이트**: 2026년 1월 30일
