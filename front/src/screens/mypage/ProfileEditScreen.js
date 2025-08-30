import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';

const { width } = Dimensions.get('window');

const ProfileEditScreen = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const [language, setLanguage] = useState(i18n.language); // 트리거 상태

    useEffect(() => {
        const listener = () => {
            setLanguage(i18n.language); // i18n.language 변경되면 리렌더링
        };

        i18n.on('languageChanged', listener);

        return () => {
            i18n.off('languageChanged', listener);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('profileEdit.profileSettings')}</Text>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EditUsername')}>
                <Text style={styles.label}>{t('profileEdit.changeId')}</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EditProfileImage')}>
                <Text style={styles.label}>{t('profileEdit.changeProfileImage')}</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EditNickname')}>
                <Text style={styles.label}>{t('profileEdit.changeNickname')}</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EditEmail')}>
                <Text style={styles.label}>{t('profileEdit.changeEmail')}</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ChangePassword')}>
                <Text style={styles.label}>{t('profileEdit.changePassword')}</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EditUniversity')}>
                <Text style={styles.label}>{t('profileEdit.changeUniversity')}</Text>
                <Image source={require('../../assets/arrow-right.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ChangeLanguage')}>
                <Text style={styles.label}>{t('profileEdit.languageSettings')}</Text>
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
