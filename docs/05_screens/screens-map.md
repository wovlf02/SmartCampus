# 지도 화면

**관련 문서**: [화면 개요](./screens-overview.md)

---

## 1. MapMainScreen (캠퍼스 지도)

- **파일**: `src/screens/map/MapMainScreen.js`
- **기능**:
  - Kakao Map API 기반 지도 표시
  - GPS 현재 위치 마커 표시
  - WebView로 HTML 지도 렌더링
  - 위치 권한 요청 (Android/iOS)
- **사용 API**:
  - `POST /api/location/current` - 현재 위치 정보 전송
- **라이브러리**:
  - `react-native-webview`: 카카오맵 HTML 렌더링
  - `react-native-geolocation-service`: GPS 위치 조회
  - `react-native-permissions`: 위치 권한 관리

### 주요 구현

```javascript
// 위치 권한 요청 (Android)
const hasPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
);

// GPS 현재 위치 가져오기
Geolocation.getCurrentPosition(
    (position) => {
        const { latitude, longitude } = position.coords;
        // 백엔드에 위치 정보 전송
    },
    (error) => console.error(error),
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
);

// WebView에 Kakao Map 렌더링
const htmlContent = `
    <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}"></script>
    <script>
        var map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3
        });
        var marker = new kakao.maps.Marker({ position: map.getCenter() });
        marker.setMap(map);
    </script>
`;
```

### 환경 설정
- Kakao Map API Key 필요: `KAKAO_MAP_KEY`
- Android: `AndroidManifest.xml`에 위치 권한 추가
- iOS: `Info.plist`에 위치 권한 설명 추가

---

## 2. KakaoNavigationScreen (카카오 네비게이션)

- **파일**: `src/screens/map/KakaoNavigationScreen.js`
- **기능**:
  - 카카오맵 네비게이션 연동
  - 목적지까지 경로 안내
  - 외부 앱(카카오맵) 실행
- **라이브러리**:
  - `react-native-linking`: 외부 앱 실행

### 사용 예시
```javascript
import { Linking } from 'react-native';

// 카카오맵 네비게이션 실행
const openKakaoNavigation = (destLat, destLng, destName) => {
    const url = `kakaomap://route?ep=${destLat},${destLng}&by=FOOT`;
    Linking.openURL(url).catch(() => {
        // 카카오맵 미설치 시 스토어로 이동
        Linking.openURL('market://details?id=net.daum.android.map');
    });
};
```

---

## 3. 향후 확장 계획

| 기능 | 설명 | 상태 |
|------|------|------|
| 건물 검색 | 캠퍼스 내 건물 검색 | 계획 |
| 건물 마커 표시 | 지도에 건물 위치 마커 | 계획 |
| 경로 안내 | 현재 위치 → 목적지 경로 | 계획 |
| 즐겨찾기 장소 | 자주 가는 장소 저장 | 계획 |

---

**최종 업데이트**: 2026년 1월 30일
