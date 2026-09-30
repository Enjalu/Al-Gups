import { useState } from "react";
import Avatar from "../components/Avatar";
import Footer from "../layout/Footer";
import type { AppView } from "../types";
import { ALUMNI, BATCHES } from "../data";

interface DirectoryPageProps {
  navigate: (view: AppView) => void;
  loggedIn?: boolean;
}

const PROGRAMS = ["All Programs", "SLC", "SEE", "+2 Science", "+2 Management", "B.Sc. Agriculture"];
const COUNTRIES = ["All Countries", "Nepal", "Australia", "United Kingdom", "United States", "Japan", "South Korea", "Canada", "Qatar", "UAE", "India"];

export default function DirectoryPage({ navigate, loggedIn }: DirectoryPageProps) {
  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("All Batches");
  const [programFilter, setProgramFilter] = useState("All Programs");
  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const approved = ALUMNI.filter((m) => m.status === "approved");

  const filtered = approved.filter((m) => {
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (batchFilter !== "All Batches" && m.batchBS !== batchFilter) return false;
    if (programFilter !== "All Programs" && m.program !== programFilter) return false;
    if (countryFilter !== "All Countries" && m.country !== countryFilter) return false;
    if (verifiedOnly && !m.verified) return false;
    return true;
  });

  const FilterPanel = () => (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 block mb-2">Batch</label>
        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm text-charcoal bg-white focus:outline-none focus:border-pine-400"
        >
          <option>All Batches</option>
          {BATCHES.map((b) => <option key={b.id} value={b.yearBS}>{b.yearBS}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 block mb-2">Program</label>
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm text-charcoal bg-white focus:outline-none focus:border-pine-400"
        >
          {PROGRAMS.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 block mb-2">Country</label>
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm text-charcoal bg-white focus:outline-none focus:border-pine-400"
        >
          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="verified"
          checked={verifiedOnly}
          onChange={(e) => setVerifiedOnly(e.target.checked)}
          className="w-4 h-4 accent-pine-600"
        />
        <label htmlFor="verified" className="text-sm text-charcoal cursor-pointer">Verified Gorkhans only</label>
      </div>
      {(batchFilter !== "All Batches" || programFilter !== "All Programs" || countryFilter !== "All Countries" || verifiedOnly) && (
        <button
          onClick={() => { setBatchFilter("All Batches"); setProgramFilter("All Programs"); setCountryFilter("All Countries"); setVerifiedOnly(false); }}
          className="text-sm text-pine-600 hover:text-pine-800"
        >
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">Community</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-1">Alumni Directory</h1>
          <p className="text-charcoal-400 text-sm">Find Gorkhans from across generations and across the world.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 bg-white rounded-lg border border-charcoal-100 p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-4">Filters</div>
              <FilterPanel />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search + controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-300 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Search Gorkhans…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-charcoal-200 rounded-lg text-sm bg-white focus:outline-none focus:border-pine-400"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden px-4 py-2.5 border border-charcoal-200 rounded-lg text-sm bg-white flex items-center gap-2"
                >
                  ⚙ Filters
                </button>
                <button
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="px-3 py-2.5 border border-charcoal-200 rounded-lg text-sm bg-white"
                  title="Toggle view"
                >
                  {viewMode === "grid" ? "☰" : "⊞"}
                </button>
              </div>
            </div>

            <div className="text-charcoal-400 text-xs mb-4">
              {filtered.length} Gorkhans found
              {!loggedIn && <span className="ml-2 text-pine-600">— <button onClick={() => navigate("login")} className="underline">Log in</button> to see contact details</span>}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-charcoal-400">
                <div className="text-4xl mb-3">◎</div>
                <div className="font-medium text-charcoal-600 mb-1">No members found</div>
                <div className="text-sm">Try adjusting your filters or search term.</div>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => navigate("profile")}
                    className="group text-left p-5 bg-white border border-charcoal-100 rounded-lg hover:border-pine-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar initials={member.initials} color={member.color} size="lg" />
                      <div className="min-w-0">
                        <div className="font-semibold text-charcoal text-sm group-hover:text-pine-700 transition-colors truncate">
                          {member.name}
                        </div>
                        <div className="text-xs text-charcoal-400 mt-0.5">{member.batchBS}</div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          <span className="px-1.5 py-0.5 bg-pine-50 text-pine-700 text-xs rounded">{member.program}</span>
                          {member.verified && (
                            <span className="px-1.5 py-0.5 bg-gold-50 text-gold-700 text-xs rounded flex items-center gap-0.5">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-charcoal-400 space-y-1">
                      <div>📍 {member.country}</div>
                      {loggedIn && <div>💼 {member.profession}</div>}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-charcoal-100 divide-y divide-charcoal-100">
                {filtered.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => navigate("profile")}
                    className="group flex items-center gap-4 w-full px-5 py-4 hover:bg-pine-50 transition-colors text-left"
                  >
                    <Avatar initials={member.initials} color={member.color} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-charcoal text-sm group-hover:text-pine-700">{member.name}</span>
                        {member.verified && <span className="px-1.5 py-0.5 bg-gold-50 text-gold-700 text-xs rounded">✓</span>}
                      </div>
                      <div className="text-xs text-charcoal-400">{member.batchBS} · {member.program}</div>
                    </div>
                    <div className="hidden sm:block text-xs text-charcoal-400">📍 {member.country}</div>
                    {loggedIn && <div className="hidden md:block text-xs text-charcoal-400">💼 {member.profession}</div>}
                    <span className="text-charcoal-300 text-sm">→</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="fixed inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="relative w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <div className="font-semibold text-charcoal">Filters</div>
              <button onClick={() => setFiltersOpen(false)} className="text-charcoal-400">✕</button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-6 w-full py-3 bg-pine-600 text-white rounded-lg font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {!loggedIn && <Footer navigate={navigate} />}
    </div>
  );
}
