// src/pages/HomePage.tsx
import { useTranslation } from "react-i18next";
export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center min-h-full w-full bg-white">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
        {t("description")}
      </h1>
    </div>
  );
}
