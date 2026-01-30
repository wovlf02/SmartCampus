# 📚 Smart Campus 문서

> React Native + Spring Boot + Oracle 기반 교내 네비게이션 및 커뮤니티 앱 프로젝트 문서

## 📋 문서 구조

```
docs/
├── 01_overview/           # 프로젝트 개요
│   ├── project-overview.md    # 프로젝트 소개
│   └── glossary.md            # 용어 정의
├── 02_architecture/       # 아키텍처 설계
│   ├── tech-stack.md          # 기술 스택
│   ├── system-design.md       # 시스템 설계
│   └── file-structure.md      # 파일 구조
├── 03_database/           # 데이터베이스 설계
│   ├── database-overview.md   # DB 설계 개요
│   ├── entity-auth.md         # 인증 도메인 엔티티
│   ├── entity-community.md    # 커뮤니티 도메인 엔티티
│   ├── entity-chat.md         # 채팅 도메인 엔티티
│   ├── entity-friend.md       # 친구 도메인 엔티티
│   └── entity-schedule.md     # 시간표 도메인 엔티티
├── 04_api/                # API 명세
│   ├── api-overview.md        # API 공통 사항
│   ├── api-auth.md            # 인증 API
│   ├── api-user.md            # 사용자 API
│   ├── api-community.md       # 커뮤니티 API
│   ├── api-chat.md            # 채팅 API
│   ├── api-friend.md          # 친구 API
│   └── api-schedule.md        # 시간표 API
├── 05_screens/            # 화면 설계
│   ├── screens-overview.md    # 화면 구조 개요
│   ├── screens-auth.md        # 인증 화면
│   ├── screens-map.md         # 지도 화면
│   ├── screens-community.md   # 커뮤니티 화면
│   └── screens-mypage.md      # 마이페이지 화면
├── 06_development/        # 개발 가이드
│   ├── setup-backend.md       # 백엔드 환경 설정
│   ├── setup-frontend.md      # 프론트엔드 환경 설정
│   └── coding-conventions.md  # 코딩 컨벤션
└── README.md              # 문서 안내 (현재 파일)
```

---

## 🎯 프로젝트 요약

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Smart Campus (교내 네비게이션 및 커뮤니티 앱) |
| **대상 사용자** | 대학생, 외국인 유학생, 캠퍼스 방문자 |
| **프레임워크** | React Native 0.76.6 (Frontend) / Spring Boot 3.4.2 (Backend) |
| **언어** | JavaScript (Frontend) / Java 21 (Backend) |
| **데이터베이스** | Oracle Database XE 21c |
| **런타임** | Node.js 22 (LTS) |

---

## 🚀 핵심 기능

| 기능 | 설명 | 구현 상태 |
|------|------|----------|
| **캠퍼스 지도** | Kakao Map API 기반 실시간 위치 표시 | ✅ 완료 |
| **건물 검색** | 캠퍼스 내 건물 및 시설 검색 | 🔄 진행 중 |
| **커뮤니티 게시판** | 게시글 CRUD, 댓글/대댓글, 좋아요, 즐겨찾기, 신고, 차단 | ✅ 완료 |
| **실시간 채팅** | WebSocket 기반 1:1 및 그룹 채팅, 읽음 표시 | ✅ 완료 |
| **친구 관리** | 친구 요청/수락/거절, 차단, 신고 | ✅ 완료 |
| **시간표 관리** | 개인 시간표 등록 및 관리 (교시 기반) | ✅ 완료 |
| **다국어 지원** | i18n 기반 다국어 UI (한국어, English) | ✅ 완료 |
| **인증** | JWT 기반 로그인, 이메일 인증, 비밀번호 재설정 | ✅ 완료 |

---

## 📖 문서 읽는 순서

1. [프로젝트 개요](./01_overview/project-overview.md)
2. [용어 정의](./01_overview/glossary.md)
3. [기술 스택](./02_architecture/tech-stack.md)
4. [시스템 설계](./02_architecture/system-design.md)
5. [데이터베이스 설계](./03_database/database-overview.md)
6. [API 명세](./04_api/api-overview.md)
7. [화면 설계](./05_screens/screens-overview.md)
8. [개발 환경 설정](./06_development/setup-backend.md)

---

## 📊 구현 현황

### Backend (Spring Boot)

| 도메인 | 컨트롤러 | 엔티티 | 상태 |
|--------|----------|--------|------|
| 인증 | AuthController, UniversityController | User, University | ✅ |
| 사용자 | UserController | - | ✅ |
| 게시글 | PostController | Post, Attachment | ✅ |
| 댓글 | CommentController | Comment, Reply | ✅ |
| 좋아요 | LikeController | Like | ✅ |
| 신고 | ReportController | Report | ✅ |
| 차단 | BlockController | Block | ✅ |
| 채팅 | ChatRoomController, ChatMessageController, DirectChatController | ChatRoom, ChatMessage, ChatParticipant, ChatRead | ✅ |
| 친구 | FriendController | Friend, FriendRequest, FriendBlock, FriendReport | ✅ |
| 시간표 | TimetableController | Timetable | ✅ |

### Frontend (React Native)

| 카테고리 | 화면 수 | 상태 |
|----------|---------|------|
| 인증 | 6개 | ✅ |
| 지도 | 2개 | ✅ |
| 검색 | 1개 | 🔄 |
| 커뮤니티 | 8개 | ✅ |
| 마이페이지 | 14개 | ✅ |
| **합계** | **31개** | |

---

**최종 업데이트**: 2026년 1월 30일
