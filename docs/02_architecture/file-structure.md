# 파일 구조

**관련 문서**: [기술 스택](./tech-stack.md) | [시스템 설계](./system-design.md)

---

## 1. 프로젝트 루트 구조

```
SmartCampus/
├── back/                           # Spring Boot 백엔드
├── front/                          # React Native 프론트엔드
├── docs/                           # 프로젝트 문서
├── docs_inf/                       # 문서 참조 (템플릿)
├── lib/                            # 외부 라이브러리
├── uploads/                        # 업로드 파일 저장소
│   ├── chatroom/                  # 채팅 첨부파일
│   └── community/                 # 게시판 첨부파일
└── README.md                       # 프로젝트 README
```

---

## 2. Backend 구조 (Spring Boot)

```
back/
├── build.gradle                    # Gradle 빌드 설정
├── settings.gradle                 # Gradle 프로젝트 설정
├── gradlew                         # Gradle Wrapper (Unix)
├── gradlew.bat                     # Gradle Wrapper (Windows)
├── gradle/
│   └── wrapper/                   # Gradle Wrapper 파일
└── src/
    ├── main/
    │   ├── java/com/smartcampus/back/
    │   │   ├── BackApplication.java       # 메인 클래스
    │   │   │
    │   │   ├── config/                    # 설정 클래스
    │   │   │   ├── auth/                 # 인증 설정
    │   │   │   ├── socket/               # WebSocket 설정
    │   │   │   └── web/                  # 웹 설정 (CORS 등)
    │   │   │
    │   │   ├── controller/               # REST API 컨트롤러
    │   │   │   ├── admin/               # 관리자 API
    │   │   │   │   └── AdminReportController.java
    │   │   │   ├── auth/                # 인증 API
    │   │   │   │   ├── AuthController.java
    │   │   │   │   └── UniversityController.java
    │   │   │   ├── community/           # 커뮤니티 API
    │   │   │   │   ├── attachment/
    │   │   │   │   │   └── AttachmentController.java
    │   │   │   │   ├── block/
    │   │   │   │   │   └── BlockController.java
    │   │   │   │   ├── chat/
    │   │   │   │   │   ├── ChatAttachmentController.java
    │   │   │   │   │   ├── ChatMessageController.java
    │   │   │   │   │   ├── ChatRoomController.java
    │   │   │   │   │   └── DirectChatController.java
    │   │   │   │   ├── comment/
    │   │   │   │   │   └── CommentController.java
    │   │   │   │   ├── friend/
    │   │   │   │   │   └── FriendController.java
    │   │   │   │   ├── like/
    │   │   │   │   │   └── LikeController.java
    │   │   │   │   ├── post/
    │   │   │   │   │   └── PostController.java
    │   │   │   │   └── report/
    │   │   │   │       └── ReportController.java
    │   │   │   ├── file/                # 파일 API
    │   │   │   │   └── FileUploadController.java
    │   │   │   ├── schedule/            # 시간표 API
    │   │   │   │   └── TimetableController.java
    │   │   │   └── user/                # 사용자 API
    │   │   │       └── UserController.java
    │   │   │
    │   │   ├── dto/                      # 요청/응답 DTO
    │   │   │   ├── admin/
    │   │   │   ├── auth/
    │   │   │   │   ├── request/         # 요청 DTO
    │   │   │   │   └── response/        # 응답 DTO
    │   │   │   ├── common/              # 공통 DTO
    │   │   │   ├── community/
    │   │   │   │   ├── post/
    │   │   │   │   ├── comment/
    │   │   │   │   └── chat/
    │   │   │   ├── schedule/
    │   │   │   └── user/
    │   │   │
    │   │   ├── entity/                   # JPA 엔티티
    │   │   │   ├── auth/
    │   │   │   │   ├── User.java
    │   │   │   │   └── University.java
    │   │   │   ├── chat/
    │   │   │   │   ├── ChatRoom.java
    │   │   │   │   ├── ChatRoomType.java
    │   │   │   │   ├── ChatMessage.java
    │   │   │   │   ├── ChatMessageType.java
    │   │   │   │   ├── ChatParticipant.java
    │   │   │   │   └── ChatRead.java
    │   │   │   ├── community/
    │   │   │   │   ├── Post.java
    │   │   │   │   ├── Comment.java
    │   │   │   │   ├── Reply.java
    │   │   │   │   ├── Like.java
    │   │   │   │   ├── Attachment.java
    │   │   │   │   ├── PostFavorite.java
    │   │   │   │   ├── Report.java
    │   │   │   │   ├── ReportStatus.java
    │   │   │   │   └── Block.java
    │   │   │   ├── friend/
    │   │   │   │   ├── Friend.java
    │   │   │   │   ├── FriendRequest.java
    │   │   │   │   ├── FriendRequestStatus.java
    │   │   │   │   ├── FriendBlock.java
    │   │   │   │   ├── FriendReport.java
    │   │   │   │   └── FriendReportStatus.java
    │   │   │   └── schedule/
    │   │   │       ├── Timetable.java
    │   │   │       └── DayOfWeek.java
    │   │   │
    │   │   ├── repository/               # JPA 리포지토리
    │   │   │   ├── auth/
    │   │   │   ├── chat/
    │   │   │   ├── community/
    │   │   │   ├── friend/
    │   │   │   └── schedule/
    │   │   │
    │   │   ├── service/                  # 비즈니스 로직
    │   │   │   ├── auth/
    │   │   │   ├── community/
    │   │   │   │   ├── post/
    │   │   │   │   ├── comment/
    │   │   │   │   └── chat/
    │   │   │   ├── schedule/
    │   │   │   ├── user/
    │   │   │   └── util/
    │   │   │
    │   │   ├── handler/                  # WebSocket 핸들러
    │   │   │   └── ChatWebSocketHandler.java
    │   │   │
    │   │   ├── security/                 # 보안 관련
    │   │   │   └── auth/
    │   │   │
    │   │   └── global/                   # 공통 모듈
    │   │       ├── annotation/          # 커스텀 어노테이션
    │   │       ├── exception/           # 예외 처리
    │   │       ├── response/            # 공통 응답 형식
    │   │       ├── security/            # 보안 유틸
    │   │       └── util/                # 유틸리티
    │   │
    │   └── resources/
    │       ├── application.yml          # 애플리케이션 설정
    │       ├── static/                  # 정적 리소스
    │       └── templates/               # 템플릿 (이메일 등)
    │
    └── test/                            # 테스트 코드
        └── java/com/smartcampus/back/
```

