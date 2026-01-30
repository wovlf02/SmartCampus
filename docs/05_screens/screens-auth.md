# 인증 화면

**관련 문서**: [화면 개요](./screens-overview.md) | [인증 API](../04_api/api-auth.md)

---

## 1. IntroScreen (인트로)

- **파일**: `src/screens/IntroScreen.js`
- **설명**: 앱 시작 화면
- **기능**:
  - 저장된 Access Token 확인
  - 토큰 유효 시 → Main 화면 이동
  - 토큰 없음/만료 → Login 화면 이동
- **사용 API**: 없음 (로컬 토큰 체크)

---

## 2. LoginScreen (로그인)

- **파일**: `src/screens/auth/LoginScreen.js`
- **기능**:
  - 아이디/비밀번호 입력
  - 비밀번호 표시/숨김 토글 (eye icon)
  - 소셜 로그인 버튼 (Google, Kakao, Naver, GitHub)
  - 계정 찾기, 회원가입 링크
- **사용 API**:
  - `POST /api/auth/login` - 로그인
  - `GET /api/auth/{platform}` - 소셜 로그인 리다이렉트
- **저장소**:
  - `EncryptedStorage`: accessToken, refreshToken, userId 저장
- **라이브러리**:
  - `jwt-decode`: 토큰에서 userId 추출

---

## 3. RegisterScreen (회원가입)

- **파일**: `src/screens/auth/RegisterScreen.js`
- **기능**:
  - 아이디 입력 + 중복 확인
  - 비밀번호 입력 + 확인
  - 이메일 입력 + 인증코드 발송/검증
  - 닉네임 입력 + 중복 확인
  - 대학교 선택 (UniversitySearchScreen 연동)
  - 프로필 이미지 업로드 (선택)
- **사용 API**:
  - `POST /api/auth/check-username` - 아이디 중복 확인
  - `POST /api/auth/check-nickname` - 닉네임 중복 확인
  - `POST /api/auth/check-email` - 이메일 중복 확인
  - `POST /api/auth/send-code` - 인증코드 발송
  - `POST /api/auth/verify-code` - 인증코드 검증
  - `POST /api/auth/register` - 회원가입 (multipart/form-data)
- **라이브러리**:
  - `react-native-image-picker`: 프로필 이미지 선택

---

## 4. FindAccountScreen (계정 찾기)

- **파일**: `src/screens/auth/FindAccountScreen.js`
- **기능**:
  - 아이디 찾기: 이메일 인증 → 마스킹된 아이디 표시
  - 비밀번호 찾기로 이동
- **사용 API**:
  - `POST /api/auth/find-username/send-code`
  - `POST /api/auth/find-username/verify-code`

---

## 5. ResetPasswordScreen (비밀번호 재설정)

- **파일**: `src/screens/auth/ResetPasswordScreen.js`
- **기능**:
  - 아이디 + 이메일로 본인 확인
  - 인증코드 검증
  - 새 비밀번호 설정
- **사용 API**:
  - `POST /api/auth/password/request` - 본인 확인 요청
  - `POST /api/auth/password/verify-code` - 인증코드 검증
  - `PUT /api/auth/password/update` - 새 비밀번호 저장

---

## 6. UniversitySearchScreen (대학교 검색)

- **파일**: `src/screens/auth/UniversitySearchScreen.js`
- **기능**:
  - 대학교 목록 검색
  - 대학교 선택 → 이전 화면으로 결과 전달
- **사용 API**:
  - `GET /api/universities/search?keyword=검색어`

---

**최종 업데이트**: 2026년 1월 30일
