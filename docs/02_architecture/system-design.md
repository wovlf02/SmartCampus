# 시스템 설계

**관련 문서**: [기술 스택](./tech-stack.md) | [파일 구조](./file-structure.md)

---

## 1. 시스템 아키텍처

### 1.1 전체 구조

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Mobile Client                                │
│                  (React Native 0.76.6 + JavaScript)                  │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │      REST API         │ ◄── HTTP/HTTPS
                    │      WebSocket        │ ◄── SockJS + STOMP
                    └───────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Backend Server                                │
│                  (Spring Boot 3.4.2 + Java 21)                       │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │Controller│  │ Service  │  │Repository│  │ Security │             │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘             │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                           │
│  │ WebSocket│  │   JWT    │  │   Mail   │                           │
│  │ Handler  │  │  Filter  │  │  Service │                           │
│  └──────────┘  └──────────┘  └──────────┘                           │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
              ┌─────────────────┴─────────────────┐
              │                                   │
              ▼                                   ▼
     ┌────────────────┐                 ┌────────────────┐
     │  Oracle 23c    │                 │     Redis      │
     │  (Main DB)     │                 │   (Cache)      │
     └────────────────┘                 └────────────────┘
```

### 1.2 통신 흐름

| 구간 | 프로토콜 | 용도 |
|------|----------|------|
| 앱 ↔ 백엔드 (API) | HTTPS | REST API 통신 |
| 앱 ↔ 백엔드 (채팅) | WebSocket (SockJS) | 실시간 채팅 |
| 백엔드 ↔ Oracle | JDBC | 데이터 영속화 |
| 백엔드 ↔ Redis | Redis Protocol | 토큰/세션 캐싱 |

---

## 2. 백엔드 계층 구조

### 2.1 레이어 아키텍처

```
┌────────────────────────────────────────────────────────────┐
│                      Controller Layer                       │
│  - HTTP 요청/응답 처리                                       │
│  - 요청 검증 (Validation)                                   │
│  - DTO 변환                                                 │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────┐
│                       Service Layer                         │
│  - 비즈니스 로직 처리                                        │
│  - 트랜잭션 관리                                            │
│  - 여러 Repository 조합                                     │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────┐
│                     Repository Layer                        │
│  - 데이터 접근 (JPA Repository)                              │
│  - 쿼리 메서드                                              │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────┐
│                       Entity Layer                          │
│  - 데이터베이스 테이블 매핑                                   │
│  - 연관관계 정의                                            │
└────────────────────────────────────────────────────────────┘
```

### 2.2 패키지 구조

```
com.smartcampus.back/
├── config/                 # 설정 클래스
│   ├── auth/              # 인증 설정
│   ├── socket/            # WebSocket 설정
│   └── web/               # 웹 설정 (CORS 등)
├── controller/             # REST API 컨트롤러
│   ├── admin/             # 관리자 API
│   ├── auth/              # 인증 API
│   ├── community/         # 커뮤니티 API
│   ├── file/              # 파일 API
│   ├── schedule/          # 시간표 API
│   └── user/              # 사용자 API
├── dto/                    # 요청/응답 DTO
│   ├── admin/
│   ├── auth/
│   ├── common/
│   ├── community/
│   ├── schedule/
│   └── user/
├── entity/                 # JPA 엔티티
│   ├── auth/              # User, University
│   ├── chat/              # 채팅 관련
│   ├── community/         # 게시판 관련
│   ├── friend/            # 친구 관련
│   └── schedule/          # 시간표
├── repository/             # JPA 리포지토리
│   ├── auth/
│   ├── chat/
│   ├── community/
│   ├── friend/
│   └── schedule/
├── service/                # 비즈니스 로직
│   ├── auth/
│   ├── community/
│   ├── schedule/
│   ├── user/
│   └── util/
├── handler/                # WebSocket 핸들러
├── security/               # 보안 관련
│   └── auth/
└── global/                 # 공통 모듈
    ├── annotation/        # 커스텀 어노테이션
    ├── exception/         # 예외 처리
    ├── response/          # 공통 응답 형식
    ├── security/          # 보안 유틸
    └── util/              # 유틸리티
```

---

## 3. 프론트엔드 구조

### 3.1 네비게이션 구조

```
App (NavigationContainer)
├── Intro Screen
├── Auth Stack
│   ├── Login
│   ├── Register
│   ├── FindAccount
│   ├── ResetPassword
│   └── UniversitySearch
└── Main Tab Navigator
    ├── Map Tab
    │   └── MapMain
    ├── Search Tab
    │   └── SearchMain
    ├── Community Tab (Drawer Navigator)
    │   ├── PostList
    │   ├── CreatePost
    │   ├── PostDetail
    │   ├── PostEdit
    │   ├── ChatRoomList
    │   ├── ChatRoom
    │   ├── Friend
    │   └── CreateChatRoom
    └── MyPage Tab (Stack Navigator)
        ├── MyPageMain
        ├── ProfileEdit
        ├── TimetableEdit
        ├── TimetableDelete
        ├── CorpusInput
        ├── ChangePassword
        ├── EditProfileImage
        ├── EditNickname
        ├── EditEmail
        ├── EditUsername
        ├── EditUniversity
        ├── UniversitySelect
        ├── Withdrawal
        └── ChangeLanguage
