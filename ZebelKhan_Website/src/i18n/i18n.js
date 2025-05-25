// src/i18n/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "./locales/en.json";
import translationFa from "./locales/fa.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
      fa: { translation: translationFa },
    },
    lng: "fa",
    fallbackLng: "fa",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
