package com.smartcampus.back.entity.schedule;

import com.smartcampus.back.entity.auth.User;
import jakarta.persistence.*;
import lombok.*;

/**
 * 사용자 시간표(TimeTable) 엔티티
 * 사용자가 등록한 과목 시간표를 교시 단위로 저장
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "timetables")
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 시간표 등록 사용자 (N:1 관계)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 요일 (월~금) - 사용자 정의 enum 사용
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DayOfWeek dayOfWeek;

    /**
     * 과목 이름
     */
    @Column(nullable = false, length = 100)
    private String subjectName;

    /**
     * 교수님 성함
     */
    @Column(length = 50)
    private String professorName;

    /**
     * 수업 위치 (교실, 강의실 등)
     */
    @Column(length = 100)
    private String location;

    /**
     * 시작 교시 (1~N)
     */
    @Column(nullable = false)
    private int startPeriod;

    /**
     * 종료 교시 (1~N)
     */
    @Column(nullable = false)
    private int endPeriod;
}
