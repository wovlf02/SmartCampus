package com.smartcampus.back.dto.schedule.request;

import jakarta.validation.constraints.*;

import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 시간표 등록 요청 DTO
 */
@Getter
@NoArgsConstructor
public class TimetableRegisterRequest {

    /**
     * 과목명
     */
    @NotBlank(message = "과목명은 필수 입력입니다.")
    private String subjectName;

    /**
     * 담당 교수
     */
    @NotBlank(message = "교수명은 필수 입력입니다.")
    private String professor;

    /**
     * 요일 (1: 월요일 ~ 5: 금요일)
     */
    @Min(1) @Max(5)
    private int dayOfWeek;

    /**
     * 시작 교시
     */
    @Min(1)
    private int startPeriod;

    /**
     * 종료 교시
     */
    @Min(1)
    private int endPeriod;

    /**
     * 강의실 또는 위치 정보
     */
    @NotBlank(message = "강의실 정보를 입력해주세요.")
    private String location;
}
