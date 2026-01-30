# 커뮤니티 API

**관련 문서**: [API 개요](./api-overview.md)

---

## 1. 게시글

### 1.1 게시글 목록 조회
**GET** `/api/community/posts?page=0&size=10`

| 파라미터 | 타입 | 기본값 | 설명 |
|----------|------|--------|------|
| page | int | 0 | 페이지 번호 |
| size | int | 10 | 페이지당 게시글 수 |

### 1.2 게시글 상세 조회
**GET** `/api/community/posts/{postId}`

### 1.3 게시글 작성
**POST** `/api/community/posts`
```
Content-Type: multipart/form-data
```

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| post | String (JSON) | O | `{"title": "제목", "content": "내용"}` |
| files | MultipartFile[] | X | 첨부파일들 |

### 1.4 게시글 수정
**PUT** `/api/community/posts/{postId}`
```
Content-Type: multipart/form-data
```

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| post | String (JSON) | O | 수정할 데이터 |
| files | MultipartFile[] | X | 새 첨부파일들 |

### 1.5 게시글 삭제
**DELETE** `/api/community/posts/{postId}`

### 1.6 게시글 검색
**GET** `/api/community/posts/search?keyword=검색어`

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| keyword | String | 검색 키워드 |
| page | int | 페이지 번호 (기본: 0) |
| size | int | 페이지 크기 (기본: 10) |
| sort | String | 정렬 기준 (기본: createdAt,DESC) |

### 1.7 게시글 필터링
**GET** `/api/community/posts/filter`

| 파라미터 | 타입 | 기본값 | 설명 |
|----------|------|--------|------|
| sort | String | recent | 정렬 (recent/popular) |
| minLikes | int | 0 | 최소 좋아요 수 |
| keyword | String | - | 키워드 필터 |

### 1.8 인기 게시글 조회
**GET** `/api/community/posts/popular`

### 1.9 게시글 활동 순위
**GET** `/api/community/posts/ranking`

### 1.10 조회수 증가
**POST** `/api/community/posts/{postId}/view`

---

## 2. 즐겨찾기

### 2.1 즐겨찾기 등록
**POST** `/api/community/posts/{postId}/favorite`

### 2.2 즐겨찾기 해제
**DELETE** `/api/community/posts/{postId}/favorite`

### 2.3 즐겨찾기 목록 조회
**GET** `/api/community/posts/favorites`

---

## 3. 댓글

### 3.1 댓글 목록 조회 (계층 구조)
**GET** `/api/community/posts/{postId}/comments`

**응답**: 댓글 + 대댓글 계층 구조로 반환

### 3.2 댓글 작성
**POST** `/api/community/posts/{postId}/comments`
```json
{ "content": "댓글 내용" }
```

### 3.3 댓글 수정
**PUT** `/api/community/comments/{commentId}/update`
```json
{ "content": "수정된 댓글 내용" }
```

### 3.4 댓글 삭제
**DELETE** `/api/community/comments/{commentId}/delete`

---

## 4. 대댓글

### 4.1 대댓글 작성
**POST** `/api/community/comments/{commentId}/replies`
```json
{ "content": "대댓글 내용" }
```

### 4.2 대댓글 수정
**PUT** `/api/community/replies/{replyId}/update`
```json
{ "content": "수정된 대댓글 내용" }
```

### 4.3 대댓글 삭제
**DELETE** `/api/community/replies/{replyId}/delete`

---

## 5. 좋아요

### 5.1 게시글 좋아요

| 엔드포인트 | 설명 |
|------------|------|
| **POST** `/api/community/likes/posts/{postId}/toggle` | 좋아요 토글 |
| **GET** `/api/community/likes/posts/{postId}/count` | 좋아요 수 조회 |
| **GET** `/api/community/likes/posts/{postId}/check` | 좋아요 여부 확인 |

### 5.2 댓글 좋아요

| 엔드포인트 | 설명 |
|------------|------|
| **POST** `/api/community/likes/comments/{commentId}/toggle` | 좋아요 토글 |
| **GET** `/api/community/likes/comments/{commentId}/count` | 좋아요 수 조회 |
| **GET** `/api/community/likes/comments/{commentId}/check` | 좋아요 여부 확인 |

### 5.3 대댓글 좋아요

| 엔드포인트 | 설명 |
|------------|------|
| **POST** `/api/community/likes/replies/{replyId}/toggle` | 좋아요 토글 |
| **GET** `/api/community/likes/replies/{replyId}/count` | 좋아요 수 조회 |
| **GET** `/api/community/likes/replies/{replyId}/check` | 좋아요 여부 확인 |

---

## 6. 신고

### 6.1 게시글 신고
**POST** `/api/community/posts/{postId}/report`
```json
{ "reason": "신고 사유" }
```

### 6.2 댓글 신고
**POST** `/api/community/comments/{commentId}/report`
```json
{ "reason": "신고 사유" }
```

### 6.3 대댓글 신고
**POST** `/api/community/replies/{replyId}/report`
```json
{ "reason": "신고 사유" }
```

### 6.4 사용자 신고
**POST** `/api/community/users/{userId}/report`
```json
{ "reason": "신고 사유" }
```

---

## 7. 차단

### 7.1 게시글 차단

| 엔드포인트 | 설명 |
|------------|------|
| **POST** `/api/community/posts/{postId}/block` | 게시글 차단 |
| **DELETE** `/api/community/posts/{postId}/block` | 게시글 차단 해제 |
| **GET** `/api/community/posts/blocked` | 차단한 게시글 목록 |

### 7.2 댓글 차단

| 엔드포인트 | 설명 |
|------------|------|
| **POST** `/api/community/comments/{commentId}/block` | 댓글 차단 |
| **DELETE** `/api/community/comments/{commentId}/block` | 댓글 차단 해제 |
| **GET** `/api/community/comments/blocked` | 차단한 댓글 목록 |

### 7.3 대댓글 차단

| 엔드포인트 | 설명 |
|------------|------|
| **POST** `/api/community/replies/{replyId}/block` | 대댓글 차단 |
| **DELETE** `/api/community/replies/{replyId}/block` | 대댓글 차단 해제 |
| **GET** `/api/community/replies/blocked` | 차단한 대댓글 목록 |

---

**최종 업데이트**: 2026년 1월 30일
