import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList,
    Image, KeyboardAvoidingView, Platform, Linking, Keyboard
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SockJS from 'sockjs-client';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/api';

const BASE_URL = 'http://192.168.0.2:8080';

const ChatRoomScreen = () => {
    const navigation = useNavigation();
    const { roomId } = useRoute().params;

    const [userId, setUserId] = useState(null);
    const [nickname, setNickname] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [roomInfo, setRoomInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentResultIndex, setCurrentResultIndex] = useState(0);

    const socketRef = useRef(null);
    const flatListRef = useRef(null);

    const scrollToBottom = () => {
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 50);
    };

    useEffect(() => {
        const init = async () => {
            const token = await EncryptedStorage.getItem('accessToken');
            if (!token) return;

            const decoded = jwtDecode(token);
            const id = Number(decoded.sub);
            setUserId(id);

            const res = await api.get(`/users/${id}`);
            setNickname(res.data.nickname);
            setProfileUrl(res.data.profileImageUrl);

            const roomRes = await api.get(`/chat/rooms/${roomId}`);
            setRoomInfo(roomRes.data);

            const messageRes = await api.get(`/chat/rooms/${roomId}/messages?page=0&size=100`);
            setMessages(messageRes.data);
        };

        init();
    }, [roomId]);

    useEffect(() => {
        const connectWebSocket = async () => {
            const token = await EncryptedStorage.getItem('accessToken');
            if (!token || !userId || !roomId) return;

            const socket = new SockJS(`${BASE_URL}/ws/chat?token=${token}`);
            socketRef.current = socket;

            socket.onopen = () => {
                const enterMessage = {
                    roomId,
                    type: 'ENTER',
                    content: `${nickname}님이 입장하셨습니다.`,
                    time: new Date().toISOString(),
                };
                socket.send(JSON.stringify(enterMessage));
            };

            socket.onmessage = (e) => {
                try {
                    const msg = JSON.parse(e.data);
                    setMessages(prev => [...prev, msg].sort((a, b) => new Date(a.time) - new Date(b.time)));
                    scrollToBottom();
                } catch {
                    console.warn('❌ 메시지 파싱 실패');
                }
            };

            socket.onerror = (e) => {
                console.error('소켓 에러:', e);
            };

            socket.onclose = () => {
                console.log('🛑 소켓 연결 종료');
            };
        };

        connectWebSocket();
        return () => socketRef.current?.close();
    }, [userId, roomId]);

    useEffect(() => {
        scrollToBottom();
    }, [messageInput]);

    const sendMessage = () => {
        if (!messageInput.trim() || !socketRef.current || socketRef.current.readyState !== 1) return;

        const message = {
            roomId,
            senderId: userId,
            nickname,
            profileUrl,
            content: messageInput,
            type: 'TEXT',
            time: new Date().toISOString(),
        };

        socketRef.current.send(JSON.stringify(message));
        setMessageInput('');
    };

    const handleFileUpload = async () => {
        try {
            const file = await DocumentPicker.pickSingle();
            const formData = new FormData();
            formData.append('file', {
                uri: file.uri,
                type: file.type,
                name: file.name,
            });

            const res = await axios.post(`${BASE_URL}/chat/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const message = {
                roomId,
                senderId: userId,
                nickname,
                profileUrl,
                content: res.data.fileUrl,
                type: 'FILE',
                time: new Date().toISOString(),
            };

            socketRef.current.send(JSON.stringify(message));
            await api.post(`/chat/messages`, {
                roomId: message.roomId,
                content: message.content,
                type: message.type,
            });
        } catch (e) {
            console.warn('파일 업로드 실패:', e);
        }
    };

    const filteredIndices = messages
        .map((msg, i) => (typeof msg.content === 'string' && msg.content.includes(searchKeyword)) ? i : null)
        .filter(i => i !== null);

    const goToResult = (direction) => {
        if (filteredIndices.length === 0) return;
        let newIndex = currentResultIndex + direction;
        newIndex = Math.max(0, Math.min(filteredIndices.length - 1, newIndex));
        setCurrentResultIndex(newIndex);
        flatListRef.current?.scrollToIndex({ index: filteredIndices[newIndex], animated: true });
    };

    const renderMessage = ({ item }) => {
        // [1] 입장 메시지 예외 처리
        if (!item.senderId || item.type === 'ENTER') return null;

        const isMine = item.senderId === userId;
        const isFile = item.type === 'FILE';
        const contentText = item.content || '';

        const content = isFile ? (
            <TouchableOpacity onPress={() => Linking.openURL(BASE_URL + contentText)}>
                <Text style={styles.fileLink}>[첨부파일 다운로드]</Text>
            </TouchableOpacity>
        ) : (
            <Text style={styles.messageText}>{contentText}</Text>
        );

        const profileImageSource = item.profileUrl
            ? { uri: BASE_URL + item.profileUrl }
            : require('../../assets/profile.png');

        if (isMine) {
            return (
                <View style={[styles.messageRow, { justifyContent: 'flex-end' }]}>
                    <View style={styles.row}>
                        <Text style={styles.timeOutsideMine}>{moment(item.time).format('A hh:mm')}</Text>
                        <View style={[styles.messageBubble, styles.myBubble]}>
                            {content}
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={[styles.messageRow, { alignItems: 'flex-start' }]}>
                    <FastImage source={profileImageSource} style={styles.profileImage} />
                    <View style={{ flexShrink: 1 }}>
                        <Text style={styles.nickname}>{item.nickname ?? ''}</Text>
                        <View style={styles.row}>
                            <View style={styles.messageBubble}>{content}</View>
                            <Text style={styles.timeOutsideOther}>{moment(item.time).format('A hh:mm')}</Text>
                        </View>
                    </View>
                </View>
            );
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // ✅ 하단 탭 높이 포함한 적절한 여백
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('ChatRoomList')} style={styles.headerSide}>
                    <Image source={require('../../assets/back.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.title}>
                        {roomInfo ? `${roomInfo.roomName} (${roomInfo.participants?.length ?? 0})` : '채팅방'}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => setSearchVisible(prev => !prev)} style={styles.headerSide}>
                    <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
                </TouchableOpacity>
            </View>

            {searchVisible && (
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="메시지 검색"
                        value={searchKeyword}
                        onChangeText={(text) => {
                            setSearchKeyword(text);
                            setCurrentResultIndex(0);
                        }}
                        style={styles.searchInput}
                    />
                </View>
            )}

            <View style={styles.bodyContainer}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.messageList}
                    onContentSizeChange={scrollToBottom}
                    onLayout={scrollToBottom}
                    keyboardShouldPersistTaps="handled"
                />

                {searchVisible && filteredIndices.length > 0 && (
                    <View style={styles.arrowContainer}>
                        <TouchableOpacity onPress={() => goToResult(-1)}><Text style={styles.arrow}>↑</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => goToResult(1)}><Text style={styles.arrow}>↓</Text></TouchableOpacity>
                    </View>
                )}

                <View style={styles.inputBar}>
                    <TouchableOpacity style={styles.plusButton} onPress={handleFileUpload}>
                        <Text style={styles.plusText}>＋</Text>
                    </TouchableOpacity>
                    <TextInput
                        value={messageInput}
                        onChangeText={setMessageInput}
                        placeholder="메시지를 입력하세요"
                        style={styles.input}
                        onSubmitEditing={sendMessage}
                        blurOnSubmit={false}
                    />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        <Text style={styles.sendText}>➤</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatRoomScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF8F3',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: '#E0D6CC',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3B2F2F',
    },
    searchIcon: {
        width: 22,
        height: 22,
    },
    searchBar: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#E0D6CC',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#D0C0B0',
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: '#FAF7F5',
        color: '#333',
    },
    arrowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 20,
        marginBottom: 4,
    },
    arrow: {
        fontSize: 22,
        color: '#8C5C43',
        marginLeft: 16,
    },
    messageList: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 14,
        paddingHorizontal: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexWrap: 'nowrap',
    },
    profileImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#D7CCC8',
    },
    nickname: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#6D4C41',
        marginBottom: 4,
        marginLeft: 8,
    },
    messageBubble: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#DDD0C0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        maxWidth: 260,
    },
    messageText: {
        fontSize: 15,
        color: '#3C3C3C',
    },
    // 👥 다른 사용자 (말풍선 오른쪽 바깥)
    timeOutsideOther: {
        fontSize: 11,
        color: '#999',
        marginLeft: 8,
        alignSelf: 'flex-end',
    },
// 🙋‍♂️ 로그인한 사용자 (말풍선 왼쪽 바깥)
    timeOutsideMine: {
        fontSize: 11,
        color: '#999',
        marginRight: 8,
        alignSelf: 'flex-end',
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#E0D6CC',
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    },
    plusButton: {
        padding: 6,
        marginRight: 6,
    },
    plusText: {
        fontSize: 24,
        color: '#8C5C43',
    },
    input: {
        flex: 1,
        height: 42,
        borderWidth: 1,
        borderColor: '#D0C0B0',
        borderRadius: 20,
        paddingHorizontal: 14,
        backgroundColor: '#FFFFFF',
        fontSize: 15,
        color: '#3C3C3C',
    },
    sendButton: {
        paddingLeft: 10,
    },
    sendText: {
        fontSize: 22,
        color: '#8C5C43',
        fontWeight: 'bold',
    },
    fileLink: {
        color: '#3366BB',
        textDecorationLine: 'underline',
        fontSize: 14,
    },
    headerSide: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    myBubble: {
        backgroundColor: '#E7DCD3',
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
        maxWidth: 260,
    },
    timeMine: {
        fontSize: 11,
        color: '#999',
        marginTop: 4,        // ✅ 말풍선과 시각 사이 간격 확보
        marginRight: 6,
        alignSelf: 'flex-end',
    }
});
