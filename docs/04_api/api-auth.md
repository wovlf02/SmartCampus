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
| username | String (RequestPart) | O | 아이디 (50자 이내, 유니크) |
| password | String (RequestPart) | O | 비밀번호 (암호화 저장) |
| email | String (RequestPart) | O | 이메일 (100자 이내, 유니크) |
| nickname | String (RequestPart) | O | 닉네임 (100자 이내) |
| universityId | Long (RequestParam) | O | 대학교 ID (FK) |
| profileImage | MultipartFile (RequestPart) | X | 프로필 이미지 (uploads/profile에 저장) |

**성공 응답**
```json
{
  "success": true,
  "data": "회원가입이 완료되었습니다.",
  "message": null
}
```

---

## 2. 로그인

### POST /api/auth/login
```json
{
  "username": "user123",
  "password": "password123"
}
```

**성공 응답**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbG...",
    "refreshToken": "eyJhbG..."
  },
  "message": null
}
```

---

## 3. 로그아웃

### POST /api/auth/logout
```json
{
  "accessToken": "eyJhbG...",
  "refreshToken": "eyJhbG..."
}
```

**설명**: Refresh Token 제거 및 Access Token 블랙리스트 처리

---

## 4. 중복 확인

### POST /api/auth/check-username
```json
{ "username": "user123" }
```
**응답**: `true` (사용 가능) / `false` (중복)

### POST /api/auth/check-nickname
```json
{ "nickname": "닉네임" }
```

### POST /api/auth/check-email
```json
{ "email": "user@example.com" }
```

---

## 5. 이메일 인증

### POST /api/auth/send-code
이메일 인증코드 발송
```json
{ "email": "user@example.com" }
```

### POST /api/auth/verify-code
이메일 인증코드 검증
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

---

## 6. 토큰 재발급

### POST /api/auth/reissue
Access Token 재발급 (Sliding Session 방식)
```json
{
  "accessToken": "eyJhbG...",
  "refreshToken": "eyJhbG..."
}
```

**응답**
```json
{
  "success": true,
  "data": {
    "accessToken": "새로운_액세스_토큰",
    "refreshToken": "새로운_리프레시_토큰"
  }
}
```

---

## 7. 아이디 찾기

### POST /api/auth/find-username/send-code
아이디 찾기용 인증 코드 발송
```json
{ "email": "user@example.com" }
```

### POST /api/auth/find-username/verify-code
인증코드 검증 및 아이디 반환
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**응답**: 마스킹 처리된 아이디 반환

---

## 8. 비밀번호 재설정

### POST /api/auth/password/request
본인 확인 요청 (이메일 인증 코드 발송)
```json
{
  "username": "user123",
  "email": "user@example.com"
}
```

### POST /api/auth/password/verify-code
인증 코드 검증
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

### PUT /api/auth/password/update
새 비밀번호 저장
```json
{
  "email": "user@example.com",
  "newPassword": "newPassword123"
}
```

---

## 9. 회원 탈퇴

### DELETE /api/auth/withdraw
```json
{ "password": "currentPassword" }
```

---

## 10. 임시 데이터 삭제

### DELETE /api/auth/temp
회원가입 도중 임시 데이터 삭제 (Redis/DB 정리)
```json
{ "email": "user@example.com" }
```

---

## 11. 대학교 검색

### GET /api/universities/search
키워드로 대학교 검색

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| keyword | String | 검색할 대학교명 키워드 |

**응답**
```json
[
  {
    "id": 1,
    "name": "서울대학교",
    "domain": "snu.ac.kr"
  },
  {
    "id": 2,
    "name": "서울시립대학교",
    "domain": "uos.ac.kr"
  }
]
```

---

**최종 업데이트**: 2026년 1월 30일
