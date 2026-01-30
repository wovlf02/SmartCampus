# 커뮤니티 도메인 엔티티

**관련 문서**: [DB 개요](./database-overview.md)

---

## 1. POST 테이블 (게시글)

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 게시글 ID |
| TITLE | VARCHAR2(200) | NOT NULL | 제목 |
| CONTENT | CLOB | NOT NULL | 본문 |
| WRITER_ID | NUMBER(19) | FK, NOT NULL | 작성자 ID |
| LIKE_COUNT | NUMBER(10) | NOT NULL, DEFAULT 0 | 좋아요 수 |
| VIEW_COUNT | NUMBER(10) | NOT NULL, DEFAULT 0 | 조회수 |
| COMMENT_COUNT | NUMBER(10) | NOT NULL, DEFAULT 0 | 댓글수 |
| IS_DELETED | NUMBER(1) | NOT NULL, DEFAULT 0 | 삭제 여부 |
| DELETED_AT | TIMESTAMP | NULL | 삭제 시각 |
| CREATED_AT | TIMESTAMP | NOT NULL | 생성 시각 |
| UPDATED_AT | TIMESTAMP | NULL | 수정 시각 |

**인덱스**
- `IDX_POST_WRITER`: WRITER_ID
- `IDX_POST_CREATED`: CREATED_AT
- `IDX_POST_IS_DELETED`: IS_DELETED

**연관관계**: Comment (1:N), Attachment (1:N), Like (1:N), PostFavorite (1:N), Report (1:N), Block (1:N)

---

## 2. COMMENT 테이블 (댓글)

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 댓글 ID |
| CONTENT | VARCHAR2(1000) | NOT NULL | 내용 |
| POST_ID | NUMBER(19) | FK, NOT NULL | 게시글 ID |
| WRITER_ID | NUMBER(19) | FK, NOT NULL | 작성자 ID |
| IS_DELETED | NUMBER(1) | NOT NULL, DEFAULT 0 | 삭제 여부 |
| CREATED_AT | TIMESTAMP | NOT NULL | 생성 시각 |
| UPDATED_AT | TIMESTAMP | NULL | 수정 시각 |

**연관관계**: Reply (1:N), Like (1:N)

---

## 3. REPLY 테이블 (대댓글)

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 대댓글 ID |
| CONTENT | VARCHAR2(1000) | NOT NULL | 내용 |
| COMMENT_ID | NUMBER(19) | FK, NOT NULL | 댓글 ID |
| WRITER_ID | NUMBER(19) | FK, NOT NULL | 작성자 ID |
| IS_DELETED | NUMBER(1) | NOT NULL, DEFAULT 0 | 삭제 여부 |
| CREATED_AT | TIMESTAMP | NOT NULL | 생성 시각 |

**연관관계**: Like (1:N)

---

## 4. ATTACHMENT 테이블 (첨부파일)

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 첨부파일 ID |
| POST_ID | NUMBER(19) | FK, NOT NULL | 게시글 ID |
| FILE_URL | VARCHAR2(500) | NOT NULL | 파일 URL |
| FILE_NAME | VARCHAR2(255) | NOT NULL | 파일명 |
| FILE_TYPE | VARCHAR2(100) | NULL | 파일 타입 |
| FILE_SIZE | NUMBER(19) | NULL | 파일 크기 |

---

## 5. LIKES 테이블 (좋아요)

게시글, 댓글, 대댓글 각각에 대한 좋아요를 단일 테이블로 관리

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 좋아요 ID |
| USER_ID | NUMBER(19) | FK, NOT NULL | 사용자 ID |
| POST_ID | NUMBER(19) | FK, NULL | 게시글 ID (게시글 좋아요 시) |
| COMMENT_ID | NUMBER(19) | FK, NULL | 댓글 ID (댓글 좋아요 시) |
| REPLY_ID | NUMBER(19) | FK, NULL | 대댓글 ID (대댓글 좋아요 시) |
| LIKED_AT | TIMESTAMP | NOT NULL | 좋아요 시각 |

**유니크 제약조건**
- `UK_LIKE_USER_POST`: (USER_ID, POST_ID)
- `UK_LIKE_USER_COMMENT`: (USER_ID, COMMENT_ID)
- `UK_LIKE_USER_REPLY`: (USER_ID, REPLY_ID)

**인덱스**
- `IDX_LIKE_USER`: USER_ID
- `IDX_LIKE_POST`: POST_ID
- `IDX_LIKE_COMMENT`: COMMENT_ID
- `IDX_LIKE_REPLY`: REPLY_ID

**규칙**: POST_ID, COMMENT_ID, REPLY_ID 중 정확히 하나만 NOT NULL

---

## 6. POST_FAVORITE 테이블 (즐겨찾기)

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 즐겨찾기 ID |
| USER_ID | NUMBER(19) | FK, NOT NULL | 사용자 ID |
| POST_ID | NUMBER(19) | FK, NOT NULL | 게시글 ID |
| CREATED_AT | TIMESTAMP | NOT NULL | 생성 시각 |

---

## 7. REPORT 테이블 (신고)

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 신고 ID |
| REPORTER_ID | NUMBER(19) | FK, NOT NULL | 신고자 ID |
| TARGET_USER_ID | NUMBER(19) | FK, NULL | 대상 사용자 ID |
| POST_ID | NUMBER(19) | FK, NULL | 게시글 ID |
| COMMENT_ID | NUMBER(19) | FK, NULL | 댓글 ID |
| REPLY_ID | NUMBER(19) | FK, NULL | 대댓글 ID |
| REASON | VARCHAR2(500) | NOT NULL | 신고 사유 |
| STATUS | VARCHAR2(20) | NOT NULL | 상태 (PENDING/REVIEWED/RESOLVED) |
| CREATED_AT | TIMESTAMP | NOT NULL | 생성 시각 |

---

## 8. BLOCK 테이블 (콘텐츠 차단)

사용자가 특정 게시글/댓글/대댓글을 차단하여 숨김 처리

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 차단 ID |
| USER_ID | NUMBER(19) | FK, NOT NULL | 차단한 사용자 ID |
| POST_ID | NUMBER(19) | FK, NULL | 차단된 게시글 ID |
| COMMENT_ID | NUMBER(19) | FK, NULL | 차단된 댓글 ID |
| REPLY_ID | NUMBER(19) | FK, NULL | 차단된 대댓글 ID |
| BLOCKED_AT | TIMESTAMP | NOT NULL | 차단 시각 |

---

**최종 업데이트**: 2026년 1월 30일
