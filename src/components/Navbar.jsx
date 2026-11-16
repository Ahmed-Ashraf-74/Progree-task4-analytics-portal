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
    { to: "/accounts", label: "Accounts Matrix", icon: Table2 },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-[#111318]/85 border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo (Inspired by SCALIX) */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff5500] to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-lg text-slate-900 dark:text-white">
              METRIQ
            </span>
            <span className="hidden sm:inline-block ml-2 text-[11px] font-mono-num px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">
              v2.4
            </span>
          </div>
        </NavLink>

        {/* Pill Navigation Menu */}
        <nav
          aria-label="Primary Portal Navigation"
          className="flex items-center gap-1 p-1.5 rounded-full bg-slate-100/90 dark:bg-white/[0.06] border border-slate-200/70 dark:border-white/10"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Controls: Dark/Light Engine Toggle + Profile */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle Dark or Light Mode"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 transition cursor-pointer"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span className="hidden md:inline">Dark</span>
              </>
            )}
          </button>

          <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 dark:from-orange-500 dark:to-amber-500 text-white font-semibold text-xs flex items-center justify-center">
              AA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
