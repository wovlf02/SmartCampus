# 사용자 API

**관련 문서**: [API 개요](./api-overview.md)

---

## 1. 내 정보 조회

### GET /api/users/me

**헤더**: `Authorization: Bearer {accessToken}`

**응답**
```json
{
  "id": 1,
  "username": "user123",
  "nickname": "닉네임",
  "email": "user@example.com",
  "profileImageUrl": "/uploads/profile/abc.jpg",
  "universityId": 1,
  "universityName": "OO대학교",
  "createdAt": "2026-01-30T10:00:00"
}
```

---

## 2. 사용자 조회 (ID 기반)

### GET /api/users/{id}

**경로 변수**
| 변수 | 타입 | 설명 |
|------|------|------|
| id | Long | 사용자 ID |

**응답**: `UserProfileResponse` (위와 동일한 형식)

---

## 3. 닉네임 변경

### PATCH /api/users/nickname
```json
{ "nickname": "새닉네임" }
```

**검증**: 닉네임 중복 확인 후 변경

---

## 4. 이메일 변경

### PATCH /api/users/email
```json
{ "email": "new@example.com" }
```

**검증**: 이메일 형식 및 중복 확인

---

## 5. 아이디(username) 변경

### PATCH /api/users/username
```json
{ "username": "newuser123" }
```

**검증**: 아이디 중복 확인

---

## 6. 대학교 변경

### PATCH /api/users/university
```json
{ "universityId": 2 }
```

**검증**: 유효한 대학교 ID 확인

---

## 7. 프로필 이미지 변경

### PATCH /api/users/profile-image
```
Content-Type: multipart/form-data
```

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| profileImage | MultipartFile | O | 새 프로필 이미지 |

**처리**:
- 파일명: `UUID_원본파일명` 형식으로 저장
- 저장 경로: `uploads/profile/`
- 응답: 새 이미지 URL 반환

**응답**
```json
{
  "success": true,
  "data": "/uploads/profile/uuid_filename.jpg"
}
```

---

## 8. 회원 탈퇴

### POST /api/users/withdraw
```json
{ "password": "currentPassword" }
```

**설명**: 비밀번호 확인 후 계정 삭제 처리

---

**최종 업데이트**: 2026년 1월 30일
