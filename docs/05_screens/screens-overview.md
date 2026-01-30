# 화면 구조 개요

**관련 문서**: [인증 화면](./screens-auth.md) | [커뮤니티 화면](./screens-community.md) | [지도 화면](./screens-map.md) | [마이페이지 화면](./screens-mypage.md)

---

## 1. 네비게이션 구조

```
App (NavigationContainer)
├── IntroScreen                    # 앱 시작 (토큰 체크)
├── Auth Stack (비로그인)
│   ├── LoginScreen               # 로그인
│   ├── RegisterScreen            # 회원가입
│   ├── FindAccountScreen         # 계정 찾기
│   ├── ResetPasswordScreen       # 비밀번호 재설정
│   └── UniversitySearchScreen    # 대학교 검색
└── Main Tab Navigator (로그인)
    ├── 지도 탭 (Stack)
    │   ├── MapMainScreen         # 캠퍼스 지도
    │   └── KakaoNavigationScreen # 네비게이션
    ├── 검색 탭
    │   └── SearchMainScreen      # 건물 검색
    ├── 커뮤니티 탭 (Drawer)
    │   ├── PostListScreen        # 게시글 목록
    │   ├── CreatePostScreen      # 게시글 작성
    │   ├── PostDetailScreen      # 게시글 상세
    │   ├── PostEditScreen        # 게시글 수정
    │   ├── ChatRoomListScreen    # 채팅방 목록
    │   ├── ChatRoomScreen        # 채팅방
    │   ├── CreateChatRoomScreen  # 채팅방 생성
    │   └── FriendScreen          # 친구 관리
    └── 마이페이지 탭 (Stack)
        ├── MyPageScreen          # 마이페이지 메인
        ├── ProfileEditScreen     # 프로필 편집 메뉴
        ├── ChangePasswordScreen  # 비밀번호 변경
        ├── EditProfileImageScreen # 프로필 이미지
        ├── EditNicknameScreen    # 닉네임 변경
        ├── EditEmailScreen       # 이메일 변경
        ├── EditUsernameScreen    # 아이디 변경
        ├── EditUniversityScreen  # 대학교 변경
        ├── UniversitySelectScreen # 대학교 선택
        ├── TimetableEditScreen   # 시간표 편집
        ├── TimetableDeleteScreen # 시간표 삭제
        ├── CorpusInputScreen     # 추가 기능
        ├── ChangeLanguageScreen  # 언어 변경
        └── WithdrawalScreen      # 회원 탈퇴
```

---

## 2. 탭 구성

| 탭 | 아이콘 | 메인 화면 | 설명 |
|----|--------|-----------|------|
| 지도 | map.png | MapMainScreen | 캠퍼스 지도 및 네비게이션 |
| 검색 | search.png | SearchMainScreen | 건물/시설 검색 |
| 커뮤니티 | community.png | PostListScreen | 게시판, 채팅, 친구 |
| 마이페이지 | mypage.png | MyPageScreen | 프로필, 시간표, 설정 |

---

## 3. 화면 수 요약

| 카테고리 | 화면 수 | 주요 화면 |
|----------|---------|-----------|
| 인트로 | 1개 | IntroScreen |
| 인증 | 5개 | Login, Register, FindAccount, ResetPassword, UniversitySearch |
| 지도 | 2개 | MapMain, KakaoNavigation |
| 검색 | 1개 | SearchMain |
| 커뮤니티 | 8개 | PostList, CreatePost, PostDetail, PostEdit, ChatRoomList, ChatRoom, CreateChatRoom, Friend |
| 마이페이지 | 14개 | MyPage, ProfileEdit, ChangePassword, EditProfileImage, EditNickname, EditEmail, EditUsername, EditUniversity, UniversitySelect, TimetableEdit, TimetableDelete, CorpusInput, ChangeLanguage, Withdrawal |
| **합계** | **31개** | |

---

## 4. 주요 라이브러리

| 라이브러리 | 용도 | 사용 화면 |
|------------|------|-----------|
| `@react-navigation/native` | 네비게이션 | 전체 |
| `@react-navigation/stack` | 스택 네비게이션 | Auth, MyPage |
| `@react-navigation/bottom-tabs` | 하단 탭 | Main |
| `@react-navigation/drawer` | 드로어 | Community |
| `react-native-webview` | WebView | MapMain |
| `sockjs-client` | WebSocket | ChatRoom |
| `react-native-image-picker` | 이미지 선택 | Register, Profile, Post |
| `react-native-fast-image` | 이미지 최적화 | Profile, Chat, Post |
| `i18next` | 다국어 | ChangeLanguage |
| `jwt-decode` | JWT 파싱 | 인증 관련 화면 |
| `moment` | 날짜 포맷 | 게시글, 채팅 |

---

**최종 업데이트**: 2026년 1월 30일
