import React, { useState, useMemo } from "react";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  RotateCcw,
} from "lucide-react";
import mockData from "../data/mockData.json";

export default function AccountsMatrixPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "mrr",
    direction: "desc",
  });

  // Multi-column sorting handler
  const handleSort = (columnKey) => {
    setSortConfig((prev) => {
      if (prev.key === columnKey) {
        return {
          key: columnKey,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: columnKey, direction: "asc" };
    });
  };

  // Filtered & Sorted Matrix
  const processedAccounts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = mockData.enterpriseAccounts.filter((acc) => {
      const matchesQuery =
        !q ||
        acc.company.toLowerCase().includes(q) ||
        acc.contact.toLowerCase().includes(q) ||
        acc.id.toLowerCase().includes(q) ||
        acc.region.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" || acc.status === statusFilter;
      const matchesPlan = planFilter === "All" || acc.plan === planFilter;

      return matchesQuery && matchesStatus && matchesPlan;
    });

    return [...filtered].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }

      return sortConfig.direction === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [searchQuery, statusFilter, planFilter, sortConfig]);

  const exportCSV = () => {
    const headers = [
      "ID",
      "Company",
      "Contact",
      "Plan",
      "Region",
      "MRR ($)",
      "Growth (%)",
      "Status",
    ];
    const rows = processedAccounts.map((r) => [
      r.id,
      `"${r.company}"`,
      `"${r.contact}"`,
      r.plan,
      `"${r.region}"`,
      r.mrr,
      r.growth,
      r.status,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "METRIQ_enterprise_accounts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key)
      return <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5 text-[#ff5500]" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-[#ff5500]" />
    );
  };

  const statusBadgeStyle = (status) => {
    if (status === "Active") {
      return "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    }
    if (status === "At Risk") {
      return "bg-rose-500/12 text-rose-600 dark:text-rose-400 border-rose-500/20";
    }
    return "bg-amber-500/12 text-amber-600 dark:text-amber-400 border-amber-500/20";
  };

  return (
    <div className="animate-card rounded-3xl p-6 bg-white dark:bg-[#161922] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-5">
      {/* Header & Export */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Enterprise Accounts Matrix
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Client-side search filtering & multi-column sorting across{" "}
            {processedAccounts.length} accounts
          </p>
        </div>

        <button
          type="button"
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 transition cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by company, contact, ID, or region..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#ff5500]"
          />
        </div>

        <div className="md:col-span-3 flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by Status"
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1d212d] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#ff5500]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="At Risk">At Risk</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            aria-label="Filter by Plan"
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1d212d] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#ff5500]"
          >
            <option value="All">All Plans</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Pro">Pro</option>
            <option value="Starter">Starter</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("All");
              setPlanFilter("All");
              setSortConfig({ key: "mrr", direction: "desc" });
            }}
            className="w-full h-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Multi-Column Sortable Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-slate-50/90 dark:bg-white/[0.03] border-b border-slate-200/80 dark:border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {[
                { key: "id", label: "Account ID" },
                { key: "company", label: "Organization" },
                { key: "plan", label: "Tier" },
                { key: "region", label: "Region" },
                { key: "mrr", label: "Monthly MRR" },
                { key: "growth", label: "QoQ Growth" },
                { key: "status", label: "Status" },
              ].map((col) => (
                <th key={col.key} className="py-3.5 px-4">
                  <button
                    type="button"
                    onClick={() => handleSort(col.key)}
                    className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                  >
                    <span>{col.label}</span>
                    {renderSortIcon(col.key)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200/70 dark:divide-white/8 text-xs">
            {processedAccounts.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-400">
                  No accounts match your current filter criteria.
                </td>
              </tr>
            ) : (
              processedAccounts.map((acc) => (
                <tr
                  key={acc.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono-num text-slate-500 dark:text-slate-400">
                    {acc.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {acc.company}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {acc.contact}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/8 text-slate-700 dark:text-slate-200 font-medium">
                      {acc.plan}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {acc.region}
                  </td>
                  <td className="py-3.5 px-4 font-mono-num font-semibold text-slate-900 dark:text-white">
                    ${acc.mrr.toLocaleString()}
                  </td>
                  <td
                    className={`py-3.5 px-4 font-mono-num font-semibold ${
                      acc.growth >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {acc.growth >= 0 ? `+${acc.growth}%` : `${acc.growth}%`}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full border text-[11px] font-medium ${statusBadgeStyle(acc.status)}`}
                    >
                      {acc.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
