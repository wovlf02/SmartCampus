# 인증 API

**관련 문서**: [API 개요](./api-overview.md)

---

## 1. 회원가입

### POST /api/auth/register
```
Content-Type: multipart/form-data
```

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| username | String | O | 아이디 |
| password | String | O | 비밀번호 |
| email | String | O | 이메일 |
| nickname | String | O | 닉네임 |
| universityId | Long | O | 대학교 ID |
| profileImage | File | X | 프로필 이미지 |

---

## 2. 로그인

### POST /api/auth/login
```json
{
  "username": "user123",
  "password": "password123"
}
```

**응답**
```json
{
  "accessToken": "eyJhbG...",
  "refreshToken": "eyJhbG..."
}
```

---

## 3. 중복 확인

### POST /api/auth/check-username
```json
{ "username": "user123" }
```

### POST /api/auth/check-nickname
```json
{ "nickname": "닉네임" }
```

### POST /api/auth/check-email
```json
{ "email": "user@example.com" }
```

---

## 4. 이메일 인증

### POST /api/auth/send-code
```json
{ "email": "user@example.com" }
```

### POST /api/auth/verify-code
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

---

## 5. 토큰 갱신

### POST /api/auth/refresh
```json
{ "refreshToken": "eyJhbG..." }
```

---

**최종 업데이트**: 2026년 1월 30일
