import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import FastImage from 'react-native-fast-image';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';
import api from '../../api/api';
import { jwtDecode } from 'jwt-decode';

const DAYS = ['월', '화', '수', '목', '금'];
const HOURS = Array.from({ length: 12 }, (_, i) => `${i + 1}교시`);
const CELL_WIDTH = 70;
const CELL_HEIGHT = 80;
const BASE_URL = 'http://192.168.0.2:8080';

const MyPageScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        loadUserData();
        fetchTimetable();
    }, []);

    const loadUserData = async () => {
        try {
            const token = await EncryptedStorage.getItem('accessToken');
            if (token) {
                const decoded = jwtDecode(token);
                const userId = Number(decoded.sub);

                const res = await api.get(`/users/${userId}`);
                setUser(res.data);
            }
        } catch (err) {
            console.error('유저 정보 조회 실패:', err);
        }
    };

    const fetchTimetable = async () => {
        try {
            const res = await api.get('/timetable');
            const raw = Array.isArray(res.data.data) ? res.data.data : [];

            const convertToPeriod = (startTimeStr) => {
                const [hour, minute] = startTimeStr.split(':').map(Number);
                const totalMinutes = hour * 60 + minute;
                const firstClassStart = 9 * 60 + 30;
                return Math.floor((totalMinutes - firstClassStart) / 60);
            };

            const parsed = raw.map(item => {
                const dayMap = {
                    MONDAY: 0,
                    TUESDAY: 1,
                    WEDNESDAY: 2,
                    THURSDAY: 3,
                    FRIDAY: 4,
                };

                return {
                    day: dayMap[item.dayOfWeek],
                    hour: convertToPeriod(item.startTime),
                    name: item.subjectName,
                    location: item.location,
                    professor: item.professorName,
                };
            });

            setTimetable(parsed);
        } catch (err) {
            console.error('시간표 불러오기 실패:', err);
            setTimetable([]);
        }
    };


    const renderTimetableCell = (hour, day) => {
        const course = timetable.find(c => c.day === day && c.hour === hour);
        if (!course) return <View style={styles.cell} key={day}></View>;

        return (
            <View style={[styles.cell, styles.filledCell]} key={day}>
                <Text style={styles.courseName} numberOfLines={2}>{course.name}</Text>
                <Text style={styles.courseSub}>{course.location}</Text>
                <Text style={styles.courseProf}>{course.professor}</Text>
            </View>
        );
    };

    const handleLogout = async () => {
        await EncryptedStorage.removeItem('accessToken');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    return (
        <ScrollView style={styles.container}>
            {/* 프로필 */}
            <View style={styles.card}>
                <View style={styles.profileRow}>
                    <FastImage
                        source={
                            user?.profileImageUrl
                                ? { uri: `${BASE_URL}${user.profileImageUrl}` }
                                : require('../../assets/base_profile.png')
                        }
                        style={styles.avatar}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.nickname}>{user?.nickname || '닉네임'}</Text>
                        <Text style={styles.email}>{user?.email || '이메일'}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('ProfileEdit')}
                >
                    <Text style={styles.buttonText}>정보 수정</Text>
                </TouchableOpacity>
            </View>

            {/* 시간표 */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>대학교 시간표</Text>
                <ScrollView horizontal>
                    <View>
                        <View style={styles.row}>
                            <View style={styles.headerCell}><Text style={styles.bold}>교시</Text></View>
                            {DAYS.map(day => (
                                <View style={styles.headerCell} key={day}>
                                    <Text style={styles.bold}>{day}</Text>
                                </View>
                            ))}
                        </View>
                        {HOURS.map((hourLabel, rowIdx) => (
                            <View style={styles.row} key={rowIdx}>
                                <View style={styles.headerCell}>
                                    <Text>{hourLabel}</Text>
                                </View>
                                {DAYS.map((_, colIdx) =>
                                    renderTimetableCell(rowIdx, colIdx)
                                )}
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <View style={styles.timetableButtons}>
                    <TouchableOpacity onPress={() => navigation.navigate('TimetableEdit')}>
                        <Text style={styles.textButton}>등록</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('TimetableEdit')}>
                        <Text style={styles.textButton}>수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('TimetableDelete')}>
                        <Text style={styles.textButton}>삭제</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 설정 */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>설정</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.settingItem}>로그아웃 →</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Withdrawal')}>
                    <Text style={[styles.settingItem, { color: '#B00020' }]}>회원 탈퇴 →</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: '#FDF8F3', flex: 1 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        margin: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileRow: { flexDirection: 'row', alignItems: 'center' },
    profileInfo: { marginLeft: 12 },
    avatar: { width: 64, height: 64, borderRadius: 32 },
    nickname: { fontWeight: 'bold', fontSize: 16 },
    email: { color: '#777', marginTop: 2 },
    button: {
        marginTop: 10,
        backgroundColor: '#2F2F2F',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignSelf: 'flex-end',
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
    row: {
        flexDirection: 'row',
        alignItems: 'stretch',  // ✅ 높이 유동 적용
    },
    headerCell: {
        height: CELL_HEIGHT,
        width: CELL_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#ccc',
        backgroundColor: '#f7f7f7',
        flex: 1,
    },
    cell: {
        flex: 1,
        width: CELL_WIDTH,
        minHeight: 60,
        padding: 4,
        borderWidth: 0.5,
        borderColor: '#ccc',
        justifyContent: 'center',
    },
    filledCell: { backgroundColor: '#E9F2FF' },
    courseName: { fontWeight: 'bold', fontSize: 12, flexWrap: 'wrap' },
    courseSub: { fontSize: 11 },
    courseProf: { fontSize: 10, color: '#555' },
    timetableButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
    },
    textButton: {
        color: '#2F2F2F',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    settingItem: {
        paddingVertical: 10,
        fontSize: 15,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
    },
    bold: { fontWeight: 'bold' },
});

export default MyPageScreen;
