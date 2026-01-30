# 채팅 도메인 엔티티

**관련 문서**: [DB 개요](./database-overview.md)

---

## 1. CHAT_ROOM 테이블

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 채팅방 ID |
| NAME | VARCHAR2(255) | NULL | 채팅방 이름 |
| REPRESENTATIVE_IMAGE_URL | VARCHAR2(500) | NULL | 대표 이미지 |
| TYPE | VARCHAR2(50) | NOT NULL | 유형 (DIRECT/GROUP/STUDY/POST) |
| REFERENCE_ID | NUMBER(19) | NULL | 연동 리소스 ID |
| LAST_MESSAGE | VARCHAR2(1000) | NULL | 최근 메시지 |
| LAST_MESSAGE_AT | TIMESTAMP | NULL | 최근 메시지 시각 |
| CREATED_AT | TIMESTAMP | NOT NULL | 생성 시각 |

---

## 2. CHAT_MESSAGE 테이블

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 메시지 ID |
| CHAT_ROOM_ID | NUMBER(19) | FK, NOT NULL | 채팅방 ID |
| SENDER_ID | NUMBER(19) | FK, NOT NULL | 발신자 ID |
| CONTENT | VARCHAR2(2000) | NULL | 메시지 내용 |
| TYPE | VARCHAR2(50) | NOT NULL | 유형 (TEXT/IMAGE/FILE/ENTER/LEAVE) |
| FILE_URL | VARCHAR2(500) | NULL | 파일 URL |
| CREATED_AT | TIMESTAMP | NOT NULL | 전송 시각 |

---

## 3. CHAT_PARTICIPANT 테이블

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 참여자 ID |
| CHAT_ROOM_ID | NUMBER(19) | FK, NOT NULL | 채팅방 ID |
| USER_ID | NUMBER(19) | FK, NOT NULL | 사용자 ID |
| JOINED_AT | TIMESTAMP | NOT NULL | 참여 시각 |
| LEFT_AT | TIMESTAMP | NULL | 퇴장 시각 |

---

## 4. CHAT_READ 테이블

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 읽음 ID |
| MESSAGE_ID | NUMBER(19) | FK, NOT NULL | 메시지 ID |
| USER_ID | NUMBER(19) | FK, NOT NULL | 사용자 ID |
| READ_AT | TIMESTAMP | NOT NULL | 읽은 시각 |

---

**최종 업데이트**: 2026년 1월 30일
