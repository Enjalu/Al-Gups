import { useState } from "react";
import type { AppView, AuthState } from "./types";
import { NOTIFICATIONS } from "./data";

import PublicNav from "./layout/PublicNav";
import AlumniNav from "./layout/AlumniNav";
import AdminNav from "./layout/AdminNav";

import HomePage from "./pages/HomePage";
import DirectoryPage from "./pages/DirectoryPage";
import BatchesPage from "./pages/BatchesPage";
import BatchDetailPage from "./pages/BatchDetailPage";
import EventsPage from "./pages/EventsPage";
import MemoriesPage from "./pages/MemoriesPage";
import DistinguishedPage from "./pages/DistinguishedPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClaimProfilePage from "./pages/ClaimProfilePage";

import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import CommunityPage from "./pages/CommunityPage";
import NotificationsPage from "./pages/NotificationsPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import FundraisingPage from "./pages/FundraisingPage";
import SettingsPage from "./pages/SettingsPage";

import AdminDashboard from "./admin/AdminDashboard";
import AdminProfiles from "./admin/AdminProfiles";
import AdminModeration from "./admin/AdminModeration";
import AdminVerification from "./admin/AdminVerification";

export default function App() {
  const [view, setView] = useState<AppView>("home");
  const [authState, setAuthState] = useState<AuthState>("public");

  const navigate = (v: AppView) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const login = (role: AuthState) => {
    setAuthState(role);
    setView(role === "admin" ? "admin-dashboard" : "dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logout = () => {
    setAuthState("public");
    setView("home");
  };

  const unreadNotifs = NOTIFICATIONS.filter((n) => !n.read).length;

  // Admin layout
  if (authState === "admin") {
    return (
      <div className="flex min-h-screen bg-paper">
        <AdminNav navigate={navigate} currentView={view} onLogout={logout} />
        <main className="flex-1 ml-56 min-h-screen overflow-y-auto">
          {view === "admin-dashboard" && <AdminDashboard navigate={navigate} />}
          {view === "admin-profiles" && <AdminProfiles navigate={navigate} />}
          {view === "admin-moderation" && <AdminModeration navigate={navigate} />}
          {view === "admin-verification" && <AdminVerification navigate={navigate} />}
          {(view === "admin-alumni" || view === "admin-events" || view === "admin-fundraising" || view === "admin-settings") && (
            <PlaceholderAdminPage view={view} navigate={navigate} />
          )}
        </main>
      </div>
    );
  }

  // Alumni portal layout
  if (authState === "alumni") {
    return (
      <div className="flex min-h-screen bg-paper">
        <AlumniNav navigate={navigate} currentView={view} onLogout={logout} notifCount={unreadNotifs} />
        <main className="flex-1 lg:ml-56 pt-14 lg:pt-0 pb-16 lg:pb-0 min-h-screen overflow-y-auto">
          {view === "dashboard" && <DashboardPage navigate={navigate} />}
          {view === "profile" && <div className="p-4 sm:p-6 lg:p-8"><ProfilePage navigate={navigate} isOwnProfile /></div>}
          {view === "community" && <div className="p-4 sm:p-6 lg:p-8"><CommunityPage navigate={navigate} /></div>}
          {view === "notifications" && <div className="p-4 sm:p-6 lg:p-8"><NotificationsPage navigate={navigate} /></div>}
          {view === "opportunities" && <div className="p-4 sm:p-6 lg:p-8"><OpportunitiesPage navigate={navigate} /></div>}
          {view === "fundraising" && <div className="p-4 sm:p-6 lg:p-8"><FundraisingPage navigate={navigate} /></div>}
          {view === "settings" && <div className="p-4 sm:p-6 lg:p-8"><SettingsPage navigate={navigate} onLogout={logout} /></div>}
          {view === "alumni-directory" && <DirectoryPage navigate={navigate} loggedIn />}
          {view === "my-batch" && <BatchDetailPage navigate={navigate} />}
          {view === "alumni-events" && <EventsPage navigate={navigate} loggedIn />}
          {view === "alumni-memories" && <MemoriesPage navigate={navigate} loggedIn />}
        </main>
      </div>
    );
  }

  // Public pages with full-page layout
  if (view === "login") return <LoginPage navigate={navigate} onLogin={login} />;
  if (view === "register") return <RegisterPage navigate={navigate} onLogin={login} />;
  if (view === "claim-profile") return <ClaimProfilePage navigate={navigate} onLogin={login} />;

  // Public layout with nav
  return (
    <div className="min-h-screen bg-paper">
      <PublicNav navigate={navigate} currentView={view} />
      <main>
        {view === "home" && <HomePage navigate={navigate} />}
        {view === "directory" && <DirectoryPage navigate={navigate} />}
        {view === "batches" && <BatchesPage navigate={navigate} />}
        {view === "batch-detail" && <BatchDetailPage navigate={navigate} />}
        {view === "events" && <EventsPage navigate={navigate} />}
        {view === "memories" && <MemoriesPage navigate={navigate} />}
        {view === "distinguished" && <DistinguishedPage navigate={navigate} />}
        {view === "contact" && <ContactPage navigate={navigate} />}
        {view === "opportunities" && (
          <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-4 text-charcoal-400 text-sm">
              <button onClick={() => navigate("login")} className="text-pine-600 hover:underline">Log in</button>{" "}
              to post opportunities. Browsing is open to all.
            </div>
            <OpportunitiesPage navigate={navigate} />
          </div>
        )}
        {view === "fundraising" && (
          <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-4 text-charcoal-400 text-sm">
              <button onClick={() => navigate("login")} className="text-pine-600 hover:underline">Log in</button>{" "}
              to contribute to campaigns.
            </div>
            <FundraisingPage navigate={navigate} />
          </div>
        )}
      </main>
    </div>
  );
}

function PlaceholderAdminPage({ view, navigate }: { view: AppView; navigate: (v: AppView) => void }) {
  const TITLES: Partial<Record<AppView, string>> = {
    "admin-alumni": "All Alumni",
    "admin-events": "Event Management",
    "admin-fundraising": "Fundraising Management",
    "admin-settings": "Admin Settings",
  };
  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-bold text-charcoal mb-2">{TITLES[view]}</h1>
      <p className="text-charcoal-400 text-sm mb-6">This section is available in the full implementation.</p>
      <button onClick={() => navigate("admin-dashboard")} className="text-pine-600 text-sm hover:text-pine-800">← Back to Overview</button>
    </div>
  );
}
