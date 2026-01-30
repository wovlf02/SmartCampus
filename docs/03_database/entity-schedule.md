# 시간표 도메인 엔티티

**관련 문서**: [DB 개요](./database-overview.md)

---

## 1. TIMETABLES 테이블

사용자의 수업 시간표를 교시 단위로 저장

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| ID | NUMBER(19) | PK, AUTO_INCREMENT | 시간표 항목 ID |
| USER_ID | NUMBER(19) | FK, NOT NULL | 사용자 ID |
| SUBJECT_NAME | VARCHAR2(100) | NOT NULL | 과목명 |
| PROFESSOR_NAME | VARCHAR2(50) | NULL | 담당 교수 |
| LOCATION | VARCHAR2(100) | NULL | 강의실 |
| DAY_OF_WEEK | VARCHAR2(20) | NOT NULL | 요일 (MONDAY~SUNDAY) |
| START_PERIOD | NUMBER(2) | NOT NULL | 시작 교시 (1부터) |
| END_PERIOD | NUMBER(2) | NOT NULL | 종료 교시 |

**참고**:
- `GenerationType.IDENTITY` 사용 (Oracle SEQUENCE와 다름)
- 테이블명: `timetables` (소문자)
- 시간표 저장 시 기존 데이터 전체 삭제 후 새로 저장

**연관관계**
| 관계 | 대상 | 설명 |
|------|------|------|
| N:1 | USERS | 시간표 소유자 |

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

## 3. 교시 매핑 예시

프론트엔드에서 시간 → 교시 변환 로직:

| 교시 | 시작 시간 | 종료 시간 |
|------|-----------|-----------|
| 1교시 | 09:30 | 10:30 |
| 2교시 | 10:30 | 11:30 |
| 3교시 | 11:30 | 12:30 |
| 4교시 | 12:30 | 13:30 |
| 5교시 | 13:30 | 14:30 |
| 6교시 | 14:30 | 15:30 |
| 7교시 | 15:30 | 16:30 |
| 8교시 | 16:30 | 17:30 |
| 9교시 | 17:30 | 18:30 |
| 10교시 | 18:30 | 19:30 |
| 11교시 | 19:30 | 20:30 |
| 12교시 | 20:30 | 21:30 |

---

## 4. 데이터 예시

```json
{
  "id": 1,
  "userId": 100,
  "subjectName": "데이터베이스",
  "professorName": "홍길동",
  "location": "공학관 301",
  "dayOfWeek": "MONDAY",
  "startPeriod": 1,
  "endPeriod": 2
}
```

---

**최종 업데이트**: 2026년 1월 30일
