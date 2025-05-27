// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: { translation: en },
            ko: { translation: ko },
            ja: { translation: ja },
        },
        lng: 'ko',           // ✅ 한국어로 고정
        fallbackLng: 'ko',   // ✅ fallback도 한국어로 설정
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
