# API 명세 개요

**관련 문서**: [인증 API](./api-auth.md) | [사용자 API](./api-user.md)

---

## 1. 공통 사항

### 1.1 Base URL
```
http://{server}:8080/api
```

### 1.2 인증 방식
- **JWT Bearer Token**
- 헤더: `Authorization: Bearer {accessToken}`
- `/auth/**` 엔드포인트는 인증 불필요

### 1.3 공통 응답 형식

```json
{
  "success": true,
  "data": { ... },
  "message": "성공 메시지"
}
```

### 1.4 에러 응답

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지"
  }
}
```

---

## 2. API 분류

| 분류 | Base Path | 설명 |
|------|-----------|------|
| 인증 | `/api/auth` | 로그인, 회원가입, 토큰 |
| 사용자 | `/api/users` | 사용자 정보 관리 |
| 게시글 | `/api/community/posts` | 게시글 CRUD |
| 댓글 | `/api/community/comments` | 댓글 관리 |
| 좋아요 | `/api/community/likes` | 좋아요 |
| 채팅 | `/api/chat` | 채팅방, 메시지 |
| 친구 | `/api/friends` | 친구 관리 |
| 시간표 | `/api/schedule` | 시간표 관리 |

---

## 3. HTTP 상태 코드

| 코드 | 설명 |
|------|------|
| 200 | 성공 |
| 201 | 생성 성공 |
| 400 | 잘못된 요청 |
| 401 | 인증 필요 |
| 403 | 권한 없음 |
| 404 | 리소스 없음 |
| 500 | 서버 오류 |

---

**최종 업데이트**: 2026년 1월 30일
