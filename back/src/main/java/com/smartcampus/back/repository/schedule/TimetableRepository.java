package com.smartcampus.back.repository.schedule;

import com.smartcampus.back.entity.auth.User;
import com.smartcampus.back.entity.schedule.DayOfWeek;
import com.smartcampus.back.entity.schedule.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 시간표(Timetable) 관련 JPA Repository
 * <p>사용자의 교시별 수업 정보를 저장하고 관리합니다.</p>
 */
public interface TimetableRepository extends JpaRepository<Timetable, Long> {

    /**
     * 특정 사용자의 전체 시간표 조회
     *
     * @param user 대상 사용자
     * @return 시간표 목록
     */
    List<Timetable> findByUser(User user);

    /**
     * 특정 사용자 + 요일에 해당하는 시간표 조회
     *
     * @param user      사용자
     * @param dayOfWeek 요일
     * @return 시간표 목록
     */
    List<Timetable> findByUserAndDayOfWeek(User user, DayOfWeek dayOfWeek);

    /**
     * 특정 사용자의 시간표 전체 삭제
     *
     * @param user 사용자
     */
    void deleteAllByUser(User user);
}