```

### 3.2 화면 흐름

```
┌──────────┐     ┌──────────┐     ┌──────────────────────────────┐
│  Intro   │────▶│  Login   │────▶│         Main Tabs            │
│  Screen  │     │  Screen  │     │  (Map/Search/Community/MyPage)│
└──────────┘     └──────────┘     └──────────────────────────────┘
                      │
                      ▼
              ┌──────────────┐
              │   Register   │
              │   Screen     │
              └──────────────┘
```

---

## 4. 인증 흐름

### 4.1 로그인 플로우

```
┌─────────┐    ┌─────────┐    ┌──────────┐    ┌──────────┐
│  App    │    │ Backend │    │ Database │    │  Redis   │
└────┬────┘    └────┬────┘    └────┬─────┘    └────┬─────┘
     │              │              │               │
     │  POST /auth/login           │               │
     │─────────────▶│              │               │
     │              │ 사용자 조회   │               │
     │              │─────────────▶│               │
     │              │◀─────────────│               │
     │              │              │               │
     │              │ 비밀번호 검증 │               │
     │              │              │               │
     │              │ JWT 생성     │               │
     │              │ (Access/Refresh)             │
     │              │              │               │
     │              │ RefreshToken 저장 (옵션)     │
     │              │─────────────────────────────▶│
     │              │              │               │
     │ accessToken, refreshToken   │               │
     │◀─────────────│              │               │
     │              │              │               │
```

### 4.2 토큰 갱신 플로우

```
┌─────────┐    ┌─────────┐
│  App    │    │ Backend │
└────┬────┘    └────┬────┘
     │              │
     │ API 요청 (만료된 AccessToken)
     │─────────────▶│
     │              │
     │  401 Unauthorized
     │◀─────────────│
     │              │
     │ POST /auth/refresh (RefreshToken)
     │─────────────▶│
     │              │
     │ 새 AccessToken
     │◀─────────────│
     │              │
     │ API 재요청 (새 AccessToken)
     │─────────────▶│
     │              │
```

---

## 5. 실시간 채팅 구조

### 5.1 WebSocket 연결

```
┌─────────┐                    ┌─────────────────┐
│  App    │                    │     Backend     │
│(SockJS) │                    │ (Spring WebSocket)
└────┬────┘                    └────────┬────────┘
     │                                  │
     │  WebSocket Connect               │
     │  /ws/chat?token=JWT              │
     │─────────────────────────────────▶│
     │                                  │
     │  Connected (STOMP)               │
     │◀─────────────────────────────────│
     │                                  │
     │  Subscribe /topic/chat/{roomId}  │
     │─────────────────────────────────▶│
     │                                  │
     │  Send Message                    │
     │  /app/chat/message               │
     │─────────────────────────────────▶│
     │                                  │
     │  Broadcast to /topic/chat/{roomId}
     │◀─────────────────────────────────│
     │                                  │
```

### 5.2 메시지 흐름

```
┌──────────┐    ┌──────────────────┐    ┌──────────┐
│  User A  │    │  Backend Server  │    │  User B  │
└────┬─────┘    └────────┬─────────┘    └────┬─────┘
     │                   │                   │
     │ Send Message      │                   │
     │──────────────────▶│                   │
     │                   │ Save to DB        │
     │                   │ Broadcast         │
     │                   │──────────────────▶│
     │                   │                   │
     │ Message Received  │                   │
     │◀──────────────────│                   │
     │                   │                   │
```

---

## 6. 데이터 흐름

### 6.1 게시글 작성 흐름

```
┌─────────┐    ┌─────────┐    ┌──────────┐    ┌─────────┐
│   App   │    │ Backend │    │ Database │    │ Storage │
└────┬────┘    └────┬────┘    └────┬─────┘    └────┬────┘
     │              │              │               │
     │ POST /posts  │              │               │
     │ (title, content, files)     │               │
     │─────────────▶│              │               │
     │              │              │               │
     │              │ 파일 저장    │               │
     │              │─────────────────────────────▶│
     │              │              │               │
     │              │ Post 저장   │               │
     │              │─────────────▶│               │
     │              │              │               │
     │              │ Attachment 저장              │
     │              │─────────────▶│               │
     │              │              │               │
     │  Success     │              │               │
     │◀─────────────│              │               │
```

---

**최종 업데이트**: 2026년 1월 30일
