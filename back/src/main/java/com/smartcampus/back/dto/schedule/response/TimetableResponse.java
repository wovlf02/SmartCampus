package com.smartcampus.back.dto.schedule.response;

import com.smartcampus.back.entity.schedule.DayOfWeek;
import com.smartcampus.back.entity.schedule.Timetable;
import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimetableResponse {

    private Long id;
    private String subjectName;
    private String professorName;
    private DayOfWeek dayOfWeek; // ✅ 커스텀 DayOfWeek enum 사용
    private LocalTime startTime;
    private LocalTime endTime;
    private String location;

    public static TimetableResponse from(Timetable timetable) {
        return TimetableResponse.builder()
                .id(timetable.getId())
                .subjectName(timetable.getSubjectName())
                .professorName(timetable.getProfessorName())
                .dayOfWeek(timetable.getDayOfWeek())
                .startTime(convertPeriodToTime(timetable.getStartPeriod(), true))
                .endTime(convertPeriodToTime(timetable.getEndPeriod(), false))
                .location(timetable.getLocation())
                .build();
    }

    private static LocalTime convertPeriodToTime(int period, boolean isStart) {
        int baseHour = 9 + (period - 1);
        return isStart
                ? LocalTime.of(baseHour, 30)
                : LocalTime.of(baseHour + 1, 20);
    }


}
