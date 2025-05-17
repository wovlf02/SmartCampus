import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProfileEditScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>프로필 설정</Text>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EditUsername')}>
                <Text style={styles.label}>아이디 변경</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EditProfileImage')}>
                <Text style={styles.label}>프로필 이미지 변경</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EditNickname')}>
                <Text style={styles.label}>닉네임 변경</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EditEmail')}>
                <Text style={styles.label}>이메일 변경</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ChangePassword')}>
                <Text style={styles.label}>비밀번호 변경</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EditUniversity')}>
                <Text style={styles.label}>대학교 변경</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF8F3',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#999',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    icon: {
        width: 16,
        height: 16,
        tintColor: '#999',
    },
});
