import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions,
} from 'react-native';
import api from '../../api/api';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const TimetableDeleteScreen = () => {
    const navigation = useNavigation();

    const handleDelete = async () => {
        Alert.alert(
            '시간표 삭제',
            '정말로 시간표를 삭제하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '삭제',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const res = await api.delete('/timetable');
                            if (res.data.success) {
                                Alert.alert('삭제 완료', '시간표가 삭제되었습니다.', [
                                    {
                                        text: '확인',
                                        onPress: () => navigation.goBack(),
                                    },
                                ]);
                            }
                        } catch (err) {
                            console.error('삭제 실패:', err);
                            Alert.alert('오류', '시간표 삭제 중 오류가 발생했습니다.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>시간표 삭제</Text>
            <Text style={styles.description}>
                등록된 시간표를 모두 삭제할 수 있습니다. 이 작업은 되돌릴 수 없습니다.
            </Text>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>시간표 삭제하기</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TimetableDeleteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF8F3',
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    description: {
        fontSize: 15,
        color: '#555',
        marginBottom: 30,
        textAlign: 'center',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: width * 0.1,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
