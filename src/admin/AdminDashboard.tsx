import type { AppView } from "../types";
import { ALUMNI, PENDING_PROFILES, CAMPAIGNS } from "../data";

interface AdminDashboardProps {
  navigate: (view: AppView) => void;
}

export default function AdminDashboard({ navigate }: AdminDashboardProps) {
  const approved = ALUMNI.filter((a) => a.status === "approved").length;
  const verified = ALUMNI.filter((a) => a.verified).length;

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="mb-8">
        <div className="text-charcoal-400 text-sm mb-1">Admin Panel</div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Overview</h1>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Pending Approvals", value: PENDING_PROFILES.length.toString(), color: "bg-gold-50 border-gold-200", action: () => navigate("admin-profiles") },
          { label: "Total Alumni", value: approved.toString(), color: "bg-pine-50 border-pine-200", action: () => navigate("admin-alumni") },
          { label: "Verified Members", value: verified.toString(), color: "bg-white border-charcoal-100", action: () => navigate("admin-verification") },
          { label: "Pending Reports", value: "2", color: "bg-red-50 border-red-200", action: () => navigate("admin-moderation") },
          { label: "Upcoming Events", value: "2", color: "bg-white border-charcoal-100", action: () => navigate("admin-events") },
          { label: "New This Week", value: "3", color: "bg-white border-charcoal-100", action: () => navigate("admin-profiles") },
        ].map((metric) => (
          <button
            key={metric.label}
            onClick={metric.action}
            className={`p-5 rounded-xl border ${metric.color} text-left hover:shadow-md transition-all group`}
          >
            <div className="font-display text-3xl font-bold text-charcoal group-hover:text-pine-700 transition-colors">{metric.value}</div>
            <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mt-1">{metric.label}</div>
          </button>
        ))}
      </div>

      {/* Pending profiles */}
      <div className="bg-white rounded-xl border border-charcoal-100 mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-100">
          <div className="font-semibold text-charcoal">Pending Profile Approvals</div>
          <button onClick={() => navigate("admin-profiles")} className="text-pine-600 text-xs font-medium hover:text-pine-800">
            Review All →
          </button>
        </div>
        <div className="divide-y divide-charcoal-50">
          {PENDING_PROFILES.map((profile) => (
            <div key={profile.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="font-medium text-charcoal text-sm">{profile.name}</div>
                <div className="text-charcoal-400 text-xs">{profile.batch} · {profile.program} · {profile.country}</div>
                <div className="text-charcoal-300 text-xs">Submitted: {profile.submittedDate}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  profile.directoryMatch === "Possible match found"
                    ? "bg-gold-50 text-gold-700"
                    : "bg-charcoal-100 text-charcoal-500"
                }`}>
                  {profile.directoryMatch}
                </span>
                <button onClick={() => navigate("admin-profiles")} className="px-3 py-1.5 bg-pine-600 text-white rounded text-xs font-semibold hover:bg-pine-700">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fundraising summary */}
      <div className="bg-white rounded-xl border border-charcoal-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-100">
          <div className="font-semibold text-charcoal">Active Campaigns</div>
          <button onClick={() => navigate("admin-fundraising")} className="text-pine-600 text-xs font-medium hover:text-pine-800">Manage →</button>
        </div>
        <div className="divide-y divide-charcoal-50">
          {CAMPAIGNS.map((c) => {
            const pct = Math.round((c.raisedAmount / c.targetAmount) * 100);
            return (
              <div key={c.id} className="px-6 py-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="font-medium text-charcoal text-sm">{c.title}</div>
                  <div className="text-charcoal-400 text-xs shrink-0">{pct}%</div>
                </div>
                <div className="h-1.5 bg-charcoal-100 rounded-full">
                  <div className="h-1.5 bg-pine-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-xs text-charcoal-400 mt-1">
                  <span>NPR {c.raisedAmount.toLocaleString()} raised</span>
                  <span>Goal: NPR {c.targetAmount.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
