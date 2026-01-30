# 프론트엔드 환경 설정

**관련 문서**: [백엔드 설정](./setup-backend.md)

---

## 1. 요구사항

| 항목 | 버전 |
|------|------|
| Node.js | 22 (LTS) |
| npm | >= 9 |
| React Native | 0.76.6 |
| Xcode | 15+ (iOS) |
| Android Studio | 최신 (Android) |

---

## 2. 프로젝트 설정

```bash
cd SmartCampus/front

# 의존성 설치
npm install

# iOS 추가 설정 (macOS)
cd ios && pod install && cd ..
```

---

## 3. 환경 설정

`src/api/api.js`에서 백엔드 주소 수정:

```javascript
const BASE_URL = 'http://192.168.0.2:8080/api';
```

---

## 4. 실행

```bash
# Metro 번들러 시작
npm start

# Android 실행
npm run android

# iOS 실행 (macOS)
npm run ios
```

---

## 5. 테스트

```bash
npm test
```

---

## 6. 문제 해결

### Metro 캐시 초기화
```bash
npm start -- --reset-cache
```

### iOS 빌드 오류
```bash
cd ios
pod deintegrate
pod install
```

### Android 빌드 오류
```bash
cd android
./gradlew clean
```

---

**최종 업데이트**: 2026년 1월 30일
