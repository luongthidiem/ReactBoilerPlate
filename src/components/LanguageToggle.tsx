import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 shadow-md">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-4 py-2 font-semibold transition-colors duration-300 
          ${
            i18n.language === "en"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("vi")}
        className={`px-4 py-2 font-semibold transition-colors duration-300 
          ${
            i18n.language === "vi"
              ? "bg-green-500 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
      >
        VI
      </button>
    </div>
  );
}
