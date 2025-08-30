import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity,
    Dimensions, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../api/api';

const { width, height } = Dimensions.get('window');
const DOMAINS = ['gmail.com', 'naver.com', 'daum.net', '직접 입력'];

const EditEmailScreen = () => {
    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState(DOMAINS[0]);
    const [customDomain, setCustomDomain] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [authSent, setAuthSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const fullEmail = `${emailId}@${emailDomain === '직접 입력' ? customDomain : emailDomain}`;

    const sendVerificationCode = async () => {
        try {
            const res = await api.post('/auth/send-code', {
                email: fullEmail,
                type: 'update'
            });
            setAuthSent(true);
            setTimeLeft(180);
            Alert.alert('성공', res.data.message || '인증코드가 전송되었습니다.');
        } catch {
            Alert.alert('오류', '인증코드 전송 실패');
        }
    };

    const verifyCode = async () => {
        try {
            const res = await api.post('/auth/verify-code', {
                email: fullEmail,
                code: authCode
            });
            if (res.data.data === true) {
                setEmailVerified(true);
                Alert.alert('인증 성공', '이메일 인증이 완료되었습니다.');
            } else {
                Alert.alert('실패', '인증번호가 올바르지 않습니다.');
            }
        } catch {
            Alert.alert('오류', '인증번호 확인 중 오류');
        }
    };

    const handleSave = async () => {
        try {
            const token = await EncryptedStorage.getItem('accessToken');
            const res = await api.patch('/users/email', fullEmail, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {
                Alert.alert('변경 완료', '이메일이 변경되었습니다.');
            } else {
                Alert.alert('오류', res.data.message || '이메일 변경 실패');
            }
        } catch {
            Alert.alert('오류', '서버와 통신 중 문제가 발생했습니다.');
        }
    };

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>이메일 변경</Text>

            <View style={styles.emailRow}>
                <TextInput
                    style={styles.emailInput}
                    placeholder="이메일"
                    value={emailId}
                    onChangeText={setEmailId}
                />
                <Text style={styles.at}>@</Text>
                {emailDomain === '직접 입력' ? (
                    <TextInput
                        style={styles.emailInput}
                        placeholder="직접 입력"
                        value={customDomain}
                        onChangeText={setCustomDomain}
                    />
                ) : (
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={emailDomain}
                            onValueChange={setEmailDomain}
                            style={styles.picker}
                        >
                            {DOMAINS.map(domain => (
                                <Picker.Item key={domain} label={domain} value={domain} />
                            ))}
                        </Picker>
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
                <Text style={styles.buttonText}>인증번호 전송</Text>
            </TouchableOpacity>

            {authSent && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="인증번호 입력"
                        value={authCode}
                        onChangeText={setAuthCode}
                        keyboardType="number-pad"
                    />
                    <Text style={styles.timer}>
                        남은 시간: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={verifyCode}>
                        <Text style={styles.buttonText}>인증 확인</Text>
                    </TouchableOpacity>
                </>
            )}

            {emailVerified && (
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>이메일 저장</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default EditEmailScreen;

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
        textAlign: 'center',
    },
    emailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    emailInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 12,
        height: 48,
    },
    at: {
        marginHorizontal: 6,
        fontSize: 16,
    },
    pickerContainer: {
        flex: 1,
        height: 48,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: '100%',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 12,
        height: 48,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#2F2F2F',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    timer: {
        alignSelf: 'flex-end',
        color: '#FF3B30',
        marginBottom: 10,
    },
});
