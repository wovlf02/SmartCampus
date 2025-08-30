# 🌟 Smart Campus

## 🛠️ 프레임워크 및 라이브러리

| 기술              | 버전       |
|------------------|-----------|
| 🌱 Spring Boot      | 3.4.2     |
| ☕ Java             | 21        |
| 📱 React Native     | 0.76.6    |
| 🖥️ Node.js          | >= 18     |
| ⚙️ Gradle           | Wrapper   |

---

## 📖 프로젝트 개요

**Smart Campus** 프로젝트는 IoT 기술을 활용하여 캠퍼스 내 사용자 경험을 혁신하는 것을 목표로 합니다. 이 프로젝트는 다음과 같은 주요 기능을 제공합니다:

- 🚶 **실시간 경로 안내**: T-map API를 활용하여 캠퍼스 내 효율적인 이동을 지원합니다.
- 🤖 **AI 챗봇 기반 정보 검색**: Dialogflow를 활용하여 건물 및 관련 정보를 쉽게 검색할 수 있습니다.
- 💬 **커뮤니티 및 소통**: 사용자 간 실시간 채팅 및 커뮤니티 게시판을 통해 정보 공유를 촉진합니다.
- 🎯 **개인화된 사용자 경험**: 시간표 기반 알림 및 맞춤형 이동 경로를 제공합니다.
- 🌍 **다국어 지원**: 다양한 언어를 지원하여 외국인 유학생의 접근성을 향상시킵니다.

이 프로젝트는 모바일 클라이언트(React Native)와 Java Spring Boot 백엔드로 구성되어 있으며, 사용자 중심의 스마트 캠퍼스 환경을 구현합니다.

---

## 🗂️ 프로젝트 구조

```
Smart Campus/
├── back/                  # Spring Boot 애플리케이션
│   ├── build.gradle       # Java 21, Spring Boot 3.4.2 의존성
│   ├── gradlew            # Gradle Wrapper 실행 파일 (Linux/Mac)
│   ├── gradlew.bat        # Gradle Wrapper 실행 파일 (Windows)
│   ├── settings.gradle    # Gradle 설정 파일
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/smartcampus/back/
│   │   │   │   ├── BackApplication.java  # 애플리케이션 진입점
│   │   │   │   ├── config/               # 설정 파일
│   │   │   │   ├── service/              # 비즈니스 로직
│   │   │   │   ├── repository/           # 데이터베이스 리포지토리
│   │   │   │   ├── entity/               # 데이터베이스 엔티티
│   │   │   │   ├── handler/              # WebSocket 핸들러
│   │   │   │   └── dto/                  # 데이터 전송 객체
│   │   ├── resources/                    # 리소스 파일 (application.yml 등)
│   │   └── test/                         # 테스트 파일
│   └── gradle/                           # Gradle Wrapper 관련 파일
│       ├── wrapper/
│       │   ├── gradle-wrapper.jar        # Gradle Wrapper JAR 파일
│       │   └── gradle-wrapper.properties # Gradle Wrapper 설정 파일
├── front/                 # React Native 모바일 앱
│   ├── package.json       # 의존성 및 스크립트
│   ├── App.js             # 앱 네비게이션 및 화면 등록
│   ├── src/
│   │   ├── screens/       # 화면 구현
│   │   │   ├── auth/      # 인증 관련 화면
│   │   │   ├── community/ # 커뮤니티 관련 화면
│   │   │   ├── map/       # 지도 관련 화면
│   │   │   ├── mypage/    # 마이페이지 관련 화면
│   │   ├── api/           # 백엔드 API 호출
│   │   ├── assets/        # 정적 자산 (이미지, 아이콘 등)
│   ├── android/           # Android 네이티브 프로젝트 파일
│   │   ├── app/           # Android 앱 소스 코드
│   │   ├── gradle/        # Gradle 설정 파일
│   │   └── build.gradle   # Android 빌드 설정
│   ├── ios/               # iOS 네이티브 프로젝트 파일
│   │   ├── app/           # iOS 앱 소스 코드
│   │   ├── Podfile        # CocoaPods 의존성 파일
│   │   └── Info.plist     # iOS 설정 파일
└── README.md              # 프로젝트 문서
```

---

## 🔑 주요 기능

| 기능                     | 설명                                           |
|--------------------------|------------------------------------------------|
| 🚗 T-map 경로 안내          | T-map API를 활용한 실시간 경로 탐색 및 안내    |
| 🏢 건물 찾기 및 챗봇        | Dialogflow 기반 AI 챗봇으로 건물 검색 지원     |
| 💬 커뮤니티 및 채팅         | 사용자 간 실시간 채팅 및 커뮤니티 게시판       |
| 🛠️ 마이페이지 및 설정       | 프로필 수정, 시간표 등록 및 다국어 지원        |

---

## 🎯 기대효과 및 향후 계획

| 기대효과                 | 향후 계획                                      |
|--------------------------|------------------------------------------------|
| 🎯 사용자 편의성 향상       | 실내외 통합 길안내로 초행 방문자 문제 해결     |
| 🌍 외국인 접근성 강화       | 다국어 UI 지원 및 실시간 번역 기능 추가        |
| 🕒 개인화된 캠퍼스 생활 지원| 시간표 기반 도착 알림 및 맞춤형 이동 경로 제공|
| 🤖 AI 기반 정보 탐색 편의   | 자연어 대화형 챗봇으로 정보 접근 시간 단축     |
| 📊 데이터 기반 서비스 개선  | 사용자 행동 로그 기반 UI/UX 개선 및 공간 활용  |

---

## ⚙️ 환경 및 전제 조건

### 개발 머신
- ☕ Java 21 (Gradle Toolchain이 빌드에 사용됨)
- 🖥️ Node.js >= 18
- 📱 Android SDK (Android 빌드용)
- 🍎 Xcode (iOS 빌드용, macOS 필요)

### 백엔드 환경 변수
- 🔑 `SPRING_DATASOURCE_URL` — JDBC URL (MySQL/Oracle)
- 🔑 `SPRING_DATASOURCE_USERNAME`
- 🔑 `SPRING_DATASOURCE_PASSWORD`
- 🔒 `JWT_SECRET` — JWT 서명 비밀
- 🔗 `SPRING_REDIS_HOST` / `SPRING_REDIS_PORT`
- 📧 `MAIL_USERNAME` / `MAIL_PASSWORD` / `MAIL_HOST` / `MAIL_PORT`

---

## 🚀 빠른 시작

### 백엔드 (Windows PowerShell 예)

```powershell
cd back; .\gradlew.bat clean build; .\gradlew.bat bootRun
```

### 프론트엔드 (Android 에뮬레이터 예)

```powershell
cd front
npm install
npx react-native start ; # Metro 번들러 시작
npx react-native run-android
```

또는 `package.json`에 등록된 스크립트를 사용:

```powershell
cd front
npm run android
```

---

## 🧪 테스트

- **백엔드**: Gradle 테스트 실행 `./gradlew.bat test`
- **프론트엔드**: Jest 테스트 실행 `npm test`

---

## 🤝 기여 가이드

1. 📝 이슈 생성 및 설명 작성
2. 🌿 브랜치: `feature/` 또는 `fix/` 접두사 사용
3. ✅ PR 제출 전 빌드 및 테스트 통과 확인

---

## 📜 라이센스

이 프로젝트는 `LICENSE` 파일을 포함하지 않습니다. MIT 라이센스를 추가하거나 조직 정책에 따라 설정하세요.

---

## 📚 참고 문서

- [📱 React Native README](https://github.com/facebook/react-native)
- [🚀 Expo README](https://github.com/expo/expo)
