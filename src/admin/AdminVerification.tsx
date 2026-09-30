import { useState } from "react";
import Avatar from "../components/Avatar";
import type { AppView } from "../types";
import { ALUMNI } from "../data";

interface AdminVerificationProps {
  navigate: (view: AppView) => void;
}

export default function AdminVerification({ navigate }: AdminVerificationProps) {
  const [tab, setTab] = useState<"pending" | "verified">("pending");

  const unverified = ALUMNI.filter((a) => a.verified && !a.docVerified && a.status === "approved");
  const verified = ALUMNI.filter((a) => a.docVerified && a.status === "approved");
  const displayed = tab === "pending" ? unverified : verified;

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-charcoal">Document Verification</h1>
        <p className="text-charcoal-400 text-sm">Review documents submitted for Verified Gorkhan badges.</p>
      </div>

      <div className="flex gap-1 bg-charcoal-100 p-1 rounded-lg w-fit mb-6">
        <button onClick={() => setTab("pending")} className={`px-5 py-2 rounded text-sm font-medium transition-colors ${tab === "pending" ? "bg-white text-charcoal shadow-sm" : "text-charcoal-400"}`}>
          Awaiting Review ({unverified.length})
        </button>
        <button onClick={() => setTab("verified")} className={`px-5 py-2 rounded text-sm font-medium transition-colors ${tab === "verified" ? "bg-white text-charcoal shadow-sm" : "text-charcoal-400"}`}>
          Document Verified ({verified.length})
        </button>
      </div>

      <div className="bg-white rounded-xl border border-charcoal-100">
        {displayed.length === 0 ? (
          <div className="text-center py-20 text-charcoal-400">
            <div className="text-3xl mb-2">⬡</div>
            <div className="font-medium text-charcoal-600">No {tab === "pending" ? "pending" : "verified"} documents</div>
          </div>
        ) : (
          <div className="divide-y divide-charcoal-50">
            {displayed.map((member) => (
              <div key={member.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={member.initials} color={member.color} size="md" />
                  <div>
                    <div className="font-medium text-charcoal text-sm">{member.name}</div>
                    <div className="text-charcoal-400 text-xs">{member.batchBS} · {member.program}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {tab === "verified" ? (
                    <span className="px-2.5 py-1 bg-gold-50 text-gold-700 text-xs font-semibold rounded border border-gold-200">⬡ Document Verified</span>
                  ) : (
                    <>
                      <span className="px-2 py-1 bg-charcoal-100 text-charcoal-500 text-xs rounded">Document Submitted</span>
                      <button className="px-3 py-1.5 bg-pine-600 text-white rounded text-xs font-semibold hover:bg-pine-700">Review Document</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-5 bg-pine-50 border border-pine-100 rounded-xl text-sm text-charcoal-600">
        <div className="font-semibold text-pine-800 mb-1">Document Privacy Notice</div>
        Documents submitted for verification are stored securely and reviewed only by authorized administrators. They are never displayed publicly and will not be retained permanently after the verification decision.
      </div>
    </div>
  );
}
