import { useState } from "react";
import type { AppView } from "../types";
import { NOTIFICATIONS } from "../data";
import type { Notification } from "../types";

interface NotificationsPageProps {
  navigate: (view: AppView) => void;
}

const TYPE_ICON: Record<Notification["type"], string> = {
  account: "👤",
  event: "📅",
  community: "💬",
  batch: "♦",
  admin: "⚙",
};

const TYPE_BG: Record<Notification["type"], string> = {
  account: "bg-pine-50 text-pine-700",
  event: "bg-gold-50 text-gold-700",
  community: "bg-blue-50 text-blue-700",
  batch: "bg-purple-50 text-purple-700",
  admin: "bg-charcoal-100 text-charcoal-600",
};

const CATEGORIES = ["All", "Account", "Events", "Community", "Batch", "Admin"];

export default function NotificationsPage({ navigate }: NotificationsPageProps) {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? notifs
    : notifs.filter((n) => n.type === activeCategory.toLowerCase());

  const markAllRead = () => setNotifs((n) => n.map((item) => ({ ...item, read: true })));
  const markRead = (id: string) => setNotifs((n) => n.map((item) => item.id === id ? { ...item, read: true } : item));

  const unread = notifs.filter((n) => !n.read).length;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-display text-2xl font-bold text-charcoal mb-1">Notifications</div>
          {unread > 0 && <div className="text-charcoal-400 text-sm">{unread} unread</div>}
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-pine-600 text-sm font-medium hover:text-pine-800">
            Mark all as read
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${
              activeCategory === cat
                ? "bg-pine-600 text-white border-pine-600"
                : "bg-white text-charcoal-600 border-charcoal-200 hover:border-pine-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="bg-white rounded-xl border border-charcoal-100 divide-y divide-charcoal-50">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-charcoal-400">
            <div className="text-3xl mb-2">🔔</div>
            <div className="font-medium text-charcoal-600">No notifications</div>
          </div>
        ) : filtered.map((notif) => (
          <button
            key={notif.id}
            onClick={() => markRead(notif.id)}
            className={`flex items-start gap-4 w-full px-5 py-4 text-left hover:bg-paper transition-colors ${
              !notif.read ? "bg-pine-50/30" : ""
            }`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 ${TYPE_BG[notif.type]}`}>
              {TYPE_ICON[notif.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-relaxed ${!notif.read ? "text-charcoal font-medium" : "text-charcoal-600"}`}>
                {notif.message}
              </p>
              <div className="text-xs text-charcoal-300 mt-1">{notif.time}</div>
            </div>
            {!notif.read && (
              <div className="w-2 h-2 rounded-full bg-pine-500 shrink-0 mt-2" />
            )}
          </button>
        ))}
      </div>

      {/* Digest preview */}
      <div className="mt-8 bg-pine-900 rounded-xl p-6 text-white">
        <div className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">Gorkhan Monthly Digest</div>
        <h3 className="font-display text-lg font-bold mb-3">Your Gorkhan Monthly — Mangsir 2083</h3>
        <div className="space-y-2 text-sm text-pine-200 mb-5">
          <div>→ 3 new Gorkhans joined this month</div>
          <div>→ 1 upcoming event</div>
          <div>→ 2 new batch updates</div>
          <div>→ 5 new opportunities</div>
        </div>
        <button
          onClick={() => navigate("community")}
          className="px-5 py-2.5 bg-gold-500 text-charcoal font-semibold text-sm rounded hover:bg-gold-400 transition-colors"
        >
          Visit Gorkhan Community
        </button>
      </div>
    </div>
  );
}