---

## 3. Frontend 구조 (React Native)

```
front/
├── App.js                              # 앱 진입점 및 네비게이션
├── app.json                            # 앱 설정
├── package.json                        # npm 의존성
├── package-lock.json
├── babel.config.js                     # Babel 설정
├── metro.config.js                     # Metro 번들러 설정
├── tsconfig.json                       # TypeScript 설정
├── jest.config.js                      # Jest 테스트 설정
├── i18n.js                             # i18n 설정
├── Gemfile                             # iOS CocoaPods 설정
├── index.js                            # 앱 등록
│
├── src/
│   ├── api/                            # API 통신 모듈
│   │   └── api.js                     # Axios 인스턴스
│   │
│   ├── screens/                        # 화면 컴포넌트
│   │   ├── IntroScreen.js             # 인트로 화면
│   │   │
│   │   ├── auth/                      # 인증 화면
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   ├── FindAccountScreen.js
│   │   │   ├── ResetPasswordScreen.js
│   │   │   └── UniversitySearchScreen.js
│   │   │
│   │   ├── map/                       # 지도 화면
│   │   │   ├── MapMainScreen.js
│   │   │   └── KakaoNavigationScreen.js
│   │   │
│   │   ├── search/                    # 검색 화면
│   │   │   └── SearchMainScreen.js
│   │   │
│   │   ├── community/                 # 커뮤니티 화면
│   │   │   ├── PostListScreen.js
│   │   │   ├── CreatePostScreen.js
│   │   │   ├── PostDetailScreen.js
│   │   │   ├── PostEditScreen.js
│   │   │   ├── ChatRoomListScreen.js
│   │   │   ├── ChatRoomScreen.js
│   │   │   ├── CreateChatRoomScreen.js
│   │   │   └── FriendScreen.js
│   │   │
│   │   └── mypage/                    # 마이페이지 화면
│   │       ├── MyPageScreen.js
│   │       ├── ProfileEditScreen.js
│   │       ├── ChangePasswordScreen.js
│   │       ├── EditProfileImageScreen.js
│   │       ├── EditNicknameScreen.js
│   │       ├── EditEmailScreen.js
│   │       ├── EditUsernameScreen.js
│   │       ├── EditUniversityScreen.js
│   │       ├── UniversitySelectScreen.js
│   │       ├── WithdrawalScreen.js
│   │       ├── TimetableEditScreen.js
│   │       ├── TimetableDeleteScreen.js
│   │       ├── CorpusInputScreen.js
│   │       ├── ChangeLanguageScreen.js
│   │       └── components/           # 마이페이지 컴포넌트
│   │
│   └── assets/                        # 이미지, 아이콘
│       ├── map.png
│       ├── search.png
│       ├── community.png
│       ├── mypage.png
│       ├── google.png
│       ├── kakao.png
│       ├── naver.png
│       ├── github.png
│       ├── password-show.png
│       └── password-hide.png
│
├── locales/                            # 다국어 리소스
│   ├── en.json
│   └── ko.json
│
├── android/                            # Android 네이티브
│   ├── app/
│   ├── build.gradle
│   └── settings.gradle
│
├── ios/                                # iOS 네이티브
│   ├── Podfile
│   └── [프로젝트명]/
│
└── __tests__/                          # 테스트 코드
```

---

## 4. 문서 구조

```
docs/
├── README.md                           # 문서 안내
│
├── 01_overview/                        # 프로젝트 개요
│   ├── project-overview.md
│   └── glossary.md
│
├── 02_architecture/                    # 아키텍처 설계
│   ├── tech-stack.md
│   ├── system-design.md
│   └── file-structure.md
│
├── 03_database/                        # 데이터베이스 설계
│   ├── database-overview.md
│   ├── entity-auth.md
│   ├── entity-community.md
│   ├── entity-chat.md
│   ├── entity-friend.md
│   └── entity-schedule.md
│
├── 04_api/                             # API 명세
│   ├── api-overview.md
│   ├── api-auth.md
│   ├── api-user.md
│   ├── api-community.md
│   ├── api-chat.md
│   └── api-schedule.md
│
├── 05_screens/                         # 화면 설계
│   ├── screens-overview.md
│   ├── screens-auth.md
│   ├── screens-map.md
│   ├── screens-community.md
│   └── screens-mypage.md
│
└── 06_development/                     # 개발 가이드
    ├── setup-backend.md
    ├── setup-frontend.md
    └── coding-conventions.md
```

---

**최종 업데이트**: 2026년 1월 30일
