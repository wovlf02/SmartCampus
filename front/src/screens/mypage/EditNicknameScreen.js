import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import api from '../../api/api';

const EditNicknameScreen = () => {
    const [nickname, setNickname] = useState('');
    const [valid, setValid] = useState(false);

    const checkNickname = async () => {
        try {
            const res = await api.post('/auth/check-nickname', { nickname });
            if (res.data.data) {
                Alert.alert('사용 가능', '사용 가능한 닉네임입니다.');
                setValid(true);
            } else {
                Alert.alert('중복 닉네임', '이미 사용 중입니다.');
                setValid(false);
            }
        } catch {
            Alert.alert('오류', '닉네임 확인 실패');
        }
    };

    const handleSave = async () => {
        if (!valid) return Alert.alert('닉네임 중복확인을 해주세요.');
        try {
            await api.patch('/users/nickname', { nickname });
            Alert.alert('성공', '닉네임이 변경되었습니다.');
        } catch {
            Alert.alert('오류', '닉네임 변경 실패');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>닉네임 변경</Text>
            <TextInput
                placeholder="새 닉네임"
                value={nickname}
                onChangeText={setNickname}
                style={styles.input}
            />
            <TouchableOpacity onPress={checkNickname} style={styles.button}>
                <Text style={styles.buttonText}>중복 확인</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={[styles.button, { backgroundColor: '#007AFF' }]}>
                <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditNicknameScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF8F3', padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
    input: { backgroundColor: '#fff', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 12 },
    button: { backgroundColor: '#2F2F2F', padding: 14, borderRadius: 10, marginTop: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});
