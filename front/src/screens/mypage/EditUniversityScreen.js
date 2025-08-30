import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../api/api';

const { width } = Dimensions.get('window');

const EditUniversityScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [university, setUniversity] = useState(null);

    // 대학교 선택 후 route.params.selectedUniversity로 상태 갱신
    useEffect(() => {
        if (route.params?.selectedUniversity) {
            setUniversity(route.params.selectedUniversity);
        }
    }, [route.params?.selectedUniversity]);

    // 대학교 검색 화면으로 이동 (선택 후 selectedUniversity 반환됨)
    const handleSelectUniversity = () => {
        navigation.navigate('UniversitySelect', {
            onSelect: (univ) => {
                setUniversity(univ);
                navigation.setParams({ selectedUniversity: univ }); // 상태 유지를 위해 params 갱신
            },
        });
    };

    // 저장 요청
    const handleSave = async () => {
        if (!university) {
            Alert.alert('오류', '대학교를 선택해주세요.');
            return;
        }

        try {
            const res = await api.patch('/users/university', {
                universityId: university.id,
            });

            if (res.data.success) {
                Alert.alert('변경 완료', '대학교가 성공적으로 변경되었습니다.', [
                    { text: '확인', onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert('실패', res.data.message || '변경에 실패했습니다.');
            }
        } catch (e) {
            console.error(e);
            Alert.alert('오류', '대학교 변경 중 문제가 발생했습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>대학교 변경</Text>

            <TouchableOpacity style={styles.searchButton} onPress={handleSelectUniversity}>
                <Text style={styles.searchText}>
                    {university?.name || '대학교 검색'}
                </Text>
            </TouchableOpacity>

            {university && (
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveText}>변경하기</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default EditUniversityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF8F3',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center',
    },
    searchButton: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    searchText: {
        color: '#333',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
