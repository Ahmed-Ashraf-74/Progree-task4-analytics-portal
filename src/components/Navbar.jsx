import React from "react";
import { NavLink } from "react-router-dom";
import {
  Flame,
  Sun,
  Moon,
  LayoutDashboard,
  BarChart3,
  Table2,
} from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const navItems = [
    { to: "/", label: "Overview", icon: LayoutDashboard },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/accounts", label: "Accounts", icon: Table2 },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/85 dark:bg-[#111318]/90 border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2.5">
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#ff5500] to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex items-center">
            <span className="font-bold tracking-tight text-base sm:text-lg text-slate-900 dark:text-white">
              NEXORA
            </span>
            <span className="ml-2 text-[10px] sm:text-[11px] font-mono-num px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">
              v2.4
            </span>
          </div>
        </NavLink>

        {/* Right Controls (Moves next to logo on mobile) */}
        <div className="flex items-center gap-2 sm:order-3 shrink-0">
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle Dark or Light Mode"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 transition cursor-pointer"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span>Dark</span>
              </>
            )}
          </button>

          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 dark:from-orange-500 dark:to-amber-500 text-white font-semibold text-xs flex items-center justify-center">
            AA
          </div>
        </div>

        {/* Responsive Pill Navigation Menu (Full width on mobile, centered on desktop) */}
        <nav
          aria-label="Primary Portal Navigation"
          className="w-full sm:w-auto sm:order-2 flex items-center justify-between sm:justify-center gap-1 p-1 rounded-full bg-slate-100/90 dark:bg-white/[0.06] border border-slate-200/70 dark:border-white/10"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
