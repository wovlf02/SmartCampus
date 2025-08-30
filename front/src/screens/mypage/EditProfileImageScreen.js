import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import api from '../../api/api';

const EditProfileImageScreen = () => {
    const [image, setImage] = useState(null);

    const onSelectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (res) => {
            if (res.assets?.length > 0) {
                setImage(res.assets[0]);
            }
        });
    };

    const handleSave = async () => {
        if (!image) return Alert.alert('이미지를 선택해주세요.');
        const formData = new FormData();
        formData.append('profileImage', {
            uri: image.uri,
            type: image.type || 'image/jpeg',
            name: image.fileName || 'profile.jpg',
        });

        try {
            const res = await api.patch('/users/profile-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Alert.alert('성공', '프로필 이미지가 변경되었습니다.');
        } catch {
            Alert.alert('오류', '이미지 변경에 실패했습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>프로필 이미지 변경</Text>
            <TouchableOpacity onPress={onSelectImage} style={styles.imageBox}>
                <Image
                    source={image ? { uri: image.uri } : require('../../assets/base_profile.png')}
                    style={styles.image}
                />
                <Text style={styles.changeText}>이미지 선택</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditProfileImageScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF8F3', padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
    imageBox: { alignItems: 'center' },
    image: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
    changeText: { color: '#007AFF' },
    button: { backgroundColor: '#2F2F2F', padding: 14, borderRadius: 10, marginTop: 20, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});
