import Seal from "../components/Seal";
import type { AppView } from "../types";

interface AdminNavProps {
  navigate: (view: AppView) => void;
  currentView: AppView;
  onLogout: () => void;
}

const adminLinks: { label: string; view: AppView; badge?: number }[] = [
  { label: "Overview", view: "admin-dashboard" },
  { label: "Pending Profiles", view: "admin-profiles", badge: 3 },
  { label: "All Alumni", view: "admin-alumni" },
  { label: "Verification", view: "admin-verification" },
  { label: "Moderation", view: "admin-moderation", badge: 2 },
  { label: "Events", view: "admin-events" },
  { label: "Fundraising", view: "admin-fundraising" },
  { label: "Settings", view: "admin-settings" },
];

export default function AdminNav({ navigate, currentView, onLogout }: AdminNavProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-charcoal flex flex-col z-40">
      <div className="p-4 border-b border-charcoal-800">
        <div className="flex items-center gap-2 mb-1">
          <Seal size={32} />
          <div>
            <div className="font-display text-sm font-semibold text-gold-300 leading-tight">Admin Panel</div>
            <div className="text-xs text-charcoal-300">GUPS Alumni</div>
          </div>
        </div>
        <div className="mt-3 px-2 py-1 bg-gold-600 rounded text-xs text-white font-medium inline-block">Administrator</div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {adminLinks.map((link) => (
          <button
            key={link.view}
            onClick={() => navigate(link.view)}
            className={`flex items-center justify-between w-full px-3 py-2.5 text-sm rounded transition-colors text-left ${
              currentView === link.view
                ? "bg-pine-700 text-white font-medium"
                : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"
            }`}
          >
            <span>{link.label}</span>
            {link.badge && (
              <span className="bg-gold-500 text-charcoal text-xs px-1.5 py-0.5 rounded-full font-semibold">{link.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-charcoal-800">
        <button onClick={onLogout} className="w-full text-left px-3 py-2.5 text-sm text-charcoal-300 hover:text-red-400 rounded transition-colors">
          ← Return to Public Site
        </button>
      </div>
    </aside>
  );
}
