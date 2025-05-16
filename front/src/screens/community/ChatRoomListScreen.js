import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, Image
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import api from '../../api/api';

const BASE_URL = 'http://192.168.0.2:8080';

const ChatRoomListScreen = () => {
    const navigation = useNavigation();
    const [chatRooms, setChatRooms] = useState([]);
    const [userId, setUserId] = useState(null);
    const [filter, setFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const stompClient = useRef(null);

    useEffect(() => {
        const init = async () => {
            const token = await EncryptedStorage.getItem('accessToken');
            if (token) {
                const decoded = jwtDecode(token);
                const id = Number(decoded.sub);
                setUserId(id);
                fetchChatRooms(id);
                connectWebSocket(id);
            }
        };
        init();

        return () => {
            if (stompClient.current?.connected) {
                stompClient.current.disconnect(() => console.log('Disconnected'));
            }
        };
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (userId) {
                fetchChatRooms(userId);
            }
        }, [userId])
    );

    const fetchChatRooms = async (uid) => {
        try {
            const res = await api.get(`/chat/rooms`, { params: { userId: uid } });
            setChatRooms(res.data);
        } catch (err) {
            console.error('채팅방 목록 오류:', err);
        }
    };

    const connectWebSocket = (uid) => {
        const socket = new SockJS(`${BASE_URL}/ws`);
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/chat/user/${uid}`, () => {
                fetchChatRooms(uid);
            });
        });
    };

    const handleLongPress = (roomId) => {
        Alert.alert('채팅방 옵션', '원하는 작업을 선택하세요.', [
            { text: '상단 고정', onPress: () => pinRoom(roomId) },
            { text: '채팅방 나가기', onPress: () => exitRoom(roomId), style: 'destructive' },
            { text: '취소', style: 'cancel' },
        ]);
    };

    const pinRoom = (roomId) => {
        setChatRooms(prev =>
            prev.map(room => room.roomId === roomId ? { ...room, pinned: !room.pinned } : room)
        );
    };

    const exitRoom = async (roomId) => {
        try {
            await api.delete(`/chat/rooms/${roomId}/exit`, { data: { userId } });
            fetchChatRooms(userId);
        } catch {
            Alert.alert('오류', '채팅방 나가기 실패');
        }
    };

    const filteredRooms = chatRooms
        .filter(room => {
            if (filter === 'GROUP') return room.roomType === 'GROUP';
            if (filter === 'DIRECT') return room.roomType === 'DIRECT';
            return true;
        })
        .filter(room => room.roomName.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? -1 : 1));

    const renderItem = ({ item }) => {
        const imageFileName = item.profileImageUrl;
        const hasProfileImage = !!imageFileName && imageFileName.trim() !== '';

        const imageSource = hasProfileImage
            ? {
                uri: `${BASE_URL}/uploads/chatroom/${imageFileName}`,
                priority: FastImage.priority.normal,
            }
            : require('../../assets/profile.png');

        return (
            <TouchableOpacity
                style={styles.chatRoomCard}
                onPress={() => navigation.navigate('ChatRoom', { roomId: item.roomId })}
                onLongPress={() => handleLongPress(item.roomId)}
            >
                <FastImage
                    source={imageSource}
                    style={styles.profileImage}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <View style={styles.chatInfo}>
                    <View style={styles.nameRow}>
                        <Text style={styles.chatRoomName}>{item.roomName}</Text>

                        <View style={styles.infoInlineRow}>
                            <Text style={styles.participantCount}>
                                👥 {item.participantCount ?? 0}
                            </Text>
                            {item.pinned && (
                                <Image source={require('../../assets/pin.png')} style={styles.smallIcon} />
                            )}
                            <Image source={require('../../assets/bell_off.png')} style={styles.smallIcon} />
                        </View>
                    </View>

                    <Text style={styles.latestMessage} numberOfLines={1}>
                        {item.lastMessage || '(아직 메시지 없음)'}
                    </Text>
                </View>

                <View style={styles.rightInfo}>
                    <Text style={styles.metaText}>
                        {item.lastMessageAt && moment(item.lastMessageAt).format('HH:mm')}
                    </Text>
                    {(item.unreadCount ?? 0) > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{item.unreadCount}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>채팅</Text>
                <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(!menuVisible)}>
                    <Image source={require('../../assets/menu.png')} style={styles.menuIcon} />
                </TouchableOpacity>
                {menuVisible && (
                    <View style={styles.menuDropdown}>
                        <TouchableOpacity onPress={() => navigation.navigate('PostList')}>
                            <Text style={styles.menuItem}>게시판</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ChatRoomList')}>
                            <Text style={styles.menuItem}>채팅</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Friend')}>
                            <Text style={styles.menuItem}>친구</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <TextInput
                placeholder="채팅방 검색"
                placeholderTextColor="#A08C7B"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
            />

            <View style={styles.filterRow}>
                {['ALL', 'DIRECT', 'GROUP'].map(type => (
                    <TouchableOpacity key={type} onPress={() => setFilter(type)}>
                        <Text style={[styles.filterTab, filter === type && styles.activeTab]}>
                            {type === 'ALL' ? '전체' : type === 'GROUP' ? '그룹' : '1:1'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredRooms}
                keyExtractor={item => item.roomId.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>채팅방 목록이 비었습니다.</Text>
                }
            />

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('CreateChatRoom')}
            >
                <Text style={styles.plusText}>＋</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChatRoomListScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F1EC' },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        backgroundColor: '#F4F1EC',
        borderBottomWidth: 1,
        borderColor: '#E5DCD7',
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#382F2D' },
    menuButton: { position: 'absolute', right: 20, top: 18 },
    menuIcon: { width: 24, height: 24 },
    menuDropdown: {
        position: 'absolute',
        top: 58,
        right: 20,
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        elevation: 5,
        zIndex: 1000,
    },
    menuItem: {
        fontSize: 15,
        paddingVertical: 6,
        color: '#333',
    },
    searchInput: {
        backgroundColor: '#FFFDF9',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 12,
        fontSize: 14,
        color: '#3C3C3C',
        borderWidth: 1,
        borderColor: '#E0D7D2',
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#FFFDF9',
        borderBottomWidth: 1,
        borderColor: '#E5DCD7',
    },
    filterTab: {
        fontSize: 14,
        color: '#A08C7B',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: '#E8D7C8',
        color: '#382F2D',
        fontWeight: 'bold',
    },
    chatRoomCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFDF9',
        padding: 14,
        marginHorizontal: 16,
        marginBottom: 14,
        borderRadius: 12,
        elevation: 2,
    },
    profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 14 },
    chatInfo: { flex: 1 },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    chatRoomName: { fontWeight: 'bold', fontSize: 16, color: '#382F2D' },
    participantCount: { fontSize: 13, color: '#7A6E66' },
    latestMessage: { fontSize: 14, color: '#7A6E66', marginTop: 4 },
    smallIcon: {
        width: 16,
        height: 16,
        marginLeft: 4,
    },
    rightInfo: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        height: '100%',
        gap: 6,
    },
    metaText: { fontSize: 12, color: '#A08C7B' },
    unreadBadge: {
        backgroundColor: '#FF3B30',
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    unreadText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
    infoInlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        gap: 8,
    },
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#A3775C',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    plusText: { fontSize: 30, color: '#FFF', marginBottom: 2 },
    emptyText: {
        textAlign: 'center',
        color: '#A08C7B',
        fontSize: 14,
        marginTop: 40,
    },
});
