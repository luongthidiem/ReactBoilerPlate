import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import vi from "./locales/vi.json";

i18n
  .use(LanguageDetector) // tự động phát hiện ngôn ngữ từ browser
  .use(initReactI18next) // kết nối với React
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    fallbackLng: "en", // nếu không phát hiện được thì mặc định English
    interpolation: { escapeValue: false },
  });

export default i18n;
