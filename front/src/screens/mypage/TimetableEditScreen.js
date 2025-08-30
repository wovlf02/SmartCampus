import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Dimensions, Alert, TextInput
} from 'react-native';
import api from '../../api/api';
import EncryptedStorage from 'react-native-encrypted-storage';

const DAYS = ['월', '화', '수', '목', '금'];
const HOURS = Array.from({ length: 12 }, (_, i) => `${i + 1}교시`);
const CELL_WIDTH = 70;

const TimetableEditScreen = () => {
    const [timetable, setTimetable] = useState([]);
    const [editingCell, setEditingCell] = useState(null);
    const [form, setForm] = useState({ name: '', location: '', professor: '' });

    useEffect(() => {
        fetchTimetable();
    }, []);

    const fetchTimetable = async () => {
        try {
            const res = await api.get('/timetable');
            const converted = res.data.map(item => ({
                day: item.dayOfWeek.code - 1,
                hour: getHourIndex(item.startTime),
                name: item.subjectName,
                location: item.location,
                professor: item.professor.name,
            }));
            setTimetable(converted);
        } catch (err) {
            console.error('시간표 불러오기 실패:', err);
            setTimetable([]);
        }
    };

    const getHourIndex = (startTime) => {
        const hour = parseInt(startTime.split(':')[0], 10);
        return hour - 9; // 09:30 → 0교시
    };

    const openEdit = (hour, day) => {
        const existing = timetable.find(c => c.day === day && c.hour === hour);
        setEditingCell({ hour, day });
        setForm(existing || { name: '', location: '', professor: '' });
    };

    const saveCourse = () => {
        if (!form.name.trim()) return Alert.alert('과목명을 입력해주세요.');
        const updated = timetable.filter(c => !(c.day === editingCell.day && c.hour === editingCell.hour));
        updated.push({ ...form, day: editingCell.day, hour: editingCell.hour });
        setTimetable(updated);
        setEditingCell(null);
        setForm({ name: '', location: '', professor: '' });
    };

    const deleteCourse = () => {
        const updated = timetable.filter(c => !(c.day === editingCell.day && c.hour === editingCell.hour));
        setTimetable(updated);
        setEditingCell(null);
        setForm({ name: '', location: '', professor: '' });
    };

    const handleSaveToServer = async () => {
        try {
            const token = await EncryptedStorage.getItem('accessToken');
            if (!token) return Alert.alert('오류', '로그인이 필요합니다.');

            const requestBody = timetable.map(c => ({
                subjectName: c.name,
                professor: c.professor,
                dayOfWeek: c.day + 1,
                startPeriod: c.hour + 1,
                endPeriod: c.hour + 1,
                location: c.location,
            }));

            const res = await api.post('/timetable', requestBody);
            if (res.data.success) {
                Alert.alert('변경 완료', '시간표가 성공적으로 수정되었습니다.');
            }
        } catch (err) {
            console.error('시간표 저장 실패:', err);
            Alert.alert('오류', '시간표 저장 중 문제가 발생했습니다.');
        }
    };

    const renderCell = (hourIdx, dayIdx) => {
        const course = timetable.find(c => c.day === dayIdx && c.hour === hourIdx);
        return (
            <TouchableOpacity
                key={dayIdx}
                style={[styles.cell, course && styles.filledCell]}
                onPress={() => openEdit(hourIdx, dayIdx)}
            >
                {course && (
                    <>
                        <Text style={styles.courseName}>{course.name}</Text>
                        <Text style={styles.courseSub}>{course.location}</Text>
                        <Text style={styles.courseProf}>{course.professor}</Text>
                    </>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <View>
                    {/* 헤더 */}
                    <View style={styles.row}>
                        <View style={styles.headerCell}><Text style={styles.bold}>교시</Text></View>
                        {DAYS.map((day, i) => (
                            <View key={i} style={styles.headerCell}><Text style={styles.bold}>{day}</Text></View>
                        ))}
                    </View>
                    {/* 셀 */}
                    {HOURS.map((label, hourIdx) => (
                        <View key={hourIdx} style={styles.row}>
                            <View style={styles.headerCell}><Text>{label}</Text></View>
                            {DAYS.map((_, dayIdx) => renderCell(hourIdx, dayIdx))}
                        </View>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveToServer}>
                <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>

            {editingCell && (
                <View style={styles.editor}>
                    <Text style={styles.editorTitle}>
                        {DAYS[editingCell.day]}요일 {editingCell.hour + 1}교시 편집
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="과목명"
                        value={form.name}
                        onChangeText={text => setForm({ ...form, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="위치"
                        value={form.location}
                        onChangeText={text => setForm({ ...form, location: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="교수명"
                        value={form.professor}
                        onChangeText={text => setForm({ ...form, professor: text })}
                    />
                    <View style={styles.editorButtons}>
                        <TouchableOpacity onPress={saveCourse}>
                            <Text style={styles.saveText}>저장</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteCourse}>
                            <Text style={styles.deleteText}>삭제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setEditingCell(null)}>
                            <Text style={styles.cancelText}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF8F3', paddingBottom: 80 },
    row: { flexDirection: 'row' },
    headerCell: {
        width: CELL_WIDTH,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    cell: {
        width: CELL_WIDTH,
        minHeight: 60,
        padding: 4,
        borderWidth: 0.5,
        borderColor: '#ccc',
        justifyContent: 'center',
    },
    filledCell: { backgroundColor: '#E9F2FF' },
    courseName: { fontWeight: 'bold', fontSize: 12 },
    courseSub: { fontSize: 11 },
    courseProf: { fontSize: 10, color: '#555' },
    saveButton: {
        position: 'absolute',
        bottom: 20,
        left: width * 0.1,
        right: width * 0.1,
        backgroundColor: '#2F2F2F',
        padding: 14,
        borderRadius: 30,
        alignItems: 'center',
    },
    saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    editor: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    editorTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 12 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
    },
    editorButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveText: { color: '#2F2F2F', fontWeight: 'bold' },
    deleteText: { color: '#B00020', fontWeight: 'bold' },
    cancelText: { color: '#777', fontWeight: 'bold' },
    bold: { fontWeight: 'bold' },
});

export default TimetableEditScreen;
