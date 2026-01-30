# 데이터베이스 설계 개요

**관련 문서**: [엔티티-인증](./entity-auth.md) | [엔티티-커뮤니티](./entity-community.md)

---

## 1. 기술 스택

| 구성요소 | 내용 |
|----------|------|
| **Database** | Oracle Database XE 21c |
| **ORM** | Spring Data JPA |
| **Driver** | ojdbc11 (23.3.0.23.09) |
| **ID 전략** | Sequence (Oracle) |

---

## 2. 도메인별 테이블 분류

| 도메인 | 테이블 | 설명 |
|--------|--------|------|
| **인증** | USERS, UNIVERSITY | 사용자, 대학교 |
| **커뮤니티** | POST, COMMENT, REPLY, ATTACHMENT, LIKE, POST_FAVORITE, REPORT, BLOCK | 게시판 |
| **채팅** | CHAT_ROOM, CHAT_MESSAGE, CHAT_PARTICIPANT, CHAT_READ | 채팅 |
| **친구** | FRIEND, FRIEND_REQUEST, FRIEND_BLOCK, FRIEND_REPORT | 친구 관리 |
| **시간표** | TIMETABLE | 시간표 |

---

## 3. ERD 개요

```
UNIVERSITY (1) ──────< (N) USERS
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
        POST              FRIEND            CHAT_PARTICIPANT
          │             FRIEND_REQUEST            │
          │             FRIEND_BLOCK              │
          │             FRIEND_REPORT             │
    ┌─────┼─────┐                                 │
    ▼     ▼     ▼                                 ▼
COMMENT LIKE ATTACHMENT                      CHAT_ROOM
    │                                             │
    ▼                                             ▼
  REPLY                                     CHAT_MESSAGE
```

---

## 4. 공통 설계 규칙

### 4.1 명명 규칙
- 테이블명: 대문자 스네이크 케이스 (예: `CHAT_ROOM`)
- 컬럼명: 대문자 스네이크 케이스 (예: `CREATED_AT`)
- 시퀀스명: `{테이블명}_SEQ`

### 4.2 공통 컬럼
| 컬럼 | 타입 | 설명 |
|------|------|------|
| `ID` | NUMBER(19) | PK, 시퀀스 자동 생성 |
| `CREATED_AT` | TIMESTAMP | 생성 시각 |
| `UPDATED_AT` | TIMESTAMP | 수정 시각 (선택) |

### 4.3 Soft Delete
- `IS_DELETED` (NUMBER(1)): 삭제 여부 (0/1)
- `DELETED_AT` (TIMESTAMP): 삭제 시각

---

## 5. 인덱스 전략

| 테이블 | 인덱스 | 컬럼 |
|--------|--------|------|
| POST | IDX_POST_WRITER | WRITER_ID |
| POST | IDX_POST_CREATED | CREATED_AT |
| CHAT_ROOM | IDX_CHATROOM_TYPE_REF | TYPE, REFERENCE_ID |
| CHAT_ROOM | IDX_CHATROOM_LAST_MESSAGE_AT | LAST_MESSAGE_AT |

---

**최종 업데이트**: 2026년 1월 30일
