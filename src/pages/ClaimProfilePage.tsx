import { useState } from "react";
import Seal from "../components/Seal";
import Avatar from "../components/Avatar";
import type { AppView } from "../types";
import { ALUMNI } from "../data";

interface ClaimProfilePageProps {
  navigate: (view: AppView) => void;
  onLogin: (role: "alumni") => void;
}

type ClaimStep = "choose" | "search" | "found" | "verify" | "success" | "new";

export default function ClaimProfilePage({ navigate, onLogin }: ClaimProfilePageProps) {
  const [claimStep, setClaimStep] = useState<ClaimStep>("choose");
  const [searchName, setSearchName] = useState("");
  const [foundProfile, setFoundProfile] = useState<(typeof ALUMNI)[0] | null>(null);
  const [docType, setDocType] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleSearch = () => {
    const match = ALUMNI.find((a) => a.name.toLowerCase().includes(searchName.toLowerCase()));
    setFoundProfile(match || null);
    setClaimStep("found");
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setClaimStep("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Seal size={52} className="mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-charcoal">
            {claimStep === "success" ? "Profile Connected!" : "Claim Your Profile"}
          </h1>
          <p className="text-charcoal-400 text-sm mt-2">
            Already listed on gorkhaschool.com? Connect your existing entry to this platform.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-charcoal-100 p-8">
          {claimStep === "choose" && (
            <div className="space-y-4">
              <div className="text-sm text-charcoal font-medium mb-4">Are you already listed on the GUPS website?</div>
              <button
                onClick={() => setClaimStep("search")}
                className="w-full p-5 border-2 border-pine-200 hover:border-pine-500 rounded-lg text-left transition-all group"
              >
                <div className="font-semibold text-charcoal group-hover:text-pine-700">🔍 Find My Profile</div>
                <div className="text-sm text-charcoal-400 mt-1">Search the existing GUPS alumni directory</div>
              </button>
              <button
                onClick={() => navigate("register")}
                className="w-full p-5 border-2 border-charcoal-100 hover:border-pine-300 rounded-lg text-left transition-all group"
              >
                <div className="font-semibold text-charcoal group-hover:text-pine-700">✏️ {"I'm not listed — Register as new alumnus"}</div>
                <div className="text-sm text-charcoal-400 mt-1">Create a brand new alumni profile</div>
              </button>
            </div>
          )}

          {claimStep === "search" && (
            <div className="space-y-5">
              <button onClick={() => setClaimStep("choose")} className="text-sm text-charcoal-400 hover:text-charcoal">← Back</button>
              <div className="font-display text-lg font-semibold text-charcoal">Search Your Name</div>
              <p className="text-sm text-charcoal-400">Enter your name as it would appear in the GUPS alumni directory.</p>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Suman Giri"
                className="w-full px-4 py-3 border border-charcoal-200 rounded-lg text-sm bg-white focus:outline-none focus:border-pine-500"
                onKeyDown={(e) => e.key === "Enter" && searchName.trim() && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={!searchName.trim()}
                className="w-full py-3 bg-pine-600 text-white rounded-lg font-semibold text-sm hover:bg-pine-700 disabled:opacity-50 transition-colors"
              >
                Search Directory
              </button>
            </div>
          )}

          {claimStep === "found" && (
            <div className="space-y-5">
              <button onClick={() => setClaimStep("search")} className="text-sm text-charcoal-400 hover:text-charcoal">← Back to search</button>
              {foundProfile ? (
                <>
                  <div className="p-3 bg-gold-50 border border-gold-200 rounded text-sm text-gold-800 font-medium">
                    ◐ Possible profile found
                  </div>
                  <div className="p-4 border border-charcoal-200 rounded-lg flex items-start gap-4">
                    <Avatar initials={foundProfile.initials} color={foundProfile.color} size="lg" />
                    <div>
                      <div className="font-semibold text-charcoal">{foundProfile.name}</div>
                      <div className="text-charcoal-400 text-xs mt-1">{foundProfile.batchBS} · {foundProfile.program}</div>
                      <div className="text-charcoal-400 text-xs">{foundProfile.country}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setClaimStep("verify")}
                      className="flex-1 py-3 bg-pine-600 text-white rounded-lg font-semibold text-sm hover:bg-pine-700 transition-colors"
                    >
                      This is me →
                    </button>
                    <button
                      onClick={() => { setSearchName(""); setClaimStep("search"); }}
                      className="flex-1 py-3 border border-charcoal-200 text-charcoal-600 rounded-lg font-medium text-sm hover:bg-paper transition-colors"
                    >
                      Not me
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center py-8">
                    <div className="text-3xl mb-3">◎</div>
                    <div className="font-medium text-charcoal mb-2">No matching profile found</div>
                    <div className="text-sm text-charcoal-400 mb-6">
                      No entry matching "{searchName}" was found in the GUPS directory.
                    </div>
                    <div className="flex flex-col gap-3">
                      <button onClick={() => setClaimStep("search")} className="py-2.5 border border-charcoal-200 rounded-lg text-sm text-charcoal">
                        Try a different name
                      </button>
                      <button onClick={() => navigate("register")} className="py-2.5 bg-pine-600 text-white rounded-lg text-sm font-semibold">
                        Register as new alumnus
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {claimStep === "verify" && (
            <div className="space-y-5">
              <button onClick={() => setClaimStep("found")} className="text-sm text-charcoal-400 hover:text-charcoal">← Back</button>
              <div className="font-display text-lg font-semibold text-charcoal">Verify Your Identity</div>
              <p className="text-sm text-charcoal-400">Upload a document to confirm your connection to GUPS. This is used only for verification and will never appear publicly.</p>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-2">Document Type</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full px-4 py-3 border border-charcoal-200 rounded-lg text-sm bg-white focus:outline-none focus:border-pine-500"
                >
                  <option value="">Select document type</option>
                  <option>GUPS Student ID Card</option>
                  <option>School Certificate / Transcript</option>
                  <option>Mark Sheet</option>
                  <option>Other GUPS-issued document</option>
                </select>
              </div>
              <div className="border-2 border-dashed border-charcoal-200 rounded-lg p-6 text-center hover:border-pine-400 cursor-pointer transition-colors">
                <div className="text-2xl mb-2">📎</div>
                <div className="text-sm text-charcoal-400">Upload document</div>
                <div className="text-xs text-charcoal-300 mt-1">JPG, PNG, or PDF up to 10MB</div>
              </div>
              <div className="p-3 bg-pine-50 border border-pine-100 rounded text-xs text-pine-700">
                🔒 Your document is reviewed only by association administrators and will not be stored permanently or shown publicly.
              </div>
              <button
                onClick={handleVerify}
                disabled={!docType || verifying}
                className="w-full py-3 bg-pine-600 text-white rounded-lg font-semibold text-sm hover:bg-pine-700 disabled:opacity-50 transition-colors"
              >
                {verifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting…
                  </span>
                ) : "Submit Claim"}
              </button>
            </div>
          )}

          {claimStep === "success" && (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-pine-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
              <h3 className="font-display text-xl font-bold text-charcoal mb-2">Claim Submitted!</h3>
              <p className="text-sm text-charcoal-400 mb-6">
                Your existing GUPS alumni profile has been linked to your claim. The association team will verify and connect it shortly.
              </p>
              <div className="p-4 bg-gold-50 border border-gold-200 rounded-lg text-xs text-gold-800 text-left mb-6">
                <div className="font-semibold mb-1">Verification Status: Pending</div>
                <div>You will be notified once your claim is reviewed and approved.</div>
              </div>
              <button
                onClick={() => onLogin("alumni")}
                className="w-full py-3 bg-pine-600 text-white rounded-lg font-semibold hover:bg-pine-700 transition-colors"
              >
                Continue to Dashboard
              </button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-charcoal-400">
          {"Need help? Contact us at "}
          <a href="mailto:alumnigups@gmail.com" className="text-pine-600 hover:underline">alumnigups@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
