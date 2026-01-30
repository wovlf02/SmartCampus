# 코딩 컨벤션

**관련 문서**: [백엔드 설정](./setup-backend.md) | [프론트엔드 설정](./setup-frontend.md)

---

## 1. 공통

### 1.1 Git 커밋 메시지
```
<type>: <subject>

feat: 새로운 기능
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 (포맷팅)
refactor: 리팩토링
test: 테스트 추가/수정
chore: 빌드/설정 변경
```

### 1.2 브랜치 전략
- `main`: 프로덕션
- `develop`: 개발 통합
- `feature/*`: 기능 개발
- `fix/*`: 버그 수정

---

## 2. Backend (Java)

### 2.1 네이밍
| 항목 | 규칙 | 예시 |
|------|------|------|
| 클래스 | PascalCase | `UserService` |
| 메서드 | camelCase | `findById` |
| 상수 | UPPER_SNAKE | `MAX_SIZE` |
| 패키지 | lowercase | `com.smartcampus` |

### 2.2 구조
```
controller → service → repository → entity
```

### 2.3 어노테이션 순서
```java
@Slf4j
@RestController
@RequestMapping("/api/...")
@RequiredArgsConstructor
public class XxxController { }
```

---

## 3. Frontend (JavaScript)

### 3.1 네이밍
| 항목 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `LoginScreen` |
| 함수 | camelCase | `handleLogin` |
| 상수 | UPPER_SNAKE | `BASE_URL` |
| 파일 | PascalCase | `LoginScreen.js` |

### 3.2 컴포넌트 구조
```javascript
import React from 'react';
// 외부 라이브러리
// 내부 모듈

const Component = () => {
  // state
  // effect
  // handler
  // render
};

const styles = StyleSheet.create({});

export default Component;
```

---

**최종 업데이트**: 2026년 1월 30일
