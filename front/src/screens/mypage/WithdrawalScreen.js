import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../api/api';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const WithdrawalScreen = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleWithdraw = async () => {
        setError(false);

        if (!password) {
            Alert.alert('입력 필요', '현재 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const token = await EncryptedStorage.getItem('accessToken');
            if (!token) {
                Alert.alert('인증 오류', '로그인이 필요합니다.');
                return;
            }

            const response = await api.delete('/auth/withdraw', {
                headers: { Authorization: `Bearer ${token}` },
                data: { password },
            });

            if (response.data.success) {
                Alert.alert('탈퇴 완료', '회원 탈퇴가 완료되었습니다.', [
                    {
                        text: '확인',
                        onPress: async () => {
                            await EncryptedStorage.clear();
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            });
                        }
                    }
                ]);
            }
        } catch (err) {
            setError(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>회원 탈퇴</Text>

            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="현재 비밀번호 입력"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    setError(false);
                }}
            />
            {error && (
                <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
                <Text style={styles.buttonText}>회원 탈퇴하기</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WithdrawalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF8F3',
        padding: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        marginBottom: 10,
        fontSize: 15,
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 13,
        marginBottom: 10,
        paddingLeft: 2,
    },
    button: {
        backgroundColor: '#FF3B30',
        padding: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
