import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import api from '../../api/api';

const { width } = Dimensions.get('window');

const EditUsernameScreen = () => {
    const [username, setUsername] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleCheck = async () => {
        try {
            const res = await api.post('/auth/check-username', { username });
            if (res.data.data) {
                setIsValid(true);
                Alert.alert('사용 가능', '사용 가능한 아이디입니다.');
            } else {
                Alert.alert('중복 아이디', '이미 사용 중인 아이디입니다.');
            }
        } catch {
            Alert.alert('오류', '아이디 확인 중 오류 발생');
        }
    };

    const handleSave = async () => {
        try {
            const res = await api.patch('/users/username', { username });
            if (res.data.success) {
                Alert.alert('변경 완료', '아이디가 성공적으로 변경되었습니다.');
            }
        } catch {
            Alert.alert('오류', '아이디 변경 중 오류 발생');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>아이디 변경</Text>
            <TextInput
                placeholder="새 아이디 입력"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
            />
            <TouchableOpacity style={styles.checkButton} onPress={handleCheck}>
                <Text style={styles.checkText}>중복 확인</Text>
            </TouchableOpacity>
            {isValid && (
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveText}>변경하기</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default EditUsernameScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF8F3', padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
    input: { backgroundColor: '#fff', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ccc' },
    checkButton: {
        backgroundColor: '#2F2F2F', padding: 12, marginTop: 10, borderRadius: 10, alignItems: 'center'
    },
    checkText: { color: '#fff', fontWeight: 'bold' },
    saveButton: {
        backgroundColor: '#007AFF', padding: 12, marginTop: 20, borderRadius: 10, alignItems: 'center'
    },
    saveText: { color: '#fff', fontWeight: 'bold' },
});
