# 화면 구조 개요

**관련 문서**: [인증 화면](./screens-auth.md) | [커뮤니티 화면](./screens-community.md)

---

## 1. 네비게이션 구조

```
App
├── Intro Screen
├── Auth Stack (비로그인)
│   ├── Login
│   ├── Register
│   ├── FindAccount
│   ├── ResetPassword
│   └── UniversitySearch
└── Main Tab Navigator (로그인)
    ├── 지도 탭
    ├── 검색 탭
    ├── 커뮤니티 탭 (Drawer)
    └── 마이페이지 탭 (Stack)
```

---

## 2. 탭 구성

| 탭 | 아이콘 | 화면 | 설명 |
|----|--------|------|------|
| 지도 | map.png | MapMainScreen | 캠퍼스 지도 |
| 검색 | search.png | SearchMainScreen | 건물 검색 |
| 커뮤니티 | community.png | PostListScreen 등 | 게시판/채팅 |
| 마이페이지 | mypage.png | MyPageScreen 등 | 프로필/설정 |

---

## 3. 화면 수 요약

| 카테고리 | 화면 수 |
|----------|---------|
| 인증 | 5개 |
| 지도 | 2개 |
| 검색 | 1개 |
| 커뮤니티 | 8개 |
| 마이페이지 | 14개 |
| **합계** | **30개** |

---

**최종 업데이트**: 2026년 1월 30일
