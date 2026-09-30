import { useState } from "react";
import type { AppView } from "../types";
import { CAMPAIGNS } from "../data";

interface FundraisingPageProps {
  navigate: (view: AppView) => void;
}

export default function FundraisingPage({ navigate }: FundraisingPageProps) {
  const [contributingId, setContributingId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [anon, setAnon] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleContribute = () => {
    if (!amount) return;
    setContributingId(null);
    setSuccessId(contributingId);
    setAmount("");
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <div className="font-display text-2xl font-bold text-charcoal mb-1">Fundraising</div>
        <p className="text-charcoal-400 text-sm">Support GUPS and the alumni community through transparent campaigns.</p>
        <div className="mt-2 text-xs text-charcoal-300 italic">Sample data — figures shown are for prototype purposes only.</div>
      </div>

      <div className="space-y-6">
        {CAMPAIGNS.map((campaign) => {
          const pct = Math.round((campaign.raisedAmount / campaign.targetAmount) * 100);
          const isSuccess = successId === campaign.id;

          return (
            <div key={campaign.id} className="bg-white rounded-xl border border-charcoal-100 p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-display text-lg font-bold text-charcoal">{campaign.title}</h3>
                <span className="px-2 py-1 bg-pine-50 text-pine-700 text-xs font-medium rounded border border-pine-100 shrink-0">Active</span>
              </div>

              <p className="text-charcoal-600 text-sm leading-relaxed mb-5">{campaign.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <div className="font-display text-2xl font-bold text-pine-700">
                      NPR {campaign.raisedAmount.toLocaleString()}
                    </div>
                    <div className="text-xs text-charcoal-400">raised of NPR {campaign.targetAmount.toLocaleString()} goal</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-charcoal text-xl">{pct}%</div>
                    <div className="text-xs text-charcoal-400">{campaign.contributorCount} contributors</div>
                  </div>
                </div>
                <div className="h-3 bg-charcoal-100 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-pine-700 to-pine-500 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-charcoal-400 mb-5">
                <div>👤 Organizer: {campaign.organizer}</div>
                <div>📅 Deadline: {campaign.deadline}</div>
              </div>

              {isSuccess ? (
                <div className="p-4 bg-pine-50 border border-pine-200 rounded-lg text-sm text-pine-800 font-medium">
                  ✓ Thank you for your contribution! Every rupee counts.
                </div>
              ) : contributingId === campaign.id ? (
                <div className="p-5 bg-paper rounded-lg border border-charcoal-100">
                  <div className="font-medium text-charcoal text-sm mb-3">Contribute to this campaign</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[500, 1000, 2500, 5000].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setAmount(preset.toString())}
                        className={`px-3 py-1.5 border rounded text-sm ${amount === preset.toString() ? "border-pine-600 bg-pine-50 text-pine-700" : "border-charcoal-200 text-charcoal"}`}
                      >
                        NPR {preset.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Or enter custom amount (NPR)"
                    className="w-full px-4 py-3 border border-charcoal-200 rounded-lg text-sm bg-white focus:outline-none focus:border-pine-500 mb-3"
                  />
                  <div className="flex items-center gap-2 mb-4">
                    <input type="checkbox" id={`anon-${campaign.id}`} checked={anon} onChange={(e) => setAnon(e.target.checked)} className="w-4 h-4 accent-pine-600" />
                    <label htmlFor={`anon-${campaign.id}`} className="text-sm text-charcoal">Contribute anonymously</label>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setContributingId(null)} className="flex-1 py-2.5 border border-charcoal-200 rounded-lg text-sm text-charcoal">Cancel</button>
                    <button onClick={handleContribute} disabled={!amount} className="flex-1 py-2.5 bg-pine-600 text-white rounded-lg text-sm font-semibold disabled:opacity-50">Contribute</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setContributingId(campaign.id)}
                  className="px-6 py-2.5 bg-gold-500 text-charcoal font-semibold rounded-lg text-sm hover:bg-gold-400 transition-colors"
                >
                  Contribute
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-5 bg-pine-50 border border-pine-100 rounded-xl text-sm text-charcoal-600">
        <div className="font-semibold text-pine-800 mb-1">Transparency Commitment</div>
        All funds raised through this platform are managed by the Alumni Association committee. Full accounts will be published after each campaign closes. For questions, contact <a href="mailto:alumnigups@gmail.com" className="text-pine-600 hover:underline">alumnigups@gmail.com</a>.
      </div>
    </div>
  );
}
