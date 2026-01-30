# 시간표 API

**관련 문서**: [API 개요](./api-overview.md)

---

## 1. 시간표 조회

### GET /api/schedule/timetable

**응답**
```json
[
  {
    "id": 1,
    "subjectName": "데이터베이스",
    "professor": "홍길동",
    "location": "공학관 301",
    "dayOfWeek": "MONDAY",
    "startTime": "09:00",
    "endTime": "10:30",
    "color": "#FF5733"
  }
]
```

---

## 2. 시간표 추가

### POST /api/schedule/timetable
```json
{
  "subjectName": "알고리즘",
  "professor": "김철수",
  "location": "IT관 201",
  "dayOfWeek": "TUESDAY",
  "startTime": "13:00",
  "endTime": "14:30",
  "color": "#3498DB"
}
```

---

## 3. 시간표 수정

### PUT /api/schedule/timetable/{id}
```json
{
  "subjectName": "알고리즘",
  "location": "IT관 202"
}
```

---

## 4. 시간표 삭제

### DELETE /api/schedule/timetable/{id}

---

**최종 업데이트**: 2026년 1월 30일
