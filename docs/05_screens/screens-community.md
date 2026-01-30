# 커뮤니티 화면

**관련 문서**: [화면 개요](./screens-overview.md) | [커뮤니티 API](../04_api/api-community.md) | [채팅 API](../04_api/api-chat.md)

---

## 1. PostListScreen (게시글 목록)

- **파일**: `src/screens/community/PostListScreen.js`
- **기능**:
  - 게시글 목록 조회 (무한 스크롤)
  - 검색 (키워드 기반)
  - 게시글 상세로 이동
  - 햄버거 메뉴: 게시판/채팅/친구 전환
  - 게시글 팝업 메뉴 (수정/삭제/신고)
- **사용 API**:
  - `GET /api/community/posts?page=0&size=20` - 목록 조회
  - `GET /api/community/posts/search?keyword=` - 검색
- **라이브러리**:
  - `moment`: 날짜 포맷팅
  - `jwt-decode`: 작성자 ID 비교

---

## 2. CreatePostScreen (게시글 작성)

- **파일**: `src/screens/community/CreatePostScreen.js`
- **기능**:
  - 제목, 내용 입력
  - 파일/이미지 첨부 (다중 파일)
  - 작성 완료 시 목록으로 이동
- **사용 API**:
  - `POST /api/community/posts` (multipart/form-data)
- **라이브러리**:
  - `react-native-image-picker`: 이미지 선택
  - `react-native-document-picker`: 파일 선택

---

## 3. PostDetailScreen (게시글 상세)

- **파일**: `src/screens/community/PostDetailScreen.js`
- **기능**:
  - 게시글 상세 내용 표시
  - 첨부파일 목록 및 다운로드
  - 좋아요 토글
  - 즐겨찾기 토글
  - 댓글/대댓글 목록 (계층 구조)
  - 댓글 작성/수정/삭제
  - 신고/차단 기능
- **사용 API**:
  - `GET /api/community/posts/{postId}` - 상세 조회
  - `POST /api/community/posts/{postId}/view` - 조회수 증가
  - `GET /api/community/posts/{postId}/comments` - 댓글 조회
  - `POST /api/community/likes/posts/{postId}/toggle` - 좋아요
  - `POST /api/community/posts/{postId}/favorite` - 즐겨찾기
- **라이브러리**:
  - `react-native-image-viewing`: 이미지 확대 보기

---

## 4. PostEditScreen (게시글 수정)

- **파일**: `src/screens/community/PostEditScreen.js`
- **기능**:
  - 기존 게시글 데이터 로드
  - 제목, 내용 수정
  - 첨부파일 추가/삭제
- **사용 API**:
  - `PUT /api/community/posts/{postId}` (multipart/form-data)

---

## 5. ChatRoomListScreen (채팅방 목록)

- **파일**: `src/screens/community/ChatRoomListScreen.js`
- **기능**:
  - 참여 중인 채팅방 목록
  - 최근 메시지, 읽지 않은 메시지 수 표시
  - 채팅방 입장
  - 새 채팅방 생성으로 이동
- **사용 API**:
  - `GET /api/chat/rooms?userId={userId}` - 채팅방 목록

---

## 6. ChatRoomScreen (채팅방)

- **파일**: `src/screens/community/ChatRoomScreen.js`
- **기능**:
  - 실시간 메시지 송수신 (WebSocket)
  - 메시지 검색
  - 파일/이미지 전송
  - 읽음 처리 (READ/READ_ACK)
  - 입장/퇴장 알림
- **사용 API**:
  - `GET /api/chat/rooms/{roomId}` - 채팅방 정보
  - `GET /api/chat/rooms/{roomId}/messages` - 메시지 목록
  - `POST /api/chat/upload` - 파일 업로드
- **WebSocket**:
  - 연결: `ws://{server}:8080/ws/chat?token={accessToken}`
  - 라이브러리: `sockjs-client`
  - 메시지 타입: TEXT, IMAGE, FILE, ENTER, LEAVE, READ, READ_ACK
- **라이브러리**:
  - `react-native-document-picker`: 파일 선택
  - `react-native-fast-image`: 이미지 최적화 로딩

---

## 7. CreateChatRoomScreen (채팅방 생성)

- **파일**: `src/screens/community/CreateChatRoomScreen.js`
- **기능**:
  - 채팅방 이름 입력
  - 초대할 친구 선택
  - 대표 이미지 설정 (선택)
- **사용 API**:
  - `GET /api/friends` - 친구 목록
  - `POST /api/chat/rooms` - 채팅방 생성

---

## 8. FriendScreen (친구)

- **파일**: `src/screens/community/FriendScreen.js`
- **기능**:
  - 탭 전환: 친구 목록 / 받은 요청 / 차단 목록
  - 닉네임으로 사용자 검색
  - 친구 요청 전송
  - 친구 요청 수락/거절
  - 친구와 1:1 채팅 시작
  - 친구 삭제
  - 사용자 차단/차단 해제
  - 사용자 신고
- **사용 API**:
  - `GET /api/friends` - 친구 목록
  - `GET /api/friends/requests` - 받은 요청 목록
  - `GET /api/friends/blocked` - 차단 목록
  - `GET /api/friends/search?nickname=` - 사용자 검색
  - `POST /api/friends/request` - 친구 요청
  - `POST /api/friends/request/{id}/accept` - 수락
  - `POST /api/friends/request/{id}/reject` - 거절
  - `DELETE /api/friends/{friendId}` - 친구 삭제
  - `POST /api/friends/block/{userId}` - 차단
  - `DELETE /api/friends/block/{userId}` - 차단 해제
  - `POST /api/friends/report/{userId}` - 신고
  - `POST /api/chat/direct/start` - 1:1 채팅 시작 (Direct Chat)

---

**최종 업데이트**: 2026년 1월 30일
