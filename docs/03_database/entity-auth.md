# 인증 도메인 엔티티

**관련 문서**: [DB 개요](./database-overview.md)

---

## 1. USERS 테이블

### 1.1 테이블 정의

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 사용자 ID |
| USERNAME | VARCHAR2(50) | UK, NOT NULL | 아이디 |
| PASSWORD | VARCHAR2(255) | NOT NULL | 암호화된 비밀번호 |
| NICKNAME | VARCHAR2(100) | NOT NULL | 닉네임 |
| EMAIL | VARCHAR2(100) | UK, NOT NULL | 이메일 |
| PROFILE_IMAGE_URL | VARCHAR2(500) | NULL | 프로필 이미지 |
| UNIVERSITY_ID | NUMBER(19) | FK, NOT NULL | 대학교 ID |
| CREATED_AT | TIMESTAMP | NOT NULL | 생성 시각 |
| UPDATED_AT | TIMESTAMP | NOT NULL | 수정 시각 |

### 1.2 연관관계

| 관계 | 대상 | 설명 |
|------|------|------|
| N:1 | UNIVERSITY | 소속 대학교 |
| 1:N | POST | 작성 게시글 |
| 1:N | COMMENT | 작성 댓글 |
| 1:N | CHAT_PARTICIPANT | 채팅 참여 |
| 1:N | FRIEND | 친구 목록 |
| 1:N | FRIEND_REQUEST | 친구 요청 |

---

## 2. UNIVERSITY 테이블

### 2.1 테이블 정의

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 대학교 ID |
| NAME | VARCHAR2(100) | NOT NULL | 대학교명 |
| DOMAIN | VARCHAR2(100) | NULL | 이메일 도메인 |

### 2.2 연관관계

| 관계 | 대상 | 설명 |
|------|------|------|
| 1:N | USERS | 소속 사용자 |

---

**최종 업데이트**: 2026년 1월 30일
