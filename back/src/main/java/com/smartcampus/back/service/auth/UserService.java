package com.smartcampus.back.service.auth;

import com.smartcampus.back.dto.auth.request.PasswordConfirmRequest;
import com.smartcampus.back.dto.auth.response.UserProfileResponse;
import com.smartcampus.back.entity.auth.User;
import com.smartcampus.back.global.exception.CustomException;
import com.smartcampus.back.global.exception.ErrorCode;
import com.smartcampus.back.global.security.SecurityUtil;
import com.smartcampus.back.repository.auth.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final SecurityUtil securityUtil;
    private final PasswordEncoder passwordEncoder;

    /**
     * 마이페이지 조회: 로그인한 사용자 전체 정보 반환
     */
    public UserProfileResponse getMyProfile() {
        User user = securityUtil.getCurrentUser();

        return new UserProfileResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getNickname(),
                user.getProfileImageUrl(),
                user.getCreatedAt().toString()
        );
    }

    /**
     * 회원 탈퇴 (비밀번호 확인 → 소프트 삭제)
     */
    public void withdraw(PasswordConfirmRequest request) {
        User user = securityUtil.getCurrentUser();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new CustomException(ErrorCode.LOGIN_PASSWORD_MISMATCH);
        }
    }
}
