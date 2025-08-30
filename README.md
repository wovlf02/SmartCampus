# IoT 스마트캠퍼스 프로젝트

이 프로젝트는 IoT 기반 스마트캠퍼스 서비스를 위한 모바일 앱(React Native)과 백엔드(Spring Boot)로 구성되어 있습니다. 학생 및 캠퍼스 구성원들이 커뮤니티, 지도, 마이페이지, 검색 등 다양한 기능을 모바일 환경에서 편리하게 사용할 수 있도록 설계되었습니다.

## 폴더 구조

- `front/` : React Native 기반 모바일 앱 소스
- `back/` : Spring Boot 기반 REST API 서버 소스
- `lib/` : 외부 라이브러리 및 의존성 파일

---

## 주요 기능

### 1. 모바일 앱 (front)
- 회원 인증 및 소셜 로그인 (카카오, 네이버, 구글)
- 커뮤니티(게시판) 및 댓글/답글/좋아요/신고/알림
- 지도 기반 서비스
- 마이페이지 및 개인정보 관리
- 검색 기능
- 직관적인 UI/UX와 다양한 아이콘/이미지 리소스

### 2. 백엔드 서버 (back)
- 게시글 CRUD 및 댓글/답글/좋아요/신고/알림 관리
- 첨부파일 관리
- 커뮤니티 내 다양한 상호작용 기능
- RESTful API 제공

---

## 개발 환경

- **프론트엔드**: React Native, JavaScript/TypeScript
- **백엔드**: Spring Boot, Java
- **모바일 지원**: Android, iOS

---

## 실행 방법

### 1. 백엔드 서버 실행
```bash
cd back
./gradlew bootRun
```

### 2. 모바일 앱 실행
```bash
cd front
npm install
npm start
```

---

## 문의 및 기여

- 이 저장소에 대한 문의 및 기여는 이슈 또는 Pull Request로 남겨주세요.

