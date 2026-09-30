import { useState } from "react";
import Avatar from "../components/Avatar";
import type { AppView } from "../types";
import { PENDING_PROFILES, ALUMNI } from "../data";

interface AdminProfilesProps {
  navigate: (view: AppView) => void;
}

type ActionState = "idle" | "approve" | "reject" | "moreinfo";

export default function AdminProfiles({ navigate }: AdminProfilesProps) {
  const [reviewing, setReviewing] = useState<string | null>(null);
  const [actionState, setActionState] = useState<ActionState>("idle");
  const [actionDone, setActionDone] = useState<Record<string, string>>({});

  const reviewProfile = PENDING_PROFILES.find((p) => p.id === reviewing);
  const matchedAlumni = reviewing && reviewProfile
    ? ALUMNI.find((a) => a.name.toLowerCase().includes(reviewProfile.name.split(" ")[0].toLowerCase()))
    : null;

  const handleAction = (action: "approve" | "reject" | "moreinfo") => {
    if (!reviewing) return;
    setActionDone((prev) => ({ ...prev, [reviewing]: action }));
    setReviewing(null);
    setActionState("idle");
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-charcoal">Pending Profiles</h1>
        <p className="text-charcoal-400 text-sm">{PENDING_PROFILES.length} applications awaiting review.</p>
      </div>

      {!reviewing ? (
        <div className="bg-white rounded-xl border border-charcoal-100">
          <div className="px-6 py-4 border-b border-charcoal-100">
            <div className="grid grid-cols-5 text-xs font-semibold uppercase tracking-widest text-charcoal-400">
              <div className="col-span-2">Candidate</div>
              <div>Batch / Program</div>
              <div>Directory Match</div>
              <div>Action</div>
            </div>
          </div>
          <div className="divide-y divide-charcoal-50">
            {PENDING_PROFILES.map((profile) => {
              const done = actionDone[profile.id];
              return (
                <div key={profile.id} className="px-6 py-4 grid grid-cols-5 items-center gap-4">
                  <div className="col-span-2">
                    <div className="font-medium text-charcoal text-sm">{profile.name}</div>
                    <div className="text-charcoal-400 text-xs">{profile.country}</div>
                    <div className="text-charcoal-300 text-xs">{profile.submittedDate}</div>
                  </div>
                  <div className="text-sm text-charcoal-600">
                    <div className="font-medium">{profile.batch}</div>
                    <div className="text-xs text-charcoal-400">{profile.program}</div>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      profile.directoryMatch === "Possible match found"
                        ? "bg-gold-50 text-gold-700"
                        : "bg-charcoal-100 text-charcoal-500"
                    }`}>
                      {profile.directoryMatch === "Possible match found" ? "Match Found" : "No Match"}
                    </span>
                  </div>
                  <div>
                    {done ? (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        done === "approve" ? "bg-pine-50 text-pine-700" :
                        done === "reject" ? "bg-red-50 text-red-700" :
                        "bg-gold-50 text-gold-700"
                      }`}>
                        {done === "approve" ? "Approved" : done === "reject" ? "Rejected" : "Requested Info"}
                      </span>
                    ) : (
                      <button
                        onClick={() => setReviewing(profile.id)}
                        className="px-3 py-1.5 bg-pine-600 text-white rounded text-xs font-semibold hover:bg-pine-700 transition-colors"
                      >
                        Review
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : reviewProfile ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Candidate info */}
          <div>
            <div className="bg-white rounded-xl border border-charcoal-100 p-6 mb-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-4">Candidate</div>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 bg-charcoal-100 rounded-full flex items-center justify-center text-xl font-bold text-charcoal-400">
                  {reviewProfile.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-display text-xl font-bold text-charcoal">{reviewProfile.name}</div>
                  <div className="text-charcoal-400 text-sm">{reviewProfile.batch} · {reviewProfile.program}</div>
                  <div className="text-charcoal-400 text-xs mt-1">📍 {reviewProfile.country}</div>
                </div>
              </div>
              <div className="text-xs text-charcoal-400 mb-4">
                Submitted: {reviewProfile.submittedDate}
              </div>

              <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-3">Verification Evidence</div>
              <div className="space-y-2">
                {reviewProfile.evidence.map((ev, i) => (
                  <div key={i} className={`flex items-start gap-2 text-sm ${i === 0 ? "text-pine-700" : "text-charcoal-600"}`}>
                    <span className="shrink-0">{i === 0 ? "✓" : "·"}</span>
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-charcoal-100 p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-4">Admin Decision</div>
              <div className="space-y-3">
                <button
                  onClick={() => handleAction("approve")}
                  className="w-full py-3 bg-pine-600 text-white rounded-lg font-semibold text-sm hover:bg-pine-700 transition-colors"
                >
                  ✓ Approve Profile
                </button>
                <button
                  onClick={() => handleAction("moreinfo")}
                  className="w-full py-3 border border-gold-400 text-gold-700 rounded-lg font-semibold text-sm hover:bg-gold-50 transition-colors"
                >
                  ◐ Request More Information
                </button>
                <button
                  onClick={() => handleAction("reject")}
                  className="w-full py-3 border border-red-300 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-50 transition-colors"
                >
                  ✕ Reject Application
                </button>
                <button
                  onClick={() => setReviewing(null)}
                  className="w-full py-2 text-charcoal-400 text-sm hover:text-charcoal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Directory match */}
          <div>
            <div className="bg-white rounded-xl border border-charcoal-100 p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-4">Directory Match</div>
              <div className={`p-3 rounded text-xs font-medium mb-4 ${
                reviewProfile.directoryMatch === "Possible match found"
                  ? "bg-gold-50 text-gold-700 border border-gold-200"
                  : "bg-charcoal-100 text-charcoal-500"
              }`}>
                {reviewProfile.directoryMatch}
              </div>
              {matchedAlumni ? (
                <div className="p-4 border border-charcoal-200 rounded-lg">
                  <div className="text-xs text-charcoal-400 mb-3">Matching entry in GUPS directory:</div>
                  <div className="flex items-start gap-3">
                    <Avatar initials={matchedAlumni.initials} color={matchedAlumni.color} size="md" />
                    <div>
                      <div className="font-semibold text-charcoal text-sm">{matchedAlumni.name}</div>
                      <div className="text-charcoal-400 text-xs">{matchedAlumni.batchBS} · {matchedAlumni.program}</div>
                      <div className="text-charcoal-400 text-xs">{matchedAlumni.country}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-charcoal-400">
                    This entry was found in the gorkhaschool.com alumni directory and appears to match the candidate.
                  </div>
                </div>
              ) : (
                <div className="p-4 border border-charcoal-200 rounded-lg text-sm text-charcoal-400">
                  No matching entry found in the GUPS directory. This may be a recently graduated student or someone not yet listed.
                </div>
              )}

              <div className="mt-5 p-4 bg-paper rounded-lg border border-charcoal-100">
                <div className="text-xs font-semibold text-charcoal mb-2">Admin Notes</div>
                <textarea
                  placeholder="Add notes for this review (internal only)…"
                  rows={3}
                  className="w-full px-3 py-2 border border-charcoal-200 rounded text-sm bg-white focus:outline-none focus:border-pine-400 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
