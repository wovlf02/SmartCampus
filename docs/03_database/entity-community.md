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

## 5. LIKE 테이블 (좋아요)

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 좋아요 ID |
| POST_ID | NUMBER(19) | FK, NOT NULL | 게시글 ID |
| USER_ID | NUMBER(19) | FK, NOT NULL | 사용자 ID |
| CREATED_AT | TIMESTAMP | NOT NULL | 생성 시각 |

---

## 6. REPORT 테이블 (신고)

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 신고 ID |
| REPORTER_ID | NUMBER(19) | FK, NOT NULL | 신고자 ID |
| TARGET_USER_ID | NUMBER(19) | FK | 대상 사용자 ID |
| POST_ID | NUMBER(19) | FK | 게시글 ID |
| COMMENT_ID | NUMBER(19) | FK | 댓글 ID |
| REASON | VARCHAR2(500) | NOT NULL | 신고 사유 |
| STATUS | VARCHAR2(20) | NOT NULL | 상태 (PENDING/REVIEWED/RESOLVED) |
| CREATED_AT | TIMESTAMP | NOT NULL | 생성 시각 |

---

**최종 업데이트**: 2026년 1월 30일
