# 시간표 도메인 엔티티

**관련 문서**: [DB 개요](./database-overview.md)

---

## 1. TIMETABLE 테이블

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK | 시간표 ID |
| USER_ID | NUMBER(19) | FK, NOT NULL | 사용자 ID |
| SUBJECT_NAME | VARCHAR2(100) | NOT NULL | 과목명 |
| PROFESSOR | VARCHAR2(50) | NULL | 담당 교수 |
| LOCATION | VARCHAR2(100) | NULL | 강의실 |
| DAY_OF_WEEK | VARCHAR2(20) | NOT NULL | 요일 (MONDAY~SUNDAY) |
| START_TIME | VARCHAR2(10) | NOT NULL | 시작 시간 (HH:mm) |
| END_TIME | VARCHAR2(10) | NOT NULL | 종료 시간 (HH:mm) |
| COLOR | VARCHAR2(20) | NULL | 표시 색상 |
| CREATED_AT | TIMESTAMP | NOT NULL | 생성 시각 |
| UPDATED_AT | TIMESTAMP | NULL | 수정 시각 |

---

## 2. 요일 Enum (DayOfWeek)

| 값 | 설명 |
|----|------|
| MONDAY | 월요일 |
| TUESDAY | 화요일 |
| WEDNESDAY | 수요일 |
| THURSDAY | 목요일 |
| FRIDAY | 금요일 |
| SATURDAY | 토요일 |
| SUNDAY | 일요일 |

---

**최종 업데이트**: 2026년 1월 30일
