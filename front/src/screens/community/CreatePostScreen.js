import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image,
    KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../api/api';

const CreatePostScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        const loadToken = async () => {
            const token = await EncryptedStorage.getItem('accessToken');
            if (token) setAccessToken(token);
        };
        loadToken();
    }, []);

    const pickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 5,
            },
            (response) => {
                if (response.didCancel || response.errorCode) return;
                if (response.assets) {
                    setAttachments(prev => [...prev, ...response.assets]);
                }
            }
        );
    };

    const removeAttachment = (index) => {
        const updated = [...attachments];
        updated.splice(index, 1);
        setAttachments(updated);
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('입력 오류', '제목과 내용을 모두 입력해주세요.');
            return;
        }

        try {
            const token = await EncryptedStorage.getItem('accessToken');
            const postData = { title, content };

            const formData = new FormData();
            formData.append('post', JSON.stringify(postData));

            // 첨부파일이 있다면 추가
            attachments.forEach((file, index) => {
                formData.append('files', {
                    uri: file.uri,
                    type: file.type || 'image/jpeg',
                    name: file.fileName || `attachment_${index}.jpg`,
                });
            });

            await api.post('/community/posts', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                    // ✅ Content-Type은 생략 (자동으로 boundary 포함됨)
                },
            });

            Alert.alert('성공', '게시글이 등록되었습니다.');
            navigation.goBack();
        } catch (error) {
            console.error('게시글 등록 실패:', error);
            Alert.alert('오류', '게시글 등록 중 문제가 발생했습니다.');
        }
    };


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/back.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>게시글 작성</Text>
                </View>

                <TextInput style={styles.titleInput} placeholder="제목을 입력하세요" value={title} onChangeText={setTitle} />
                <TextInput
                    style={styles.contentInput}
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChangeText={setContent}
                    multiline
                />

                <View style={styles.attachmentSection}>
                    <TouchableOpacity style={styles.attachmentButton} onPress={pickImage}>
                        <Text style={styles.attachmentButtonText}>📎 첨부파일 추가</Text>
                    </TouchableOpacity>

                    <View style={styles.attachmentPreview}>
                        {attachments.map((file, idx) => (
                            <View key={idx} style={styles.thumbnailBox}>
                                <Image source={{ uri: file.uri }} style={styles.imageThumb} />
                                <TouchableOpacity style={styles.removeIconBox} onPress={() => removeAttachment(idx)}>
                                    <Text style={styles.removeIcon}>×</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>작성 완료</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F7FA',
        flexGrow: 1,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#333',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 12,
        color: '#222',
    },
    titleInput: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        marginBottom: 16,
    },
    contentInput: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 15,
        height: 180,
        textAlignVertical: 'top',
    },
    attachmentSection: {
        marginTop: 24,
    },
    attachmentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        backgroundColor: '#E6F0FF',
        borderRadius: 12,
        marginBottom: 16,
    },
    attachmentButtonText: {
        fontSize: 15,
        color: '#007AFF',
        fontWeight: '600',
    },
    attachmentPreview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    thumbnailBox: {
        width: 72,
        height: 72,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
        position: 'relative',
    },
    imageThumb: {
        width: '100%',
        height: '100%',
    },
    removeIconBox: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    removeIcon: {
        fontSize: 14,
        color: '#FF3B30',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 10,
    },
    submitText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
});