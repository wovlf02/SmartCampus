# 마이페이지 화면

**관련 문서**: [화면 개요](./screens-overview.md) | [사용자 API](../04_api/api-user.md) | [시간표 API](../04_api/api-schedule.md)

---

## 1. MyPageScreen (메인)

- **파일**: `src/screens/mypage/MyPageScreen.js`
- **기능**:
  - 프로필 정보 표시 (프로필 이미지, 닉네임, 대학교)
  - 시간표 그리드 표시 (월~금, 1~12교시)
  - 메뉴 목록: 프로필 편집, 시간표 편집, 언어 변경, 로그아웃
- **사용 API**:
  - `GET /api/users/{userId}` - 사용자 정보
  - `GET /api/timetable` - 시간표 조회
- **라이브러리**:
  - `react-native-fast-image`: 프로필 이미지 표시

---

## 2. ProfileEditScreen (프로필 편집 메뉴)

- **파일**: `src/screens/mypage/ProfileEditScreen.js`
- **기능**:
  - 프로필 편집 옵션 목록
  - 각 편집 화면으로 이동 링크

---

## 3. ChangePasswordScreen (비밀번호 변경)

- **파일**: `src/screens/mypage/ChangePasswordScreen.js`
- **기능**:
  - 현재 비밀번호 확인
  - 새 비밀번호 입력 + 확인
- **사용 API**:
  - `PUT /api/auth/password/update`

---

## 4. EditProfileImageScreen (프로필 이미지)

- **파일**: `src/screens/mypage/EditProfileImageScreen.js`
- **기능**:
  - 현재 프로필 이미지 표시
  - 갤러리에서 새 이미지 선택
  - 이미지 업로드
- **사용 API**:
  - `PATCH /api/users/profile-image` (multipart/form-data)
- **라이브러리**:
  - `react-native-image-picker`

---

## 5. EditNicknameScreen (닉네임 변경)

- **파일**: `src/screens/mypage/EditNicknameScreen.js`
- **기능**:
  - 현재 닉네임 표시
  - 새 닉네임 입력
  - 중복 확인 후 변경
- **사용 API**:
  - `POST /api/auth/check-nickname` - 중복 확인
  - `PATCH /api/users/nickname` - 변경

---

## 6. EditEmailScreen (이메일 변경)

- **파일**: `src/screens/mypage/EditEmailScreen.js`
- **기능**:
  - 현재 이메일 표시
  - 새 이메일 입력
  - 이메일 인증 후 변경
- **사용 API**:
  - `POST /api/auth/check-email` - 중복 확인
  - `POST /api/auth/send-code` - 인증코드 발송
  - `POST /api/auth/verify-code` - 인증코드 검증
  - `PATCH /api/users/email` - 변경

---

## 7. EditUsernameScreen (아이디 변경)

- **파일**: `src/screens/mypage/EditUsernameScreen.js`
- **기능**:
  - 현재 아이디 표시
  - 새 아이디 입력
  - 중복 확인 후 변경
- **사용 API**:
  - `POST /api/auth/check-username` - 중복 확인
  - `PATCH /api/users/username` - 변경

---

## 8. EditUniversityScreen (대학 변경)

- **파일**: `src/screens/mypage/EditUniversityScreen.js`
- **기능**:
  - 현재 대학교 표시
  - UniversitySelectScreen으로 이동
  - 선택한 대학교로 변경
- **사용 API**:
  - `PATCH /api/users/university`

---

## 9. UniversitySelectScreen (대학 선택)

- **파일**: `src/screens/mypage/UniversitySelectScreen.js`
- **기능**:
  - 대학교 목록 검색
  - 대학교 선택 → 이전 화면으로 결과 전달
- **사용 API**:
  - `GET /api/universities/search?keyword=검색어`

---

## 10. TimetableEditScreen (시간표 편집)

- **파일**: `src/screens/mypage/TimetableEditScreen.js`
- **기능**:
  - 시간표 그리드 표시 (월~금, 1~12교시)
  - 수업 추가 모달 (CourseInputModal)
  - 수업 삭제
  - 시간표 일괄 저장
- **사용 API**:
  - `GET /api/timetable` - 조회
  - `POST /api/timetable` - 저장 (전체 교체)
- **컴포넌트**:
  - `components/CourseInputModal.js` - 과목 입력 모달

---

## 11. TimetableDeleteScreen (시간표 삭제)

- **파일**: `src/screens/mypage/TimetableDeleteScreen.js`
- **기능**:
  - 시간표 전체 삭제 확인
- **사용 API**:
  - `DELETE /api/timetable`

---

## 12. CorpusInputScreen

- **파일**: `src/screens/mypage/CorpusInputScreen.js`
- **설명**: 추가 기능용 화면 (확장 예정)

---

## 13. ChangeLanguageScreen (언어 변경)

- **파일**: `src/screens/mypage/ChangeLanguageScreen.js`
- **기능**:
  - 지원 언어 목록 표시 (한국어, English)
  - 언어 선택 시 앱 언어 변경
- **라이브러리**:
  - `i18next`: 다국어 설정 변경
  - `AsyncStorage`: 언어 설정 저장

---

## 14. WithdrawalScreen (회원 탈퇴)

- **파일**: `src/screens/mypage/WithdrawalScreen.js`
- **기능**:
  - 탈퇴 안내 메시지
  - 비밀번호 확인
  - 회원 탈퇴 처리 → 로그인 화면 이동
- **사용 API**:
  - `POST /api/users/withdraw`
  - 또는 `DELETE /api/auth/withdraw`

---

**최종 업데이트**: 2026년 1월 30일
