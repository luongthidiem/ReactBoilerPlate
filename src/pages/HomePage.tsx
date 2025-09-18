// src/pages/HomePage.tsx
import { useTranslation } from "react-i18next";
export default function HomePage() {
  const { t } = useTranslation();
  return (
  <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-purple-400 via-pink-300 to-red-400">
  <h1 className="w-full text-center text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fadeIn">
    {t("description")}
  </h1>
</div>



  );
}
