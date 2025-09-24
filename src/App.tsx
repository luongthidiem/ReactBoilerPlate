// src/App.tsx
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { loadUserFromToken } from "@/store/authSlice";

import Header from "@/components/Header";
import HomePage from "@/pages/HomePage";
import TodoPage from "@/pages/TodoPage";
import NotesPage from "@/pages/NotesPage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Footer from "@/components/Footer";

export default function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  // Load user từ token nếu có
  useEffect(() => {
    if (token) {
      dispatch(loadUserFromToken(token));
    }
  }, [token, dispatch]);

  return (
    <div className="h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Header luôn hiển thị */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-1 p-6">
        <ErrorBoundary>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/notes" element={<NotesPage />} />
          </Route>
        </Routes>
        </ErrorBoundary>
      </main>
      {/* them footer */}
      <Footer text="@2025 Luong thi diem"/>
    </div>
  );
}
