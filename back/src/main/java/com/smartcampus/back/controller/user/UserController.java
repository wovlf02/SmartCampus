package com.smartcampus.back.controller.user;

import com.smartcampus.back.dto.auth.request.PasswordConfirmRequest;
import com.smartcampus.back.dto.auth.response.UserProfileResponse;
import com.smartcampus.back.entity.auth.User;
import com.smartcampus.back.global.security.SecurityUtil;
import com.smartcampus.back.service.auth.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final SecurityUtil securityUtil;

    /**
     * 내 정보 조회 (/me)
     */
    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMyInfo() {
        return ResponseEntity.ok(userService.getMyProfile());
    }

    /**
     * 회원 탈퇴
     */
    @PostMapping("/withdraw")
    public ResponseEntity<Void> withdraw(@RequestBody PasswordConfirmRequest request) {
        userService.withdraw(request);
        return ResponseEntity.ok().build();
    }

    /**
     * 사용자 ID로 프로필 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserProfileResponse> getUserById(@PathVariable Long id) {
        User user = securityUtil.getUserById(id);
        return ResponseEntity.ok(UserProfileResponse.from(user));
    }
}
