package com.smartcampus.back.service.user;

import com.smartcampus.back.dto.auth.request.PasswordConfirmRequest;
import com.smartcampus.back.dto.auth.response.UserProfileResponse;
import com.smartcampus.back.entity.auth.University;
import com.smartcampus.back.entity.auth.User;
import com.smartcampus.back.global.exception.CustomException;
import com.smartcampus.back.global.exception.ErrorCode;
import com.smartcampus.back.global.security.SecurityUtil;
import com.smartcampus.back.repository.auth.UniversityRepository;
import com.smartcampus.back.repository.auth.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UniversityRepository universityRepository;
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
     * 회원 탈퇴 (비밀번호 확인 → 완전 삭제)
     */
    @Transactional
    public void withdraw(PasswordConfirmRequest request) {
        User user = securityUtil.getCurrentUser();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new CustomException(ErrorCode.LOGIN_PASSWORD_MISMATCH);
        }

        userRepository.delete(user);
    }

    /**
     * 닉네임 변경
     */
    @Transactional
    public void updateNickname(String newNickname) {
        User user = securityUtil.getCurrentUser();
        user.setNickname(newNickname);
    }

    /**
     * 이메일 변경
     */
    @Transactional
    public void updateEmail(String newEmail) {
        User user = securityUtil.getCurrentUser();
        user.setEmail(newEmail);
    }

    /**
     * 프로필 이미지 변경
     */
    @Transactional
    public void updateProfileImage(String imageUrl) {
        User user = securityUtil.getCurrentUser();
        user.setProfileImageUrl(imageUrl);
    }

    /**
     * 아이디(username) 변경
     */
    @Transactional
    public void updateUsername(String newUsername) {
        // 중복 검사 필요 시, 아래 주석 해제
        if (userRepository.existsByUsername(newUsername)) {
            throw new CustomException(ErrorCode.LOGIN_USER_NOT_FOUND); // or USERNAME_DUPLICATED
        }
        User user = securityUtil.getCurrentUser();
        user.setUsername(newUsername);
    }

    /**
     * 대학교 변경
     */
    @Transactional
    public void updateUniversity(Long universityId) {
        University university = universityRepository.findById(universityId)
                .orElseThrow(() -> new CustomException(ErrorCode.UNIVERSITY_NOT_FOUND));
        User user = securityUtil.getCurrentUser();
        user.setUniversity(university);
    }
}
