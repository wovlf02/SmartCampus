# 친구 도메인 엔티티

**관련 문서**: [DB 개요](./database-overview.md)

---

## 1. FRIEND 테이블

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 친구 ID |
| USER_ID | NUMBER(19) | FK, NOT NULL | 사용자 ID |
| FRIEND_ID | NUMBER(19) | FK, NOT NULL | 친구 ID |
| CREATED_AT | TIMESTAMP | NOT NULL | 친구 등록 시각 |

---

## 2. FRIEND_REQUEST 테이블

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 요청 ID |
| SENDER_ID | NUMBER(19) | FK, NOT NULL | 요청자 ID |
| RECEIVER_ID | NUMBER(19) | FK, NOT NULL | 수신자 ID |
| STATUS | VARCHAR2(20) | NOT NULL | 상태 (PENDING/ACCEPTED/REJECTED) |
| CREATED_AT | TIMESTAMP | NOT NULL | 요청 시각 |
| RESPONDED_AT | TIMESTAMP | NULL | 응답 시각 |

---

## 3. FRIEND_BLOCK 테이블

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 차단 ID |
| BLOCKER_ID | NUMBER(19) | FK, NOT NULL | 차단한 사용자 ID |
| BLOCKED_ID | NUMBER(19) | FK, NOT NULL | 차단된 사용자 ID |
| CREATED_AT | TIMESTAMP | NOT NULL | 차단 시각 |

---

## 4. FRIEND_REPORT 테이블

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 신고 ID |
| REPORTER_ID | NUMBER(19) | FK, NOT NULL | 신고자 ID |
| REPORTED_ID | NUMBER(19) | FK, NOT NULL | 피신고자 ID |
| REASON | VARCHAR2(500) | NOT NULL | 신고 사유 |
| STATUS | VARCHAR2(20) | NOT NULL | 상태 |
| CREATED_AT | TIMESTAMP | NOT NULL | 신고 시각 |

---

**최종 업데이트**: 2026년 1월 30일
