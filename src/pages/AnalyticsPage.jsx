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
    <div className="space-y-5 sm:space-y-6">
      <div className="animate-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white dark:bg-[#161922] border border-slate-200/80 dark:border-white/10 shadow-sm">
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          Revenue vs. Operating Expenses
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Quarterly financial breakdown across cloud infrastructure and
          enterprise licensing
        </p>

        <div className="h-64 sm:h-80 w-full mt-5 sm:mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockData.salesTrajectory.Year}
              margin={{ top: 10, right: 8, left: -18, bottom: 0 }}
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
                tick={{ fill: axisColor, fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 10 }}
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
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar
                dataKey="revenue"
                name="Gross Revenue"
                fill="#ff5500"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                name="Operating Cost"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {mockData.regionalDistribution.map((item, i) => (
          <div
            key={item.region}
            className={`animate-card delay-${i + 1} rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white dark:bg-[#161922] border border-slate-200/80 dark:border-white/10 shadow-sm`}
          >
            <div className="flex items-center justify-between sm:block">
              <div className="flex items-center gap-2 sm:block">
                <span className="text-xl sm:text-2xl">{item.flag}</span>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white sm:mt-2">
                  {item.region}
                </h3>
              </div>
              <p className="text-lg sm:text-xl font-bold font-mono-num text-[#ff5500] sm:mt-2">
                ${item.revenue.toLocaleString()}
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {item.accounts.toLocaleString()} active seats
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
