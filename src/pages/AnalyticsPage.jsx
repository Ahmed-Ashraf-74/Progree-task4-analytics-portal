import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import mockData from "../data/mockData.json";

export default function AnalyticsPage({ darkMode }) {
  const axisColor = darkMode ? "#94a3b8" : "#64748b";
  const gridColor = darkMode ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.07)";
  const tooltipBg = darkMode ? "#181b23" : "#ffffff";
  const tooltipBorder = darkMode ? "rgba(255,255,255,0.12)" : "#e2e8f0";

  return (
    <div className="space-y-6">
      <div className="animate-card rounded-3xl p-6 bg-white dark:bg-[#161922] border border-slate-200/80 dark:border-white/10 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Revenue vs. Operating Expenses
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Quarterly financial breakdown across cloud infrastructure and
          enterprise licensing
        </p>

        <div className="h-80 w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockData.salesTrajectory.Year}
              margin={{ top: 10, right: 16, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                vertical={false}
              />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 12 }}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: tooltipBorder,
                  borderRadius: "14px",
                  fontSize: "12px",
                }}
                formatter={(val) => `$${val.toLocaleString()}`}
              />
              <Legend />
              <Bar
                dataKey="revenue"
                name="Gross Revenue"
                fill="#ff5500"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                name="Operating Cost"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Revenue Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {mockData.regionalDistribution.map((item, i) => (
          <div
            key={item.region}
            className={`animate-card delay-${i + 1} rounded-3xl p-5 bg-white dark:bg-[#161922] border border-slate-200/80 dark:border-white/10 shadow-sm`}
          >
            <div className="text-2xl mb-2">{item.flag}</div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              {item.region}
            </h3>
            <p className="text-xl font-bold font-mono-num text-[#ff5500] mt-2">
              ${item.revenue.toLocaleString()}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {item.accounts.toLocaleString()} active seats
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
