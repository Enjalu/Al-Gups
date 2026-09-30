import { useState } from "react";
import Avatar from "../components/Avatar";
import type { AppView } from "../types";
import { ALUMNI } from "../data";

interface ProfilePageProps {
  navigate: (view: AppView) => void;
  isOwnProfile?: boolean;
}

const TABS = ["GUPS Journey", "Current Life", "Community", "Memories"];

export default function ProfilePage({ navigate, isOwnProfile = true }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("GUPS Journey");
  const [editing, setEditing] = useState(false);
  const profile = ALUMNI[0];

  return (
    <div className="max-w-3xl">
      {/* Profile header */}
      <div className="bg-white rounded-xl border border-charcoal-100 overflow-hidden mb-6">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-pine-800 to-pine-600 relative">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 11px)"
          }} />
        </div>

        {/* Profile info */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <Avatar initials={profile.initials} color={profile.color} size="xl" className="border-4 border-white shadow-md" />
              {isOwnProfile && (
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-charcoal-200 rounded-full flex items-center justify-center text-xs shadow">
                  📷
                </button>
              )}
            </div>
            {isOwnProfile && (
              <button
                onClick={() => setEditing(!editing)}
                className="px-4 py-2 border border-charcoal-200 rounded-lg text-sm font-medium text-charcoal hover:bg-paper transition-colors"
              >
                {editing ? "Save Changes" : "Edit Profile"}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-charcoal">{profile.name}</h1>
              <div className="text-charcoal-400 text-sm mt-1">{profile.profession}</div>
              <div className="text-charcoal-400 text-sm">{profile.city}, {profile.country}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-pine-50 text-pine-700 text-xs font-semibold rounded-full border border-pine-200 flex items-center gap-1">
                ✓ Association Approved
              </span>
              {profile.docVerified && (
                <span className="px-3 py-1 bg-gold-50 text-gold-700 text-xs font-semibold rounded-full border border-gold-200 flex items-center gap-1">
                  ⬡ Document Verified
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-3 py-1 bg-charcoal-100 text-charcoal-600 text-xs rounded-full">{profile.batchBS}</span>
            <span className="px-3 py-1 bg-charcoal-100 text-charcoal-600 text-xs rounded-full">{profile.batchAD}</span>
            <span className="px-3 py-1 bg-charcoal-100 text-charcoal-600 text-xs rounded-full">{profile.program}</span>
          </div>

          {profile.bio && (
            <p className="mt-4 text-charcoal-600 text-sm leading-relaxed">{profile.bio}</p>
          )}
        </div>

        {/* Tabs */}
        <div className="border-t border-charcoal-100">
          <div className="flex overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-pine-600 text-pine-700"
                    : "border-transparent text-charcoal-400 hover:text-charcoal"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-xl border border-charcoal-100 p-6">
        {activeTab === "GUPS Journey" && (
          <div className="space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-4">Education at GUPS</div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-pine-600 mt-1.5" />
                  <div className="flex-1 w-px bg-charcoal-200 my-1" />
                  <div className="w-2 h-2 rounded-full bg-pine-200 mt-1" />
                </div>
                <div className="flex-1 space-y-5">
                  <div>
                    <div className="font-semibold text-charcoal text-sm">Gorkha United Public School</div>
                    <div className="text-charcoal-400 text-xs mt-0.5">Kohalpur-2, Banke, Nepal</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-pine-700 text-xs font-medium">{profile.program}</span>
                      <span className="text-charcoal-300 text-xs">·</span>
                      <span className="text-charcoal-400 text-xs">{profile.batchBS} ({profile.batchAD})</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-charcoal-300 text-xs">Joined GUPS Alumni Association</div>
                    <div className="text-charcoal-400 text-xs mt-0.5">{profile.joinedDate}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal-100">
              <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-3">School Connection</div>
              <div className="text-sm text-charcoal-600 leading-relaxed">
                Originally listed on <a href="https://gorkhaschool.com" target="_blank" rel="noopener noreferrer" className="text-pine-600 hover:underline">gorkhaschool.com</a>.
                Profile claimed and connected to the Alumni Association platform.
              </div>
            </div>
          </div>
        )}

        {activeTab === "Current Life" && (
          <div className="space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-4">Career</div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-charcoal-100 rounded-lg flex items-center justify-center text-lg">💼</div>
                <div>
                  <div className="font-semibold text-charcoal text-sm">{profile.profession}</div>
                  {profile.employer && <div className="text-charcoal-400 text-xs mt-0.5">{profile.employer}</div>}
                  <div className="text-charcoal-400 text-xs">📍 {profile.city}, {profile.country}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal-100">
              <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-3">Privacy Notice</div>
              <div className="text-xs text-charcoal-400">
                Some information is visible only to registered alumni. Contact details are private by default.
              </div>
              {isOwnProfile && (
                <button onClick={() => navigate("settings")} className="mt-2 text-xs text-pine-600 hover:text-pine-800">
                  Manage privacy settings →
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "Community" && (
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-4">Recent Activity</div>
            <div className="text-sm text-charcoal-400 text-center py-8">
              <div className="text-2xl mb-2">◈</div>
              <div>No public posts yet.</div>
              {isOwnProfile && (
                <button onClick={() => navigate("community")} className="mt-3 text-pine-600 text-sm">
                  Go to Community →
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "Memories" && (
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-4">Shared Memories</div>
            <div className="text-sm text-charcoal-400 text-center py-8">
              <div className="text-2xl mb-2">◑</div>
              <div>No memories shared yet.</div>
              {isOwnProfile && (
                <button onClick={() => navigate("alumni-memories")} className="mt-3 text-pine-600 text-sm">
                  Share a Memory →
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Verify badge CTA */}
      {isOwnProfile && !profile.docVerified && (
        <div className="mt-6 p-5 bg-gold-50 border border-gold-200 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="text-gold-500 text-xl">⬡</div>
            <div>
              <div className="font-semibold text-charcoal text-sm mb-1">Get Document Verified</div>
              <p className="text-charcoal-400 text-xs mb-3">
                Upload a GUPS document (ID card, certificate, mark sheet) to receive the Verified Gorkhan badge. The document is only used for verification and never displayed.
              </p>
              <button className="px-4 py-2 bg-gold-500 text-charcoal font-semibold text-xs rounded hover:bg-gold-400 transition-colors">
                Upload Verification Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
