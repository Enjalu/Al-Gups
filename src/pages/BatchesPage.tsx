import Avatar from "../components/Avatar";
import type { AppView } from "../types";
import { BATCHES, ALUMNI } from "../data";

interface BatchesPageProps {
  navigate: (view: AppView) => void;
}

export default function BatchesPage({ navigate }: BatchesPageProps) {
  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-white border-b border-charcoal-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">Academic History</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">Batch Directory</h1>
          <p className="text-charcoal-400 text-sm mt-1">Browse Gorkhans by their GUPS graduation batch.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BATCHES.map((batch) => {
            const members = ALUMNI.filter((a) => a.batchBS === batch.yearBS && a.status === "approved");
            return (
              <button
                key={batch.id}
                onClick={() => navigate("batch-detail")}
                className="group text-left p-6 bg-white border border-charcoal-100 rounded-xl hover:border-pine-400 hover:shadow-md transition-all relative overflow-hidden"
              >
                {/* Corner rule decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 border-t-2 border-r-2 border-gold-300 w-10 h-10" />
                </div>

                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="font-display text-3xl font-bold text-pine-700 group-hover:text-pine-600 transition-colors">
                      {batch.yearBS}
                    </div>
                    <div className="text-charcoal-400 text-xs mt-1">{batch.yearAD}</div>
                  </div>
                  <span className="px-2.5 py-1 bg-pine-50 text-pine-700 text-xs font-semibold rounded border border-pine-100">
                    {batch.program}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-charcoal-400 mb-2">{batch.memberCount} registered Gorkhans</div>
                  {members.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {members.slice(0, 5).map((m) => (
                          <Avatar key={m.id} initials={m.initials} color={m.color} size="xs" className="border-2 border-white" />
                        ))}
                        {batch.memberCount > 5 && (
                          <div className="w-6 h-6 rounded-full bg-charcoal-100 border-2 border-white flex items-center justify-center text-[9px] text-charcoal-400">
                            +{batch.memberCount - 5}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-charcoal-300 italic">No members in directory yet</div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-charcoal-100">
                  <div className="text-xs text-charcoal-400">
                    GUPS, Kohalpur-2
                  </div>
                  <div className="text-pine-600 text-sm font-medium group-hover:text-pine-800 transition-colors">
                    View Batch →
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-pine-50 rounded-xl border border-pine-100 text-center">
          <div className="font-display text-lg font-semibold text-pine-800 mb-2">{"Don't see your batch?"}</div>
          <p className="text-charcoal-400 text-sm mb-4">
            Register as an alumnus and help us grow the batch directory. Every Gorkhan matters.
          </p>
          <button onClick={() => navigate("register")} className="px-6 py-2.5 bg-pine-600 text-white rounded-lg font-semibold text-sm hover:bg-pine-700 transition-colors">
            Join the Alumni Association
          </button>
        </div>
      </div>
    </div>
  );
}
