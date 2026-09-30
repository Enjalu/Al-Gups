import { useState } from "react";
import Seal from "../components/Seal";
import Avatar from "../components/Avatar";
import type { AppView } from "../types";

interface AlumniNavProps {
  navigate: (view: AppView) => void;
  currentView: AppView;
  onLogout: () => void;
  notifCount: number;
}

const sidebarLinks: { label: string; view: AppView; icon: string }[] = [
  { label: "Dashboard", view: "dashboard", icon: "⊞" },
  { label: "Directory", view: "alumni-directory", icon: "◉" },
  { label: "My Batch", view: "my-batch", icon: "♦" },
  { label: "Community", view: "community", icon: "◈" },
  { label: "Events", view: "alumni-events", icon: "◷" },
  { label: "Memories", view: "alumni-memories", icon: "◑" },
  { label: "Opportunities", view: "opportunities", icon: "◈" },
];

export default function AlumniNav({ navigate, currentView, onLogout, notifCount }: AlumniNavProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NavItem = ({ link }: { link: typeof sidebarLinks[0] }) => (
    <button
      onClick={() => { navigate(link.view); setSidebarOpen(false); }}
      className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-lg transition-colors text-left ${
        currentView === link.view
          ? "bg-pine-600 text-white font-medium"
          : "text-charcoal-600 hover:bg-pine-50 hover:text-pine-700"
      }`}
    >
      <span className="text-base w-5 text-center">{link.icon}</span>
      <span>{link.label}</span>
    </button>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-56 bg-white border-r border-charcoal-100 z-40">
        <div className="p-4 border-b border-charcoal-100">
          <button onClick={() => navigate("dashboard")} className="flex items-center gap-2">
            <Seal size={36} />
            <div>
              <div className="font-display text-sm font-semibold text-pine-800 leading-tight">GUPS Alumni</div>
              <div className="text-xs text-charcoal-400">Association</div>
            </div>
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map((link) => <NavItem key={link.view} link={link} />)}
        </nav>

        <div className="p-3 border-t border-charcoal-100 space-y-0.5">
          <button
            onClick={() => navigate("notifications")}
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-lg transition-colors ${
              currentView === "notifications" ? "bg-pine-600 text-white" : "text-charcoal-600 hover:bg-pine-50 hover:text-pine-700"
            }`}
          >
            <span className="text-base w-5 text-center relative">
              🔔
              {notifCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                  {notifCount}
                </span>
              )}
            </span>
            <span>Notifications</span>
          </button>
          <button
            onClick={() => navigate("profile")}
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-lg transition-colors ${
              currentView === "profile" ? "bg-pine-600 text-white" : "text-charcoal-600 hover:bg-pine-50 hover:text-pine-700"
            }`}
          >
            <Avatar initials="SG" color="#2B5F3A" size="xs" />
            <span>My Profile</span>
          </button>
          <button
            onClick={() => navigate("settings")}
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-lg transition-colors ${
              currentView === "settings" ? "bg-pine-600 text-white" : "text-charcoal-600 hover:bg-pine-50 hover:text-pine-700"
            }`}
          >
            <span className="text-base w-5 text-center">⚙</span>
            <span>Settings</span>
          </button>
          <button onClick={onLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            <span className="text-base w-5 text-center">→</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-charcoal-100 h-14 flex items-center justify-between px-4">
        <button onClick={() => setSidebarOpen(true)}>
          <svg className="w-5 h-5 text-charcoal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Seal size={32} />
        <button onClick={() => navigate("notifications")} className="relative">
          <span>🔔</span>
          {notifCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">{notifCount}</span>
          )}
        </button>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-charcoal-100 flex">
        {[
          { label: "Home", view: "dashboard" as AppView, emoji: "⊞" },
          { label: "Directory", view: "alumni-directory" as AppView, emoji: "◉" },
          { label: "Community", view: "community" as AppView, emoji: "◈" },
          { label: "Events", view: "alumni-events" as AppView, emoji: "◷" },
          { label: "Profile", view: "profile" as AppView, emoji: "○" },
        ].map((item) => (
          <button
            key={item.view}
            onClick={() => navigate(item.view)}
            className={`flex-1 flex flex-col items-center py-2 text-[10px] ${
              currentView === item.view ? "text-pine-600" : "text-charcoal-400"
            }`}
          >
            <span className="text-xl">{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 bg-white h-full flex flex-col">
            <div className="p-4 border-b border-charcoal-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Seal size={32} />
                <div className="font-display text-sm font-semibold text-pine-800">GUPS Alumni</div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-charcoal-400">✕</button>
            </div>
            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
              {sidebarLinks.map((link) => <NavItem key={link.view} link={link} />)}
            </nav>
            <div className="p-3 border-t border-charcoal-100">
              <button onClick={() => { onLogout(); setSidebarOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
