# 🏫 Smart Campus

> React Native + Spring Boot + Oracle 기반 교내 네비게이션 및 커뮤니티 앱

[![React Native](https://img.shields.io/badge/React%20Native-0.76.6-61DAFB?logo=react)](https://reactnative.dev/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.2-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk)](https://openjdk.org/)
[![Oracle](https://img.shields.io/badge/Oracle-23c-F80000?logo=oracle)](https://www.oracle.com/database/)

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [요구사항 분석 문서](#-요구사항-분석-문서)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [환경 변수](#-환경-변수)
- [API 문서](#-api-문서)
- [테스트](#-테스트)
- [기여 가이드](#-기여-가이드)
- [라이선스](#-라이선스)

---

## 🎯 프로젝트 소개

**Smart Campus**는 대학 캠퍼스 내 사용자 경험을 혁신하는 통합 모바일 애플리케이션입니다.

### 개발 배경
- 넓은 캠퍼스에서 초행자의 길찾기 어려움
- 분산된 캠퍼스 정보 접근의 불편함
- 재학생 간 소통 및 정보 공유 채널 부재
- 외국인 유학생의 언어 장벽

### 프로젝트 목표
- 실시간 캠퍼스 내 경로 안내 제공
- 커뮤니티 기반 정보 공유 플랫폼 구축
- 다국어 지원으로 외국인 유학생 접근성 향상
- 개인화된 시간표 기반 알림 서비스

---

## 📊 요구사항 분석 문서

프로젝트 기획 단계에서 작성된 요구사항 분석 문서가 Google Sheets로 관리되고 있습니다.

### 문서 구성

- **요구사항 분석**: 프로젝트의 기능별 요구사항 및 우선순위
- **API 명세**: 초기 API 설계 및 엔드포인트 정의
- **테이블 명세**: 데이터베이스 테이블 구조 및 관계 설계
- **기타 기획 자료**: 화면 설계, 유저 플로우 등

### 문서 링크

📝 [Smart Campus 요구사항 분석 문서](https://docs.google.com/spreadsheets/d/1KcoB5avT7QRjVYNFVk6eni43AjYy_i887rBT_G90jk8/edit?gid=2090704395#gid=2090704395)

> **참고**: 문서의 일부 내용은 현재 구현에 반영되었으며, 일부는 변경되었을 수 있습니다. 현재 최신 명세는 [docs/](./docs/) 폴더의 문서를 참조하세요.

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🗺️ **캠퍼스 지도** | T Map SDK 기반 실시간 위치 표시 및 경로 안내 |
| 🔍 **건물 검색** | 캠퍼스 내 건물 및 시설 검색 |
| 📝 **커뮤니티 게시판** | 게시글 작성/수정/삭제, 댓글, 좋아요, 신고 기능 |
| 💬 **실시간 채팅** | WebSocket 기반 1:1 및 그룹 채팅 |
| 👥 **친구 관리** | 친구 요청/수락/차단, 친구 목록 관리 |
| 📅 **시간표 관리** | 개인 시간표 등록 및 관리 |
| 👤 **마이페이지** | 프로필 수정, 비밀번호 변경, 대학 설정 |
| 🌐 **다국어 지원** | i18n 기반 다국어 UI 지원 |
| 🔐 **인증** | JWT 기반 로그인, 소셜 로그인(카카오/네이버/구글/GitHub) |

---

## 🛠️ 기술 스택

### Frontend (Mobile)

| 기술 | 버전 | 용도 |
|------|------|------|
| React Native | 0.76.6 | 크로스 플랫폼 모바일 앱 |
| JavaScript | ES6+ | 프로그래밍 언어 |
| React Navigation | 7.x | 화면 네비게이션 |
| Axios | 1.7.9 | HTTP 클라이언트 |
| i18next | 25.2.1 | 다국어 지원 |
| SockJS + STOMP | - | 실시간 WebSocket 통신 |

### Backend (API Server)

| 기술 | 버전 | 용도 |
|------|------|------|
| Spring Boot | 3.4.2 | 백엔드 프레임워크 |
| Java | 21 (LTS) | 프로그래밍 언어 |
| Spring Security | 6.x | 인증/인가 |
| Spring Data JPA | - | ORM, 데이터 액세스 |
| Spring WebSocket | - | 실시간 채팅 |
| JWT (jjwt) | 0.11.5 | 토큰 기반 인증 |

### Database & Infrastructure

| 기술 | 버전 | 용도 |
|------|------|------|
| Oracle Database | 23c | 메인 관계형 데이터베이스 |
| Redis | - | 세션/토큰 캐싱 |
| Gradle | Wrapper | 빌드 도구 |

---

## 📁 프로젝트 구조

```
SmartCampus/
├── back/                           # Spring Boot 백엔드
│   ├── src/main/java/com/smartcampus/back/
│   │   ├── BackApplication.java    # 애플리케이션 진입점
│   │   ├── config/                 # 설정 (Auth, Socket, Web)
│   │   ├── controller/             # REST API 컨트롤러
│   │   │   ├── auth/               # 인증 API
│   │   │   ├── community/          # 커뮤니티 API (게시글, 채팅, 친구)
│   │   │   ├── user/               # 사용자 API
│   │   │   └── schedule/           # 시간표 API
│   │   ├── dto/                    # 요청/응답 DTO
│   │   ├── entity/                 # JPA 엔티티
│   │   │   ├── auth/               # User, University
│   │   │   ├── chat/               # ChatRoom, ChatMessage
│   │   │   ├── community/          # Post, Comment, Like
│   │   │   ├── friend/             # Friend, FriendRequest
│   │   │   └── schedule/           # Timetable
│   │   ├── repository/             # JPA 리포지토리
│   │   ├── service/                # 비즈니스 로직
│   │   ├── handler/                # WebSocket 핸들러
│   │   ├── security/               # 보안 설정
│   │   └── global/                 # 공통 유틸, 예외처리
│   ├── build.gradle                # Gradle 빌드 설정
│   └── gradlew                     # Gradle Wrapper
│
├── front/                          # React Native 프론트엔드
│   ├── App.js                      # 앱 진입점 및 네비게이션
│   ├── src/
│   │   ├── api/                    # API 통신 모듈
│   │   │   └── api.js              # Axios 인스턴스
│   │   ├── screens/                # 화면 컴포넌트
│   │   │   ├── auth/               # 인증 화면
│   │   │   ├── community/          # 커뮤니티 화면
│   │   │   ├── map/                # 지도 화면
│   │   │   ├── mypage/             # 마이페이지 화면
│   │   │   └── search/             # 검색 화면
│   │   └── assets/                 # 이미지, 아이콘
│   ├── locales/                    # 다국어 리소스
│   ├── android/                    # Android 네이티브
│   ├── ios/                        # iOS 네이티브
│   └── package.json                # npm 의존성
│
├── docs/                           # 프로젝트 문서
│   ├── 01_overview/                # 프로젝트 개요
│   ├── 02_architecture/            # 아키텍처 설계
│   ├── 03_database/                # 데이터베이스 설계
│   ├── 04_api/                     # API 명세
│   ├── 05_screens/                 # 화면 설계
│   └── 06_development/             # 개발 가이드
│
└── README.md                       # 프로젝트 문서 (현재 파일)
```

---

## 🚀 시작하기

### 사전 요구사항

- **Java 21** (JDK)
- **Node.js 22** (LTS)
- **Oracle Database XE 21c**
- **Redis** (선택사항, 토큰 캐싱용)
- **Android Studio** (Android 빌드)
- **Xcode** (iOS 빌드, macOS 필요)

### 백엔드 실행

```bash
# 프로젝트 루트에서
cd back

# 빌드
./gradlew clean build

# 실행
./gradlew bootRun
```

### 프론트엔드 실행

```bash
# 프로젝트 루트에서
cd front

# 의존성 설치
npm install

# iOS 의존성 설치 (macOS)
cd ios && pod install && cd ..

# Metro 번들러 시작
npm start

# Android 실행
npm run android

# iOS 실행 (macOS)
npm run ios
```

---

## ⚙️ 환경 변수

### 백엔드 (application.yml)

```yaml
spring:
  datasource:
    url: ${SPRING_DATASOURCE_URL}           # jdbc:oracle:thin:@localhost:1521:xe
    username: ${SPRING_DATASOURCE_USERNAME}
    password: ${SPRING_DATASOURCE_PASSWORD}
  redis:
    host: ${SPRING_REDIS_HOST}              # localhost
    port: ${SPRING_REDIS_PORT}              # 6379
  mail:
    host: ${MAIL_HOST}
    port: ${MAIL_PORT}
    username: ${MAIL_USERNAME}
    password: ${MAIL_PASSWORD}

jwt:
  secret: ${JWT_SECRET}                     # JWT 서명 비밀키
```

### 프론트엔드 (api.js)

```javascript
const BASE_URL = 'http://192.168.0.2:8080/api';  // 백엔드 서버 주소
```

---

## 📖 API 문서

주요 API 엔드포인트:

| 분류 | 엔드포인트 | 설명 |
|------|-----------|------|
| 인증 | `POST /api/auth/login` | 로그인 |
| 인증 | `POST /api/auth/register` | 회원가입 |
| 사용자 | `GET /api/users/me` | 내 정보 조회 |
| 사용자 | `PATCH /api/users/nickname` | 닉네임 변경 |
| 게시글 | `GET /api/community/posts` | 게시글 목록 |
| 게시글 | `POST /api/community/posts` | 게시글 작성 |
| 채팅 | `GET /api/chat/rooms` | 채팅방 목록 |
| 채팅 | `WS /ws/chat` | 채팅 WebSocket |
| 시간표 | `GET /api/schedule/timetable` | 시간표 조회 |

> 상세 API 명세는 [docs/04_api/](./docs/04_api/) 폴더를 참조하세요.

---

## 🧪 테스트

### 백엔드 테스트

```bash
cd back
./gradlew test
```

### 프론트엔드 테스트

```bash
cd front
npm test
```

---

## 🤝 기여 가이드

1. 이슈 생성 및 설명 작성
2. 브랜치 생성: `feature/기능명` 또는 `fix/버그명`
3. 커밋 메시지 컨벤션:
   - `feat:` 새로운 기능
   - `fix:` 버그 수정
   - `docs:` 문서 수정
   - `refactor:` 리팩토링
   - `test:` 테스트 추가/수정
4. PR 제출 전 빌드 및 테스트 통과 확인

---

## 📜 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

---

## 📚 참고 문서

- [React Native 공식 문서](https://reactnative.dev/)
- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [Oracle Database 문서](https://docs.oracle.com/en/database/)
