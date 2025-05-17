package com.smartcampus.back.service.schedule;

import com.smartcampus.back.dto.schedule.request.TimetableRegisterRequest;
import com.smartcampus.back.dto.schedule.response.TimetableResponse;
import com.smartcampus.back.entity.auth.User;
import com.smartcampus.back.entity.schedule.DayOfWeek;
import com.smartcampus.back.entity.schedule.Timetable;
import com.smartcampus.back.global.security.SecurityUtil;
import com.smartcampus.back.repository.schedule.TimetableRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TimetableService {

    private final TimetableRepository timetableRepository;
    private final SecurityUtil securityUtil;

    /**
     * 시간표 등록 (기존 시간표는 삭제 후 재등록)
     */
    @Transactional
    public void saveTimetable(List<TimetableRegisterRequest> requests) {
        User user = securityUtil.getCurrentUser();

        // 기존 시간표 삭제
        timetableRepository.deleteAllByUser(user);

        // 새 시간표 저장
        List<Timetable> timetableList = requests.stream()
                .map(req -> Timetable.builder()
                        .user(user)
                        .subjectName(req.getSubjectName())
                        .professorName(req.getProfessor())
                        .dayOfWeek(DayOfWeek.of(req.getDayOfWeek()))
                        .startPeriod(req.getStartPeriod())
                        .endPeriod(req.getEndPeriod())
                        .location(req.getLocation())
                        .build())
                .collect(Collectors.toList());

        timetableRepository.saveAll(timetableList);
    }

    /**
     * 내 시간표 전체 조회
     */
    public List<TimetableResponse> getMyTimetable() {
        User user = securityUtil.getCurrentUser();

        return timetableRepository.findByUser(user).stream()
                .map(TimetableResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * 내 시간표 전체 삭제
     */
    @Transactional
    public void deleteMyTimetable() {
        User user = securityUtil.getCurrentUser();
        timetableRepository.deleteAllByUser(user);
    }
}
