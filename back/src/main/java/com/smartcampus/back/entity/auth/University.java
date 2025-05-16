package com.smartcampus.back.entity.auth;

import jakarta.persistence.*;
import lombok.*;

/**
 * 대학교 엔티티 (Oracle Express 호환)
 */
@Entity
@Table(name = "UNIVERSITY")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "university_seq_generator")
    @SequenceGenerator(
            name = "university_seq_generator",
            sequenceName = "UNIVERSITY_SEQ",
            allocationSize = 1 // Oracle은 일반적으로 1
    )
    private Long id;

    @Column(name = "NAME", nullable = false, length = 200)
    private String name; // 학교 이름

    @Column(name = "ADDRESS", nullable = false, length = 500)
    private String address; // 학교 주소
}
