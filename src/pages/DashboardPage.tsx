import Avatar from "../components/Avatar";
import type { AppView } from "../types";
import { ALUMNI, BATCHES, EVENTS, COMMUNITY_POSTS, NOTIFICATIONS } from "../data";

interface DashboardPageProps {
  navigate: (view: AppView) => void;
}

export default function DashboardPage({ navigate }: DashboardPageProps) {
  const myBatch = BATCHES.find((b) => b.id === "2076");
  const batchMembers = ALUMNI.filter((a) => a.batchBS === "2076 B.S." && a.status === "approved");
  const upcomingEvents = EVENTS.filter((e) => e.type === "upcoming");
  const unreadNotifs = NOTIFICATIONS.filter((n) => !n.read).length;
  const recentPosts = COMMUNITY_POSTS.slice(0, 2);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      {/* Welcome */}
      <div className="mb-8">
        <div className="text-charcoal-400 text-sm mb-1">Good morning,</div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Suman.</h1>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "My Batch", value: myBatch?.memberCount.toString() ?? "0", sub: "2076 B.S. SEE", action: () => navigate("my-batch"), color: "bg-pine-50 border-pine-100" },
          { label: "Upcoming Event", value: upcomingEvents.length.toString(), sub: "next in 3 weeks", action: () => navigate("alumni-events"), color: "bg-gold-50 border-gold-100" },
          { label: "Notifications", value: unreadNotifs.toString(), sub: "unread", action: () => navigate("notifications"), color: "bg-white border-charcoal-100" },
          { label: "Gorkhans", value: "98", sub: "registered total", action: () => navigate("alumni-directory"), color: "bg-white border-charcoal-100" },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={stat.action}
            className={`p-5 rounded-xl border ${stat.color} text-left hover:shadow-md transition-all group`}
          >
            <div className="font-display text-3xl font-bold text-charcoal group-hover:text-pine-700 transition-colors">{stat.value}</div>
            <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mt-1">{stat.label}</div>
            <div className="text-xs text-charcoal-300 mt-0.5">{stat.sub}</div>
          </button>
        ))}
      </div>

      {/* Profile completeness */}
      <div className="mb-8 p-5 bg-white rounded-xl border border-charcoal-100">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium text-charcoal text-sm">Profile Completeness</div>
          <button onClick={() => navigate("profile")} className="text-pine-600 text-xs font-medium hover:text-pine-800">Edit Profile →</button>
        </div>
        <div className="h-2 bg-charcoal-100 rounded-full mb-2">
          <div className="h-2 bg-pine-500 rounded-full" style={{ width: "72%" }} />
        </div>
        <div className="flex justify-between text-xs text-charcoal-400">
          <span>72% complete</span>
          <span>Add a profile photo to complete</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-gold-50 text-gold-700 text-xs rounded border border-gold-200">Association Approved ✓</span>
          <span className="px-2 py-0.5 bg-charcoal-100 text-charcoal-400 text-xs rounded">Document Verification: Pending</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batch section */}
        <div className="bg-white rounded-xl border border-charcoal-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-display font-semibold text-charcoal">My Batch</div>
              <div className="text-charcoal-400 text-xs mt-0.5">{myBatch?.yearBS} · {myBatch?.program}</div>
            </div>
            <button onClick={() => navigate("my-batch")} className="text-pine-600 text-xs font-medium hover:text-pine-800">View all →</button>
          </div>
          <div className="space-y-3">
            {batchMembers.slice(0, 4).map((member) => (
              <button
                key={member.id}
                onClick={() => navigate("profile")}
                className="flex items-center gap-3 w-full group"
              >
                <Avatar initials={member.initials} color={member.color} size="sm" />
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-medium text-charcoal group-hover:text-pine-700 truncate">{member.name}</div>
                  <div className="text-xs text-charcoal-400 truncate">{member.country} · {member.profession}</div>
                </div>
                {member.verified && (
                  <span className="text-gold-500 text-xs shrink-0">✓</span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-charcoal-100 flex -space-x-2">
            {batchMembers.map((m) => (
              <Avatar key={m.id} initials={m.initials} color={m.color} size="xs" className="border-2 border-white" />
            ))}
            <div className="w-6 h-6 rounded-full bg-charcoal-100 border-2 border-white flex items-center justify-center text-[10px] text-charcoal-400">
              +{Math.max(0, (myBatch?.memberCount ?? 0) - batchMembers.length)}
            </div>
          </div>
        </div>

        {/* Events */}
        <div className="bg-white rounded-xl border border-charcoal-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-display font-semibold text-charcoal">Upcoming Events</div>
            <button onClick={() => navigate("alumni-events")} className="text-pine-600 text-xs font-medium hover:text-pine-800">All Events →</button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => navigate("alumni-events")}
                className="w-full text-left p-4 bg-paper rounded-lg border border-charcoal-100 hover:border-pine-300 transition-colors group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-sm font-semibold text-charcoal group-hover:text-pine-700 leading-snug">{event.title}</div>
                </div>
                <div className="text-xs text-charcoal-400">
                  <div className="font-medium text-charcoal-600">{event.dateBS}</div>
                  <div className="text-charcoal-300">{event.dateAD}</div>
                  <div className="mt-1">📍 {event.location}</div>
                </div>
                <div className="mt-2 text-xs text-pine-600 font-medium">Register →</div>
              </button>
            ))}
          </div>
        </div>

        {/* Community posts */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-charcoal-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-display font-semibold text-charcoal">Community Feed</div>
            <button onClick={() => navigate("community")} className="text-pine-600 text-xs font-medium hover:text-pine-800">Go to Community →</button>
          </div>
          <div className="space-y-5">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex gap-3">
                <Avatar initials={post.authorInitials} color={post.authorColor} size="sm" className="shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-charcoal">{post.author}</span>
                    <span className="text-xs text-charcoal-300">{post.time}</span>
                  </div>
                  <p className="text-sm text-charcoal-600 leading-relaxed">{post.content}</p>
                  <div className="flex gap-4 mt-2">
                    <button className="text-xs text-charcoal-400 hover:text-pine-600">♥ {post.likes}</button>
                    <button className="text-xs text-charcoal-400 hover:text-pine-600">💬 {post.comments}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
