import { useState } from "react";
import type { AppView } from "../types";

interface SettingsPageProps {
  navigate: (view: AppView) => void;
  onLogout: () => void;
}

const SECTIONS = ["Account", "Privacy", "Notifications", "Security", "Danger Zone"];

export default function SettingsPage({ navigate, onLogout }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState("Account");
  const [saved, setSaved] = useState(false);
  const [privacy, setPrivacy] = useState({ city: "alumni", profession: "alumni", phone: "private", email: "private" });
  const [notifs, setNotifs] = useState({ emailDigest: true, eventReminders: true, batchActivity: true, communityActivity: false });
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const selectClass = "px-3 py-1.5 border border-charcoal-200 rounded text-sm bg-white focus:outline-none focus:border-pine-400";
  const inputClass = "w-full px-4 py-3 border border-charcoal-200 rounded-lg text-sm bg-white focus:outline-none focus:border-pine-500 transition-colors";

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <div className="font-display text-2xl font-bold text-charcoal mb-1">Settings</div>
        <p className="text-charcoal-400 text-sm">Manage your account preferences and privacy.</p>
      </div>

      {saved && (
        <div className="mb-5 px-4 py-3 bg-pine-50 border border-pine-200 text-pine-700 text-sm rounded-lg">
          ✓ Settings saved successfully.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section nav */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-xl border border-charcoal-100 p-2 space-y-0.5">
            {SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  activeSection === section
                    ? "bg-pine-600 text-white font-medium"
                    : section === "Danger Zone"
                    ? "text-red-500 hover:bg-red-50"
                    : "text-charcoal-600 hover:bg-pine-50 hover:text-pine-700"
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
        </div>

        {/* Section content */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-charcoal-100 p-6">
          {activeSection === "Account" && (
            <div className="space-y-5">
              <div className="font-display text-lg font-semibold text-charcoal mb-5">Account Settings</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Full Name</label>
                  <input type="text" defaultValue="Suman Giri" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Email</label>
                  <input type="email" defaultValue="suman@example.com" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Phone</label>
                  <input type="tel" defaultValue="+977 984 xxxxxxxx" className={inputClass} />
                </div>
              </div>
              <button onClick={handleSave} className="px-6 py-2.5 bg-pine-600 text-white rounded-lg text-sm font-semibold hover:bg-pine-700 transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {activeSection === "Privacy" && (
            <div>
              <div className="font-display text-lg font-semibold text-charcoal mb-2">Privacy Settings</div>
              <p className="text-charcoal-400 text-sm mb-6">Control who can see each part of your profile.</p>

              <div className="p-4 bg-paper rounded-lg border border-charcoal-100 mb-5">
                <div className="text-xs font-semibold text-charcoal mb-2">Always Public</div>
                <div className="text-xs text-charcoal-400 space-y-1">
                  <div>• Name · Batch · Program · Profile Photo · Country</div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: "city", label: "City / Location" },
                  { key: "profession", label: "Profession & Employer" },
                  { key: "phone", label: "Phone Number" },
                  { key: "email", label: "Email Address" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-charcoal-100">
                    <div className="text-sm font-medium text-charcoal">{item.label}</div>
                    <select
                      value={privacy[item.key as keyof typeof privacy]}
                      onChange={(e) => setPrivacy({ ...privacy, [item.key]: e.target.value })}
                      className={selectClass}
                    >
                      <option value="public">Public</option>
                      <option value="alumni">Alumni only</option>
                      <option value="private">Only me</option>
                    </select>
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className="mt-5 px-6 py-2.5 bg-pine-600 text-white rounded-lg text-sm font-semibold hover:bg-pine-700 transition-colors">
                Save Privacy Settings
              </button>
            </div>
          )}

          {activeSection === "Notifications" && (
            <div>
              <div className="font-display text-lg font-semibold text-charcoal mb-2">Notification Preferences</div>
              <p className="text-charcoal-400 text-sm mb-6">{"Choose what keeps you connected without overwhelming your inbox."}</p>

              <div className="space-y-4">
                {[
                  { key: "emailDigest", label: "Gorkhan Monthly Digest", desc: "Monthly roundup of new members, events, and community updates." },
                  { key: "eventReminders", label: "Event Reminders", desc: "Notified 1 week before events you have registered for." },
                  { key: "batchActivity", label: "Batch Activity", desc: "When someone from your batch joins or posts." },
                  { key: "communityActivity", label: "Community Interactions", desc: "When someone likes or comments on your posts." },
                ].map((item) => (
                  <div key={item.key} className="flex items-start gap-3 py-3 border-b border-charcoal-100">
                    <input
                      type="checkbox"
                      id={item.key}
                      checked={notifs[item.key as keyof typeof notifs]}
                      onChange={(e) => setNotifs({ ...notifs, [item.key]: e.target.checked })}
                      className="w-4 h-4 accent-pine-600 mt-0.5"
                    />
                    <label htmlFor={item.key} className="cursor-pointer">
                      <div className="text-sm font-medium text-charcoal">{item.label}</div>
                      <div className="text-xs text-charcoal-400 mt-0.5">{item.desc}</div>
                    </label>
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className="mt-5 px-6 py-2.5 bg-pine-600 text-white rounded-lg text-sm font-semibold hover:bg-pine-700 transition-colors">
                Save Preferences
              </button>
            </div>
          )}

          {activeSection === "Security" && (
            <div>
              <div className="font-display text-lg font-semibold text-charcoal mb-6">Security</div>
              <div className="space-y-4">
                <div className="p-4 bg-white border border-charcoal-100 rounded-lg">
                  <div className="font-medium text-charcoal text-sm mb-1">Change Password</div>
                  <div className="space-y-3 mt-3">
                    <input type="password" placeholder="Current password" className={inputClass} />
                    <input type="password" placeholder="New password" className={inputClass} />
                    <input type="password" placeholder="Confirm new password" className={inputClass} />
                    <button className="px-5 py-2 bg-pine-600 text-white rounded-lg text-sm font-semibold">Update Password</button>
                  </div>
                </div>
                <div className="p-4 bg-white border border-charcoal-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-charcoal text-sm">Two-Factor Authentication</div>
                      <div className="text-charcoal-400 text-xs mt-0.5">Coming soon — extra security for your account.</div>
                    </div>
                    <span className="px-2 py-1 bg-charcoal-100 text-charcoal-400 text-xs rounded">Coming Soon</span>
                  </div>
                </div>
                <div className="p-4 bg-white border border-charcoal-100 rounded-lg">
                  <div className="font-medium text-charcoal text-sm mb-1">Active Sessions</div>
                  <div className="text-charcoal-400 text-xs">Current session · Chrome, Australia · Active now</div>
                  <button className="mt-2 text-xs text-red-500 hover:text-red-700">Sign out all other sessions</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Danger Zone" && (
            <div>
              <div className="font-display text-lg font-semibold text-red-600 mb-6">Danger Zone</div>
              <div className="space-y-4">
                <div className="p-4 border border-charcoal-200 rounded-lg">
                  <div className="font-medium text-charcoal text-sm mb-1">Deactivate Account</div>
                  <div className="text-charcoal-400 text-xs mb-3">Your profile will be hidden from the directory. You can reactivate at any time.</div>
                  <button className="px-4 py-2 border border-charcoal-300 text-charcoal-600 rounded text-sm hover:bg-paper transition-colors">Deactivate Account</button>
                </div>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <div className="font-medium text-red-700 text-sm mb-1">Delete Account</div>
                  <div className="text-red-500 text-xs mb-3">Permanently delete your account and all associated data. This cannot be undone.</div>
                  {!deleteConfirm ? (
                    <button onClick={() => setDeleteConfirm(true)} className="px-4 py-2 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-700">
                      Delete My Account
                    </button>
                  ) : (
                    <div>
                      <p className="text-red-600 text-sm font-medium mb-3">Are you absolutely sure? This is permanent.</p>
                      <div className="flex gap-3">
                        <button onClick={() => setDeleteConfirm(false)} className="px-4 py-2 border border-charcoal-300 text-charcoal rounded text-sm">Cancel</button>
                        <button onClick={() => { onLogout(); }} className="px-4 py-2 bg-red-600 text-white rounded text-sm font-semibold">Yes, Delete Account</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
