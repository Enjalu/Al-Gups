import { useState } from "react";
import Seal from "../components/Seal";
import type { AppView } from "../types";

interface PublicNavProps {
  navigate: (view: AppView) => void;
  currentView: AppView;
}

const navLinks: { label: string; view: AppView }[] = [
  { label: "Alumni", view: "directory" },
  { label: "Batches", view: "batches" },
  { label: "Events", view: "events" },
  { label: "Memories", view: "memories" },
  { label: "Distinguished", view: "distinguished" },
  { label: "About", view: "contact" },
];

export default function PublicNav({ navigate, currentView }: PublicNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-paper border-b border-paper-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate("home")} className="flex items-center gap-3 group">
          <Seal size={40} />
          <div className="hidden sm:block text-left">
            <div className="font-display font-semibold text-pine-800 text-sm leading-tight">GUPS Alumni</div>
            <div className="text-xs text-charcoal-400 leading-tight">Association</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => navigate(link.view)}
              className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                currentView === link.view
                  ? "text-pine-700 bg-pine-50"
                  : "text-charcoal-600 hover:text-pine-700 hover:bg-pine-50"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("login")}
            className="hidden sm:block px-4 py-2 text-sm font-medium text-pine-700 border border-pine-700 rounded hover:bg-pine-50 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("register")}
            className="px-4 py-2 text-sm font-medium bg-pine-600 text-white rounded hover:bg-pine-700 transition-colors"
          >
            Join the Gorkhans
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-charcoal-600"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-paper border-t border-paper-darker px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => { navigate(link.view); setMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-charcoal-700 hover:text-pine-700 hover:bg-pine-50 rounded"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { navigate("login"); setMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-pine-700 hover:bg-pine-50 rounded"
          >
            Log In
          </button>
        </div>
      )}
    </nav>
  );
}
