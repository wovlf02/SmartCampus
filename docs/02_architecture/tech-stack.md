# 기술 스택

**관련 문서**: [시스템 설계](./system-design.md) | [파일 구조](./file-structure.md)

---

## 1. Frontend (React Native)

### 1.1 프레임워크

| 기술 | 버전 | 용도 |
|------|------|------|
| **React Native** | 0.76.6 | 크로스 플랫폼 모바일 앱 |
| **JavaScript** | ES6+ | 프로그래밍 언어 |
| **React** | 18.3.1 | UI 라이브러리 |

### 1.2 네비게이션

| 기술 | 버전 | 용도 |
|------|------|------|
| **@react-navigation/native** | 7.x | 기본 네비게이션 |
| **@react-navigation/stack** | 7.1.1 | 스택 네비게이션 |
| **@react-navigation/bottom-tabs** | 7.2.0 | 하단 탭 네비게이션 |
| **@react-navigation/drawer** | 7.1.1 | 드로어 네비게이션 |

### 1.3 HTTP 클라이언트

| 기술 | 버전 | 용도 |
|------|------|------|
| **axios** | 1.7.9 | REST API 통신 |

### 1.4 실시간 통신

| 기술 | 버전 | 용도 |
|------|------|------|
| **@stomp/stompjs** | 7.1.1 | STOMP 프로토콜 클라이언트 |
| **sockjs-client** | 1.6.1 | WebSocket 폴백 |

### 1.5 다국어 지원

| 기술 | 버전 | 용도 |
|------|------|------|
| **i18next** | 25.2.1 | 다국어 프레임워크 |
| **react-i18next** | 15.5.2 | React i18n 바인딩 |
| **i18next-browser-languagedetector** | 8.1.0 | 언어 자동 감지 |

### 1.6 저장소

| 기술 | 버전 | 용도 |
|------|------|------|
| **@react-native-async-storage/async-storage** | 2.1.1 | 일반 데이터 저장 |
| **react-native-encrypted-storage** | 4.0.3 | 민감 데이터 암호화 저장 (토큰 등) |

### 1.7 UI 컴포넌트

| 기술 | 버전 | 용도 |
|------|------|------|
| **react-native-gesture-handler** | 2.22.0 | 제스처 처리 |
| **react-native-reanimated** | 3.17.0 | 애니메이션 |
| **react-native-safe-area-context** | 5.1.0 | Safe Area 처리 |
| **react-native-screens** | 4.5.0 | 네이티브 화면 최적화 |
| **react-native-webview** | 13.13.2 | WebView (지도 표시) |
| **react-native-fast-image** | 8.6.3 | 고성능 이미지 로딩 |
| **react-native-image-picker** | 8.2.1 | 이미지 선택 |
| **react-native-image-viewing** | 0.2.2 | 이미지 뷰어 |

### 1.8 유틸리티

| 기술 | 버전 | 용도 |
|------|------|------|
| **moment** | 2.30.1 | 날짜/시간 처리 |
| **jwt-decode** | 4.0.0 | JWT 토큰 디코딩 |
| **react-native-geolocation-service** | 5.3.1 | GPS 위치 서비스 |
| **react-native-permissions** | 5.4.0 | 권한 관리 |
| **react-native-document-picker** | 9.3.1 | 파일 선택 |
| **react-native-fs** | 2.20.0 | 파일 시스템 접근 |

### 1.9 소셜 로그인

| 기술 | 버전 | 용도 |
|------|------|------|
| **@react-native-seoul/kakao-login** | 5.4.1 | 카카오 로그인 |

---

## 2. Backend (Spring Boot)

### 2.1 프레임워크

| 기술 | 버전 | 용도 |
|------|------|------|
| **Spring Boot** | 3.4.2 | 백엔드 프레임워크 |
| **Java (JDK)** | 21 (LTS) | 프로그래밍 언어 |
| **Gradle** | Wrapper (Groovy DSL) | 빌드 도구 |

### 2.2 Spring 모듈

| 기술 | 용도 |
|------|------|
| **Spring Web** | REST API |
| **Spring Data JPA** | ORM, 데이터 액세스 |
| **Spring Data JDBC** | JDBC 직접 접근 |
| **Spring Data Redis** | Redis 연동 |
| **Spring Data REST** | REST 리소스 자동 생성 |
| **Spring Security** | 인증/인가 |
| **Spring Validation** | 입력 검증 |
| **Spring WebSocket** | 실시간 통신 |
| **Spring Mail** | 이메일 발송 |
| **Spring Actuator** | 헬스체크, 모니터링 |
| **Spring Batch** | 배치 처리 |
| **Spring Integration** | 엔터프라이즈 통합 |
| **Spring OAuth2** | OAuth2 인증 서버/클라이언트/리소스 서버 |

### 2.3 데이터베이스

| 기술 | 버전 | 용도 |
|------|------|------|
| **Oracle Database** | 23c | 메인 관계형 데이터베이스 |
| **ojdbc11** | 23.3.0.23.09 | Oracle JDBC 드라이버 |
| **MySQL Connector** | - | MySQL 연동 (옵션) |
| **Redis** | - | 세션/토큰 캐싱 |

### 2.4 보안

| 기술 | 버전 | 용도 |
|------|------|------|
| **jjwt-api** | 0.11.5 | JWT 토큰 생성/검증 |
| **jjwt-impl** | 0.11.5 | JWT 구현체 |
| **jjwt-jackson** | 0.11.5 | JWT JSON 처리 |
| **Spring Security Messaging** | - | WebSocket 보안 |
| **Thymeleaf Security** | - | Thymeleaf 보안 통합 |

### 2.5 기타

| 기술 | 버전 | 용도 |
|------|------|------|
| **Lombok** | - | 보일러플레이트 코드 감소 |
| **Jackson (jsr310)** | - | Java 8 날짜/시간 직렬화 |
| **Apache Commons Lang3** | 3.12.0 | 유틸리티 메서드 |
| **Thymeleaf** | - | 서버 사이드 템플릿 (이메일 등) |
| **Groovy Templates** | - | Groovy 템플릿 |

---

## 3. 외부 API

| 서비스 | 용도 |
|--------|------|
| **T Map SDK** | 지도 표시 및 경로 안내 |
| **Kakao Login API** | 카카오 소셜 로그인 |
| **Naver Login API** | 네이버 소셜 로그인 |
| **Google Login API** | 구글 소셜 로그인 |
| **GitHub Login API** | GitHub 소셜 로그인 |

---

## 4. 개발 도구

### 4.1 Frontend

| 도구 | 버전 | 용도 |
|------|------|------|
| **Node.js** | 22 (LTS) | JavaScript 런타임 |
| **Metro** | - | React Native 번들러 |
| **Babel** | 7.25.x | JavaScript 트랜스파일러 |
| **ESLint** | 8.19.0 | 코드 린팅 |
| **Jest** | 29.6.3 | 테스트 프레임워크 |
| **Prettier** | 2.8.8 | 코드 포맷터 |

### 4.2 Backend

| 도구 | 용도 |
|------|------|
| **Gradle Wrapper** | 빌드 자동화 |
| **JUnit 5** | 테스트 프레임워크 |
| **Spring Boot DevTools** | 개발 편의 (Hot Reload) |

---

## 5. 버전 관리

| 도구 | 용도 |
|------|------|
| **Git** | 소스 코드 버전 관리 |
| **GitHub** | 원격 저장소, 협업 |

---

**최종 업데이트**: 2026년 1월 30일
