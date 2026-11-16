import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";
import mockData from "../data/mockData.json";

export default function OverviewPage({ darkMode }) {
  const [timeframe, setTimeframe] = useState("Month");
  const activeSalesSeries =
    mockData.salesTrajectory[timeframe] || mockData.salesTrajectory.Month;

  const axisColor = darkMode ? "#94a3b8" : "#64748b";
  const gridColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const tooltipBg = darkMode ? "#181b23" : "#ffffff";
  const tooltipBorder = darkMode ? "rgba(255,255,255,0.12)" : "#e2e8f0";

  return (
    <div className="space-y-6">
      {/* Top 4 KPI Strip (SCALIX Style) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockData.kpis.map((kpi, idx) => (
          <article
            key={kpi.id}
            className={`animate-card delay-${idx + 1} rounded-3xl p-5 bg-white dark:bg-[#161922] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all`}
          >
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {kpi.label}
            </p>
            <div className="mt-2.5 flex items-baseline justify-between gap-2">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-mono-num">
                {kpi.value}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-semibold font-mono-num ${
                  kpi.positive
                    ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/12 text-rose-600 dark:text-rose-400"
                }`}
              >
                {kpi.positive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {kpi.trend}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
              {kpi.sub}
            </p>
          </article>
        ))}
      </section>

      {/* Middle Row: Sales Smooth Area Curve + Operational Radar Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Trajectory Card (7 cols) */}
        <div className="animate-card delay-2 lg:col-span-7 rounded-3xl p-6 bg-white dark:bg-[#161922] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Sales & Revenue Velocity
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Interactive trajectory parsed from live JSON telemetry
              </p>
            </div>

            {/* Timeframe Switcher Pills (Day / Week / Month style) */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
              {["Month", "Quarter", "Year"].map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                    timeframe === tf
                      ? "bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activeSalesSeries}
                margin={{ top: 10, right: 12, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="scalixOrange" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff5500" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#ff5500" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="period"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: axisColor, fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: axisColor, fontSize: 11 }}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: tooltipBorder,
                    borderRadius: "14px",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ff5500"
                  strokeWidth={2.8}
                  fillOpacity={1}
                  fill="url(#scalixOrange)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Performance Radar (5 cols - Inspired by OptiFlow Video) */}
        <div className="animate-card delay-3 lg:col-span-5 rounded-3xl p-6 bg-white dark:bg-[#161922] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Operational Performance
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Actual vs Benchmark Target
              </p>
            </div>
            <Link
              to="/analytics"
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition"
            >
              <span>Details</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="74%"
                data={mockData.operationalRadar}
              >
                <PolarGrid stroke={gridColor} />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: axisColor, fontSize: 11 }}
                />
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="#ff5500"
                  fill="#ff5500"
                  fillOpacity={0.28}
                />
                <Radar
                  name="Target"
                  dataKey="target"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.16}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: tooltipBorder,
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Bottom Row: Products Donut + Regional Distribution */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Chart Card (5 cols) */}
        <div className="animate-card delay-4 lg:col-span-5 rounded-3xl p-6 bg-white dark:bg-[#161922] border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Product Mix
            </h2>
            <span className="text-xs font-mono-num text-slate-400">
              100% ALLOCATED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.categoryMix}
                    innerRadius={52}
                    outerRadius={76}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {mockData.categoryMix.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      borderColor: tooltipBorder,
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-slate-900 dark:text-white font-mono-num">
                  100%
                </span>
                <span className="text-[10px] text-slate-400">Share</span>
              </div>
            </div>

            <div className="space-y-3">
              {mockData.categoryMix.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-semibold font-mono-num text-slate-900 dark:text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Distribution Bars (7 cols - SCALIX Style) */}
        <div className="animate-card delay-5 lg:col-span-7 rounded-3xl p-6 bg-white dark:bg-[#161922] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Global Distribution
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Active enterprise seats by country
              </p>
            </div>
            <Link
              to="/accounts"
              className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 transition"
            >
              <span>Open Accounts Matrix</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {mockData.regionalDistribution.map((row) => {
              const pct = Math.round((row.accounts / 8500) * 100);
              return (
                <div
                  key={row.region}
                  className="grid grid-cols-12 items-center gap-3 text-xs"
                >
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
                    <span className="text-base">{row.flag}</span>
                    <span className="truncate">{row.region}</span>
                  </div>
                  <div className="col-span-5 sm:col-span-6 h-2.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: row.color }}
                    />
                  </div>
                  <div className="col-span-2 text-right font-mono-num font-semibold text-slate-900 dark:text-white">
                    {row.accounts.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
