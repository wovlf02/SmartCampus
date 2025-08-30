import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity,
    Image, FlatList, Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import api from '../../api/api';
import { useNavigation } from '@react-navigation/native';

const BASE_PROFILE = require('../../assets/profile.png');
const BASE_URL = 'http://192.168.0.2:8080';

const CreateChatRoomScreen = () => {
    const navigation = useNavigation();
    const [roomName, setRoomName] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchMode, setSearchMode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        setLoading(true);
        try {
            const res = await api.get('/friends');
            const mapped = res.data?.friends.map(f => ({
                ...f,
                id: f.userId
            })) || [];
            setUsers(mapped);
        } catch (error) {
            console.error('친구 목록 불러오기 실패:', error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchText.trim()) return;
        setSearchMode(true);
        setLoading(true);
        try {
            const res = await api.get(`/friends/search?nickname=${searchText.trim()}`);
            const mapped = res.data?.results.map(f => ({
                ...f,
                id: f.userId
            })) || [];
            setUsers(mapped);
        } catch (err) {
            Alert.alert('검색 실패', '사용자 검색 중 오류 발생');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const toggleFriend = (id) => {
        setSelectedFriends(prev =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
        );
    };

    const handleImageSelect = () => {
        launchImageLibrary({ mediaType: 'photo' }, (res) => {
            if (!res.didCancel && res.assets?.length > 0) {
                setImageUri(res.assets[0].uri);
            }
        });
    };

    const handleCreateRoom = async () => {
        if (!roomName.trim() || selectedFriends.length === 0) return;

        const formData = new FormData();
        formData.append('roomName', roomName.trim());
        formData.append('invitedUserIds', JSON.stringify(selectedFriends));

        if (imageUri) {
            formData.append('image', {
                uri: imageUri,
                name: 'chatroom.jpg',
                type: 'image/jpeg',
            });
        }

        try {
            await api.post('/chat/rooms', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigation.navigate('ChatRoomList');
        } catch (error) {
            console.error('채팅방 생성 실패:', error);
            Alert.alert('채팅방 생성에 실패했습니다.');
        }
    };

    const displayedFriends = searchMode
        ? users
        : users.filter(friend =>
            friend.nickname?.toLowerCase().includes(searchText.toLowerCase())
        );

    const renderFriendItem = ({ item }) => (
        <TouchableOpacity
            style={styles.friendItem}
            onPress={() => toggleFriend(item.id)}
        >
            <Image
                source={item.profileImageUrl ? { uri: BASE_URL + item.profileImageUrl } : BASE_PROFILE}
                style={styles.friendImage}
            />
            <Text style={styles.friendName}>{item.nickname}</Text>
            <View style={[
                styles.checkbox,
                selectedFriends.includes(item.id) && styles.checkboxSelected
            ]} />
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>채팅방 만들기</Text>
            </View>

            <TouchableOpacity style={styles.imageWrapper} onPress={handleImageSelect}>
                <Image
                    source={imageUri ? { uri: imageUri } : BASE_PROFILE}
                    style={styles.profileImage}
                />
                <Text style={styles.imageLabel}>대표 이미지 선택</Text>
            </TouchableOpacity>

            <TextInput
                placeholder="채팅방 이름을 입력하세요…"
                placeholderTextColor="#A08C7B"
                value={roomName}
                onChangeText={setRoomName}
                style={styles.textInput}
                maxLength={30}
            />
            <Text style={styles.charCount}>{roomName.length}/30</Text>

            <Text style={styles.sectionTitle}>친구 초대</Text>
            <TextInput
                placeholder="🔍 친구 검색…"
                placeholderTextColor="#A08C7B"
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
                style={styles.searchInput}
            />

            <FlatList
                data={displayedFriends}
                keyExtractor={item => item.id.toString()}
                renderItem={renderFriendItem}
                contentContainerStyle={{ paddingBottom: 16 }}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        {searchMode ? '검색 결과가 없습니다.' : '친구 목록이 비어있습니다.'}
                    </Text>
                }
            />

            <Text style={styles.selectionCount}>
                선택된 인원: {selectedFriends.length}명
            </Text>

            <TouchableOpacity
                style={[
                    styles.createButton,
                    !(roomName.trim() && selectedFriends.length) && styles.disabledButton
                ]}
                onPress={handleCreateRoom}
                disabled={!(roomName.trim() && selectedFriends.length)}
            >
                <Text style={styles.buttonText}>채팅방 생성하기</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default CreateChatRoomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F1EC',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#382F2D',
    },
    imageWrapper: {
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    imageLabel: {
        marginTop: 6,
        fontSize: 12,
        color: '#7A6E66',
    },
    textInput: {
        backgroundColor: '#FFFDF9',
        borderRadius: 12,
        padding: 12,
        borderColor: '#E0D7D2',
        borderWidth: 1,
        color: '#382F2D',
        fontSize: 16,
    },
    charCount: {
        textAlign: 'right',
        marginVertical: 4,
        fontSize: 12,
        color: '#A08C7B',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#382F2D',
        marginTop: 12,
        marginBottom: 8,
    },
    searchInput: {
        backgroundColor: '#FFFDF9',
        borderRadius: 12,
        padding: 10,
        borderColor: '#E0D7D2',
        borderWidth: 1,
        marginBottom: 10,
        color: '#382F2D',
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFDF9',
        borderRadius: 12,
        padding: 10,
        marginBottom: 8,
    },
    friendImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    friendName: {
        flex: 1,
        fontSize: 15,
        color: '#382F2D',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#CCC',
    },
    checkboxSelected: {
        backgroundColor: '#A3775C',
        borderColor: '#A3775C',
    },
    selectionCount: {
        textAlign: 'right',
        fontSize: 13,
        color: '#A08C7B',
        marginVertical: 8,
    },
    createButton: {
        backgroundColor: '#A3775C',
        paddingVertical: 14,
        borderRadius: 24,
        alignItems: 'center',
        marginTop: 10,
    },
    disabledButton: {
        backgroundColor: '#D3C0B2',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#A08C7B',
        fontSize: 14,
        marginVertical: 20,
    },
});
