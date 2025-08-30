import React, { useState } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import api from '../../api/api';

const CorpusInputScreen = () => {
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState(null);

    const handleUploadFile = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.plainText],
            });

            const fileContent = await fetch(res.uri).then(r => r.text());
            setText(fileContent);
            setFileName(res.name);
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
                Alert.alert('파일 오류', '파일을 불러오는 중 오류가 발생했습니다.');
            }
        }
    };

    const handleSubmit = async () => {
        if (!text.trim()) {
            Alert.alert('입력 필요', '말뭉치를 입력하거나 파일을 업로드해주세요.');
            return;
        }

        try {
            const res = await api.post('/gpt/corpus', { content: text });
            if (res.data.success) {
                Alert.alert('등록 완료', '말뭉치가 성공적으로 저장되었습니다.');
                setText('');
                setFileName(null);
            }
        } catch (err) {
            Alert.alert('오류', '등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.title}>GPT 말뭉치 입력</Text>

            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFile}>
                <Text style={styles.uploadText}>{fileName ? `📄 ${fileName}` : '파일 업로드 (txt)'}</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.textarea}
                placeholder="여기에 직접 텍스트를 입력하세요..."
                multiline
                value={text}
                onChangeText={setText}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.saveText}>등록하기</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CorpusInputScreen;

const styles = StyleSheet.create({
    container: { backgroundColor: '#FDF8F3', flex: 1 },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    uploadButton: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
    },
    uploadText: {
        color: '#333',
        fontSize: 15,
    },
    textarea: {
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        fontSize: 14,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#2F2F2F',
        padding: 14,
        borderRadius: 30,
        alignItems: 'center',
    },
    saveText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
