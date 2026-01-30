# 커뮤니티 API

**관련 문서**: [API 개요](./api-overview.md)

---

## 1. 게시글

### 게시글 목록
**GET** `/api/community/posts?page=0&size=10`

### 게시글 상세
**GET** `/api/community/posts/{postId}`

### 게시글 작성
**POST** `/api/community/posts`
```
Content-Type: multipart/form-data
post: {"title": "제목", "content": "내용"}
files: [첨부파일들]
```

### 게시글 수정
**PUT** `/api/community/posts/{postId}`

### 게시글 삭제
**DELETE** `/api/community/posts/{postId}`

### 게시글 검색
**GET** `/api/community/posts/search?keyword=검색어`

---

## 2. 댓글

### 댓글 목록
**GET** `/api/community/posts/{postId}/comments`

### 댓글 작성
**POST** `/api/community/posts/{postId}/comments`
```json
{ "content": "댓글 내용" }
```

### 댓글 삭제
**DELETE** `/api/community/comments/{commentId}`

---

## 3. 대댓글

### 대댓글 작성
**POST** `/api/community/comments/{commentId}/replies`
```json
{ "content": "대댓글 내용" }
```

---

## 4. 좋아요

### 좋아요 토글
**POST** `/api/community/posts/{postId}/like`

---

## 5. 신고

### 신고하기
**POST** `/api/community/reports`
```json
{
  "targetType": "POST",
  "targetId": 1,
  "reason": "신고 사유"
}
```

---

**최종 업데이트**: 2026년 1월 30일
