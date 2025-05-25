import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    console.log(`Changing language to: ${lng}`);
     i18n.changeLanguage(lng);
    document.dir = lng === "fa" ? "rtl" : "ltr"; // تغییر جهت متن برای فارسی
  };

  return (
    <div className="flex space-x-2 rtl:space-x-reverse">
      <button
        onClick={() => changeLanguage("fa")}
        className={`px-2 py-1 rounded ${i18n.language === "fa" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        فارسی
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-2 py-1 rounded ${i18n.language === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
