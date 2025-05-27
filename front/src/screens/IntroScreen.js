import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../i18n'; // ✅ 두 단계 위로 올라가서 i18n.js 접근
const IntroScreen = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            {/* 로고 및 앱 이름 */}
            <View style={styles.logoContainer}>
                <Image source={require('../assets/university.png')} style={styles.logo} />
                <Text style={styles.appName}>SmartCampus</Text>
            </View>

            {/* 간략한 설명 */}
            <Text style={styles.mainDescription}>{t('intro.mainDescription')}</Text>

            {/* 주요 기능 아이콘 */}
            <View style={styles.iconSection}>
                <View style={styles.iconCard}>
                    <Image source={require('../assets/community.png')} style={styles.icon} />
                    <Text style={styles.iconLabel}>{t('intro.community')}</Text>
                </View>
                <View style={styles.iconCard}>
                    <Image source={require('../assets/personal.png')} style={styles.icon} />
                    <Text style={styles.iconLabel}>{t('intro.courseManagement')}</Text>
                </View>
                <View style={styles.iconCard}>
                    <Image source={require('../assets/IotMap.png')} style={styles.icon} />
                    <Text style={styles.iconLabel}>{t('intro.campusMap')}</Text>
                </View>
            </View>

            {/* 버튼 섹션 */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>{t('intro.login')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>{t('intro.signup')}</Text>
                </TouchableOpacity>
            </View>

            {/* 프론트 테스트 버튼 추가 */}
            <TouchableOpacity
                style={styles.testButton}
                onPress={() => navigation.navigate('Main')}
            >
                <Text style={styles.buttonText}>{t('intro.testButton')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F2FD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#007BFF',
        marginTop: 10,
    },
    mainDescription: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#007BFF',
        textAlign: 'center',
        marginBottom: 30,
    },
    subDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    iconSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginBottom: 20,
    },
    iconCard: {
        alignItems: 'center',
    },
    icon: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    iconLabel: {
        fontSize: 14,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    loginButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        flex: 1,
        borderRadius: 25,
        marginRight: 10,
    },
    signUpButton: {
        backgroundColor: '#00C853',
        paddingVertical: 15,
        flex: 1,
        borderRadius: 25,
    },
    testButton: {
        backgroundColor: '#FF9800',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default IntroScreen;
