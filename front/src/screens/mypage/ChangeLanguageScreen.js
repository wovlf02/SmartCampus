import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';

const languages = [
    { label: '한국어', value: 'ko' },
    { label: 'English', value: 'en' },
    { label: '日本語', value: 'ja' },
];

const ChangeLanguageScreen = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);
    const [modalVisible, setModalVisible] = useState(false);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        console.log('Current language:', i18n.language);
        setModalVisible(false);
    };

    const getLanguageLabel = (langCode) => {
        return languages.find(l => l.value === langCode)?.label || langCode;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('changeLanguage.title')}</Text>

            <TouchableOpacity
                style={styles.selector}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.selectedText}>
                    {getLanguageLabel(language)}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={languages}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleLanguageChange(item.value)}
                                >
                                    <Text style={styles.modalItemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            <Text style={styles.currentLangText}>
                {t('changeLanguage.selected')}: {getLanguageLabel(language)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF8F3',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#2F2F2F',
    },
    selector: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: 180,
        alignItems: 'center',
        marginBottom: 20,
    },
    selectedText: {
        fontSize: 18,
        color: '#2F2F2F',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: 220,
        borderRadius: 10,
        paddingVertical: 10,
    },
    modalItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalItemText: {
        fontSize: 16,
        color: '#2F2F2F',
    },
    currentLangText: {
        marginTop: 20,
        fontSize: 16,
        color: '#555',
    },
});

export default ChangeLanguageScreen;
