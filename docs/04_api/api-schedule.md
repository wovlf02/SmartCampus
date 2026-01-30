# 시간표 API

**관련 문서**: [API 개요](./api-overview.md)

---

## 1. 시간표 조회

### GET /api/timetable

내 시간표 전체 조회

**헤더**: `Authorization: Bearer {accessToken}`

**응답**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "subjectName": "데이터베이스",
      "professorName": "홍길동",
      "location": "공학관 301",
      "dayOfWeek": "MONDAY",
      "startPeriod": 1,
      "endPeriod": 2
    },
    {
      "id": 2,
      "subjectName": "알고리즘",
      "professorName": "김철수",
      "location": "IT관 201",
      "dayOfWeek": "TUESDAY",
      "startPeriod": 3,
      "endPeriod": 4
    }
  ]
}
```

---

## 2. 시간표 등록/수정

### POST /api/timetable

시간표 전체 저장 (기존 데이터 삭제 후 새로 저장)

```json
[
  {
    "subjectName": "데이터베이스",
    "professorName": "홍길동",
    "location": "공학관 301",
    "dayOfWeek": "MONDAY",
    "startPeriod": 1,
    "endPeriod": 2
  },
  {
    "subjectName": "알고리즘",
    "professorName": "김철수",
    "location": "IT관 201",
    "dayOfWeek": "TUESDAY",
    "startPeriod": 3,
    "endPeriod": 4
  }
]
```

**요청 필드**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| subjectName | String | O | 과목명 (100자 이내) |
| professorName | String | X | 교수명 (50자 이내) |
| location | String | X | 강의실 (100자 이내) |
| dayOfWeek | String | O | 요일 (MONDAY~SUNDAY) |
| startPeriod | int | O | 시작 교시 (1부터) |
| endPeriod | int | O | 종료 교시 |

**응답**
```json
{
  "success": true,
  "data": null
}
```

---

## 3. 시간표 전체 삭제

### DELETE /api/timetable

내 시간표 전체 삭제

**응답**
```json
{
  "success": true,
  "data": null
}
```

---

## 4. 요일 값 정의

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
