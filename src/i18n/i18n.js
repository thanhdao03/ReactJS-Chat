// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import vi from './locales/vi/translation.json';

// Cấu hình i18n
i18n
  .use(initReactI18next) // kết nối react-i18next với i18next
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: "vi", // ngôn ngữ mặc định
    fallbackLng: "vi", // ngôn ngữ dự phòng nếu không có bản dịch
    interpolation: {
      escapeValue: false, // không cần thoát ký tự đặc biệt với react
    },
  });

export default i18n;
