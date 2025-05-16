package com.smartcampus.back.dto.auth.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

/**
 * 회원가입 최종 요청 DTO입니다.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    private String username;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Size(min = 8, message = "비밀번호는 최소 8자 이상이어야 합니다.")
    private String password;

    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "올바른 이메일 형식이어야 합니다.")
    private String email;

    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
    private String nickname;

    @NotBlank(message = "대학교를 선택해주세요.")
    private Long universityId;

    private String profileImageUrl; // 선택 항목 -> 미선택 시 기본 프로필로 처리
}
