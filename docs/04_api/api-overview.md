# API 명세 개요

**관련 문서**: [인증 API](./api-auth.md) | [사용자 API](./api-user.md) | [커뮤니티 API](./api-community.md) | [채팅 API](./api-chat.md) | [친구 API](./api-friend.md) | [시간표 API](./api-schedule.md)

---

## 1. 공통 사항

### 1.1 Base URL
```
http://{server}:8080/api
```

### 1.2 인증 방식
- **JWT Bearer Token**
- 헤더: `Authorization: Bearer {accessToken}`
- `/api/auth/**` 엔드포인트는 인증 불필요

### 1.3 공통 응답 형식 (ApiResponse)

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

| 분류 | Base Path | 설명 | 문서 |
|------|-----------|------|------|
| 인증 | `/api/auth` | 로그인, 회원가입, 토큰, 비밀번호 재설정 | [api-auth.md](./api-auth.md) |
| 대학교 | `/api/universities` | 대학교 검색 | [api-auth.md](./api-auth.md) |
| 사용자 | `/api/users` | 사용자 정보 조회/수정 | [api-user.md](./api-user.md) |
| 게시글 | `/api/community/posts` | 게시글 CRUD, 검색, 즐겨찾기 | [api-community.md](./api-community.md) |
| 댓글 | `/api/community/comments`, `/api/community/replies` | 댓글/대댓글 관리 | [api-community.md](./api-community.md) |
| 좋아요 | `/api/community/likes` | 게시글/댓글/대댓글 좋아요 | [api-community.md](./api-community.md) |
| 신고 | `/api/community/*/report` | 게시글/댓글/사용자 신고 | [api-community.md](./api-community.md) |
| 차단 | `/api/community/*/block` | 콘텐츠 차단 | [api-community.md](./api-community.md) |
| 채팅 | `/api/chat` | 채팅방, 메시지, WebSocket | [api-chat.md](./api-chat.md) |
| 친구 | `/api/friends` | 친구 요청/수락/차단/신고 | [api-friend.md](./api-friend.md) |
| 시간표 | `/api/timetable` | 시간표 CRUD | [api-schedule.md](./api-schedule.md) |

---

## 3. HTTP 상태 코드

| 코드 | 설명 |
|------|------|
| 200 | 성공 |
| 201 | 생성 성공 |
| 400 | 잘못된 요청 (입력 검증 실패) |
| 401 | 인증 필요 (토큰 없음/만료) |
| 403 | 권한 없음 (접근 거부) |
| 404 | 리소스 없음 |
| 409 | 충돌 (중복 데이터) |
| 500 | 서버 오류 |

---

## 4. 인증이 필요 없는 엔드포인트

| 엔드포인트 | 설명 |
|------------|------|
| `POST /api/auth/login` | 로그인 |
| `POST /api/auth/register` | 회원가입 |
| `POST /api/auth/check-*` | 중복 확인 |
| `POST /api/auth/send-code` | 인증코드 발송 |
| `POST /api/auth/verify-code` | 인증코드 검증 |
| `POST /api/auth/find-username/*` | 아이디 찾기 |
| `POST /api/auth/password/*` | 비밀번호 재설정 |
| `POST /api/auth/reissue` | 토큰 재발급 |
| `GET /api/universities/search` | 대학교 검색 |

---

**최종 업데이트**: 2026년 1월 30일
