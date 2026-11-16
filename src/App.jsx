import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import OverviewPage from "./pages/OverviewPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AccountsMatrixPage from "./pages/AccountsMatrixPage";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("scalix_theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("scalix_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("scalix_theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f4f5f7] dark:bg-[#0b0d12] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Routes>
            <Route path="/" element={<OverviewPage darkMode={darkMode} />} />
            <Route
              path="/analytics"
              element={<AnalyticsPage darkMode={darkMode} />}
            />
            <Route path="/accounts" element={<AccountsMatrixPage />} />
          </Routes>
        </main>

        <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span>
            SCALIX Enterprise Analytics Portal - Progree Internship Task 4
          </span>
          <span>Engineered by Ahmed Ashraf</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}
