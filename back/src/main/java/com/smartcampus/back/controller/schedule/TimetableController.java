package com.smartcampus.back.controller.schedule;

import com.smartcampus.back.dto.schedule.request.TimetableRegisterRequest;
import com.smartcampus.back.dto.schedule.response.TimetableResponse;
import com.smartcampus.back.global.response.ApiResponse;
import com.smartcampus.back.service.schedule.TimetableService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
@RequiredArgsConstructor
public class TimetableController {

    private final TimetableService timetableService;

    /**
     * 내 시간표 전체 조회
     */
    @GetMapping
    public ApiResponse<List<TimetableResponse>> getMyTimetable() {
        return ApiResponse.ok(timetableService.getMyTimetable());
    }

    /**
     * 시간표 등록 (기존 데이터는 삭제 후 새로 저장)
     */
    @PostMapping
    public ApiResponse<Void> saveTimetable(@RequestBody List<TimetableRegisterRequest> requests) {
        timetableService.saveTimetable(requests);
        return ApiResponse.ok();
    }

    /**
     * 시간표 전체 삭제
     */
    @DeleteMapping
    public ApiResponse<Void> deleteAllTimetable() {
        timetableService.deleteMyTimetable();
        return ApiResponse.ok();
    }
}
