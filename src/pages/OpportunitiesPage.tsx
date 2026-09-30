import { useState } from "react";
import type { AppView } from "../types";
import { OPPORTUNITIES } from "../data";

interface OpportunitiesPageProps {
  navigate: (view: AppView) => void;
}

const TYPES = ["All", "Job", "Internship", "Scholarship", "Mentorship", "Volunteering"];
const TYPE_COLOR: Record<string, string> = {
  job: "bg-pine-50 text-pine-700",
  internship: "bg-blue-50 text-blue-700",
  scholarship: "bg-gold-50 text-gold-700",
  mentorship: "bg-purple-50 text-purple-700",
  business: "bg-charcoal-100 text-charcoal-600",
  volunteering: "bg-green-50 text-green-700",
};

export default function OpportunitiesPage({ navigate }: OpportunitiesPageProps) {
  const [filter, setFilter] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const filtered = OPPORTUNITIES.filter((o) => {
    if (filter !== "All" && o.type !== filter.toLowerCase()) return false;
    if (remoteOnly && !o.remote) return false;
    return true;
  });

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <div className="font-display text-2xl font-bold text-charcoal mb-1">Opportunities</div>
        <p className="text-charcoal-400 text-sm">Jobs, scholarships, and connections — posted by and for Gorkhans.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              filter === t ? "bg-pine-600 text-white border-pine-600" : "bg-white text-charcoal-600 border-charcoal-200 hover:border-pine-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input type="checkbox" id="remote" checked={remoteOnly} onChange={(e) => setRemoteOnly(e.target.checked)} className="w-4 h-4 accent-pine-600" />
        <label htmlFor="remote" className="text-sm text-charcoal cursor-pointer">Remote / Online only</label>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-charcoal-400">
          <div className="text-3xl mb-2">◈</div>
          <div className="font-medium text-charcoal-600 mb-1">No opportunities found</div>
          <div className="text-sm">Adjust your filters or check back later.</div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((opp) => (
            <div key={opp.id} className="bg-white rounded-xl border border-charcoal-100 p-6 hover:border-pine-200 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-start gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-charcoal text-base">{opp.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${TYPE_COLOR[opp.type]}`}>
                      {opp.type}
                    </span>
                    {opp.remote && <span className="px-2 py-0.5 bg-charcoal-100 text-charcoal-600 rounded text-xs">Remote</span>}
                  </div>
                  <div className="text-charcoal-600 text-sm font-medium">{opp.organization}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-charcoal-400 mb-3">
                <div>📍 {opp.location}</div>
                <div>👤 Posted by {opp.postedBy}</div>
                <div>📅 Deadline: {opp.deadline}</div>
              </div>
              <p className="text-charcoal-600 text-sm leading-relaxed mb-4">{opp.description}</p>
              <button
                onClick={() => navigate("login")}
                className="px-5 py-2 bg-pine-600 text-white rounded-lg text-sm font-semibold hover:bg-pine-700 transition-colors"
              >
                View & Apply
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-5 bg-pine-50 border border-pine-100 rounded-xl">
        <div className="font-semibold text-pine-800 text-sm mb-1">Post an Opportunity</div>
        <p className="text-charcoal-400 text-xs mb-3">Know of a job, scholarship, or mentorship opportunity for Gorkhans? Share it with the community.</p>
        <button
          onClick={() => navigate("login")}
          className="px-4 py-2 bg-pine-600 text-white rounded text-sm font-semibold hover:bg-pine-700 transition-colors"
        >
          Post Opportunity
        </button>
      </div>
    </div>
  );
}
