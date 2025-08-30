import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions
} from 'react-native';
import api from '../../api/api';
import EncryptedStorage from "react-native-encrypted-storage";

const { width } = Dimensions.get('window');

const ChangePasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isMatch, setIsMatch] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState(false);

    // 실시간 비밀번호 일치 확인
    useEffect(() => {
        setIsMatch(confirmPassword && newPassword === confirmPassword);
    }, [newPassword, confirmPassword]);

    // 실시간 비밀번호 강도 평가
    useEffect(() => {
        const checkStrength = (pw) => {
            const lengthValid = pw.length >= 8;
            const hasNumber = /\d/.test(pw);
            const hasLetter = /[a-zA-Z]/.test(pw);
            const hasSpecial = /[!@#$%^&*]/.test(pw);
            const score = [lengthValid, hasNumber, hasLetter, hasSpecial].filter(Boolean).length;

            switch (score) {
                case 4: return '매우 강함';
                case 3: return '강함';
                case 2: return '보통';
                case 1: return '약함';
                default: return '';
            }
        };
        setPasswordStrength(checkStrength(newPassword));
    }, [newPassword]);

    const handleSubmit = async () => {
        setCurrentPasswordError(false);
        try {
            const token = await EncryptedStorage.getItem('accessToken');
            if (!token) {
                Alert.alert('인증 오류', '로그인이 필요합니다.');
                return;
            }

            const response = await api.put(
                '/auth/password/update',
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                Alert.alert('비밀번호 변경 완료', '새 비밀번호로 변경되었습니다.');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                throw new Error();
            }
        } catch (error) {
            setCurrentPasswordError(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>비밀번호 변경</Text>

            {/* 현재 비밀번호 */}
            <TextInput
                style={[
                    styles.input,
                    currentPasswordError && styles.inputError,
                ]}
                placeholder="현재 비밀번호"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />
            {currentPasswordError && (
                <Text style={styles.errorText}>기존 비밀번호가 일치하지 않습니다.</Text>
            )}

            {/* 새 비밀번호 */}
            <TextInput
                style={styles.input}
                placeholder="새 비밀번호"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            {passwordStrength !== '' && (
                <Text style={styles.strengthText}>강도: {passwordStrength}</Text>
            )}

            {/* 비밀번호 확인 */}
            <TextInput
                style={[
                    styles.input,
                    isMatch === false && styles.inputError,
                    isMatch === true && styles.inputSuccess,
                ]}
                placeholder="새 비밀번호 확인"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            {/* 제출 버튼 */}
            {isMatch && passwordStrength !== '' && (
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>비밀번호 변경</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF8F3',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        fontSize: 15,
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    inputSuccess: {
        borderColor: '#34C759',
    },
    errorText: {
        color: '#FF3B30',
        marginTop: -10,
        marginBottom: 10,
        fontSize: 13,
    },
    strengthText: {
        color: '#555',
        fontSize: 13,
        marginBottom: 10,
        paddingLeft: 4,
    },
    button: {
        backgroundColor: '#2F2F2F',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
