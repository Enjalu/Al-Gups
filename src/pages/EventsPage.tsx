import { useState } from "react";
import type { AppView } from "../types";
import { EVENTS } from "../data";

interface EventsPageProps {
  navigate: (view: AppView) => void;
  loggedIn?: boolean;
}

export default function EventsPage({ navigate, loggedIn }: EventsPageProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [confirmModal, setConfirmModal] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<string | null>(null);

  const filtered = EVENTS.filter((e) => e.type === activeTab);

  const handleRegister = (id: string) => {
    if (loggedIn) {
      setConfirmModal(id);
    } else {
      navigate("login");
    }
  };

  const confirmRegister = () => {
    if (confirmModal) {
      setRegisteredIds((prev) => [...prev, confirmModal]);
      setSuccessModal(confirmModal);
      setConfirmModal(null);
    }
  };

  const confirmEvent = EVENTS.find((e) => e.id === confirmModal);
  const successEvent = EVENTS.find((e) => e.id === successModal);

  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-white border-b border-charcoal-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">Calendar</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">Events</h1>
          <p className="text-charcoal-400 text-sm mt-1">Gatherings, reunions, and community events for Gorkhans.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-charcoal-100 p-1 rounded-lg w-fit">
          {(["upcoming", "past"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded text-sm font-medium capitalize transition-colors ${
                activeTab === tab ? "bg-white text-charcoal shadow-sm" : "text-charcoal-400 hover:text-charcoal"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-charcoal-400">
              <div className="text-3xl mb-3">◷</div>
              <div className="font-medium text-charcoal-600 mb-1">No {activeTab} events yet</div>
              <div className="text-sm">Check back later for updates.</div>
            </div>
          ) : filtered.map((event) => {
            const isRegistered = registeredIds.includes(event.id);
            return (
              <div key={event.id} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden hover:border-pine-200 transition-colors">
                <div className="h-2 bg-gradient-to-r from-pine-700 to-pine-500" />
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    {/* Date badge */}
                    <div className="shrink-0 w-20 text-center">
                      <div className="font-display text-3xl font-bold text-pine-700">
                        {event.dateBS.split(" ")[1]}
                      </div>
                      <div className="text-xs text-charcoal-400 mt-0.5">{event.dateBS.split(" ")[0]}</div>
                      <div className="text-xs text-charcoal-300">{event.dateBS.split(", ")[1]}</div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold text-charcoal mb-2">{event.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal-400 mb-3">
                        <div>📍 {event.location}</div>
                        <div>👤 Organizer: {event.organizer}</div>
                        <div>◉ {event.attendees} attending</div>
                      </div>
                      <p className="text-charcoal-600 text-sm leading-relaxed mb-4">{event.description}</p>
                      <div className="flex flex-wrap gap-3 items-center">
                        {event.type === "upcoming" && (
                          <button
                            onClick={() => handleRegister(event.id)}
                            disabled={isRegistered}
                            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                              isRegistered
                                ? "bg-pine-50 text-pine-700 border border-pine-200 cursor-default"
                                : "bg-pine-600 text-white hover:bg-pine-700"
                            }`}
                          >
                            {isRegistered ? "✓ Registered" : "Register for Event"}
                          </button>
                        )}
                        <div className="text-xs text-charcoal-300">
                          {event.dateBS} · {event.dateAD}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirm modal */}
      {confirmModal && confirmEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/40" onClick={() => setConfirmModal(null)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="font-display text-xl font-bold text-charcoal mb-2">Confirm Registration</h3>
            <p className="text-charcoal-400 text-sm mb-4">You are registering for:</p>
            <div className="p-4 bg-paper rounded-lg border border-charcoal-100 mb-6">
              <div className="font-semibold text-charcoal text-sm">{confirmEvent.title}</div>
              <div className="text-xs text-charcoal-400 mt-1">{confirmEvent.dateBS}</div>
              <div className="text-xs text-charcoal-400">📍 {confirmEvent.location}</div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmModal(null)} className="flex-1 py-2.5 border border-charcoal-200 rounded-lg text-sm text-charcoal">
                Cancel
              </button>
              <button onClick={confirmRegister} className="flex-1 py-2.5 bg-pine-600 text-white rounded-lg text-sm font-semibold">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success modal */}
      {successModal && successEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSuccessModal(null)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-14 h-14 bg-pine-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
            <h3 className="font-display text-xl font-bold text-charcoal mb-2">{"You're registered!"}</h3>
            <p className="text-charcoal-400 text-sm mb-4">
              We look forward to seeing you at <strong>{successEvent.title}</strong>.
            </p>
            <div className="text-xs text-charcoal-400 mb-6">{successEvent.dateBS} · {successEvent.location}</div>
            <button onClick={() => setSuccessModal(null)} className="w-full py-2.5 bg-pine-600 text-white rounded-lg text-sm font-semibold">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
