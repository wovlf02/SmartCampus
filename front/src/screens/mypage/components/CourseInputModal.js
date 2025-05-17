import React from 'react';
import {
    Modal, View, Text, StyleSheet, TextInput, TouchableOpacity,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const DAYS = ['월', '화', '수', '목', '금'];

const CourseInputModal = ({
                              visible,
                              selectedCell,
                              form,
                              onChangeForm,
                              onSave,
                              onDelete,
                              onClose,
                          }) => {
    if (!selectedCell) return null;

    const { day, hour } = selectedCell;

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.modalTitle}>
                        {DAYS[day]}요일 {hour + 1}교시
                    </Text>

                    <TextInput
                        placeholder="과목명"
                        value={form.name}
                        onChangeText={(text) => onChangeForm({ ...form, name: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="강의실"
                        value={form.location}
                        onChangeText={(text) => onChangeForm({ ...form, location: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="교수명"
                        value={form.professor}
                        onChangeText={(text) => onChangeForm({ ...form, professor: text })}
                        style={styles.input}
                    />

                    <View style={styles.modalButtons}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancelBtn}>취소</Text>
                        </TouchableOpacity>
                        {form.name?.trim() ? (
                            <TouchableOpacity onPress={onSave}>
                                <Text style={styles.saveBtn}>저장</Text>
                            </TouchableOpacity>
                        ) : null}
                        {form.name?.trim() && (
                            <TouchableOpacity onPress={onDelete}>
                                <Text style={styles.deleteBtn}>삭제</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CourseInputModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000066',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        width: width * 0.8,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cancelBtn: { color: '#777', fontWeight: 'bold' },
    saveBtn: { color: '#2F2F2F', fontWeight: 'bold' },
    deleteBtn: { color: '#B00020', fontWeight: 'bold' },
});
