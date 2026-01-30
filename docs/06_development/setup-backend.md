# 백엔드 환경 설정

**관련 문서**: [프론트엔드 설정](./setup-frontend.md)

---

## 1. 요구사항

| 항목 | 버전 |
|------|------|
| JDK | 21 LTS |
| Gradle | Wrapper 포함 |
| Oracle | 23c |
| Redis | 선택사항 |

---

## 2. 프로젝트 클론

```bash
git clone <repository-url>
cd SmartCampus/back
```

---

## 3. 환경 변수 설정

`src/main/resources/application.yml` 생성:

```yaml
spring:
  datasource:
    url: jdbc:oracle:thin:@localhost:1521:xe
    username: your_username
    password: your_password
    driver-class-name: oracle.jdbc.OracleDriver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
  redis:
    host: localhost
    port: 6379

jwt:
  secret: your-256-bit-secret-key
  access-token-validity: 3600000
  refresh-token-validity: 604800000

mail:
  host: smtp.gmail.com
  port: 587
  username: your-email
  password: your-app-password
```

---

## 4. 빌드 및 실행

```bash
# 빌드
./gradlew clean build

# 실행
./gradlew bootRun

# 또는 JAR 실행
java -jar build/libs/back-0.0.1-SNAPSHOT.jar
```

---

## 5. 테스트

```bash
./gradlew test
```

---

**최종 업데이트**: 2026년 1월 30일
