# 지도 화면

**관련 문서**: [화면 개요](./screens-overview.md)

---

## 1. MapMainScreen
- **파일**: `src/screens/map/MapMainScreen.js`
- **기능**:
  - Kakao Map API 기반 지도 표시
  - GPS 현재 위치 마커
  - WebView로 지도 렌더링

### 주요 로직
```javascript
// 위치 권한 요청
Geolocation.getCurrentPosition(...)

// WebView에 Kakao Map 렌더링
<WebView source={{ html: htmlContent }} />
```

---

## 2. KakaoNavigationScreen
- **파일**: `src/screens/map/KakaoNavigationScreen.js`
- **기능**: T Map 네비게이션 연동

---

**최종 업데이트**: 2026년 1월 30일
