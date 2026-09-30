import { useState } from "react";
import type { AppView } from "../types";

interface AdminModerationProps {
  navigate: (view: AppView) => void;
}

const REPORTS = [
  { id: "r1", postContent: "Anyone know a good school to bribe admission to? GUPS taught me everything I know about shortcuts.", reportedBy: "Nabin Ghimire", reason: "Inappropriate Content", time: "3 hours ago", author: "Unknown User", status: "pending" },
  { id: "r2", postContent: "Click here for 50% off on gold. Visit our site!", reportedBy: "Suman Giri", reason: "Spam", time: "1 day ago", author: "Raju Tamang", status: "pending" },
];

export default function AdminModeration({ navigate }: AdminModerationProps) {
  const [reports, setReports] = useState(REPORTS);

  const handleAction = (id: string, action: string) => {
    setReports((prev) => prev.map((r) => r.id === id ? { ...r, status: action } : r));
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-charcoal">Community Moderation</h1>
        <p className="text-charcoal-400 text-sm">{reports.filter((r) => r.status === "pending").length} pending reports.</p>
      </div>

      <div className="space-y-5">
        {reports.map((report) => (
          <div key={report.id} className={`bg-white rounded-xl border p-6 ${report.status !== "pending" ? "border-charcoal-100 opacity-60" : "border-red-200"}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`px-2.5 py-1 rounded text-xs font-semibold ${report.status === "pending" ? "bg-red-50 text-red-700" : "bg-charcoal-100 text-charcoal-500"}`}>
                  {report.status === "pending" ? "⚠ " + report.reason : "✓ Resolved: " + report.status}
                </span>
                <div className="text-xs text-charcoal-400 mt-2">Reported by {report.reportedBy} · {report.time}</div>
              </div>
              <div className="text-xs text-charcoal-400">Author: {report.author}</div>
            </div>

            <div className="p-4 bg-paper rounded-lg border border-charcoal-100 mb-4">
              <div className="text-xs font-semibold text-charcoal-400 mb-1">Reported Content</div>
              <p className="text-sm text-charcoal-700">"{report.postContent}"</p>
            </div>

            {report.status === "pending" && (
              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleAction(report.id, "dismissed")} className="px-4 py-2 border border-charcoal-200 text-charcoal-600 rounded-lg text-sm hover:bg-paper transition-colors">
                  Dismiss
                </button>
                <button onClick={() => handleAction(report.id, "hidden")} className="px-4 py-2 border border-gold-300 text-gold-700 rounded-lg text-sm hover:bg-gold-50 transition-colors">
                  Hide Post
                </button>
                <button onClick={() => handleAction(report.id, "deleted")} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                  Delete Post
                </button>
                <button onClick={() => handleAction(report.id, "warned")} className="px-4 py-2 border border-charcoal-300 text-charcoal-600 rounded-lg text-sm hover:bg-paper transition-colors">
                  Warn User
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
