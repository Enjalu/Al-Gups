import { useState } from "react";
import Avatar from "../components/Avatar";
import type { AppView } from "../types";
import { ALUMNI } from "../data";

interface BatchDetailPageProps {
  navigate: (view: AppView) => void;
}

const BATCH_IMG = "https://images.unsplash.com/photo-1724222808004-42d0dbc5fc59?w=900&h=400&fit=crop&auto=format";

const BATCH_POSTS = [
  { id: "1", author: "Suman Giri", initials: "SG", color: "#2B5F3A", content: "Anyone from 2076 B.S. planning to attend the December gathering? Let's coordinate!", time: "2 days ago", likes: 8 },
  { id: "2", author: "Dipika Rana", initials: "DR", color: "#234D33", content: "Reconnecting with this batch means the world. Graduated the same year and ended up in completely different corners of the world. GUPS is home.", time: "1 week ago", likes: 14 },
];

export default function BatchDetailPage({ navigate }: BatchDetailPageProps) {
  const [activeTab, setActiveTab] = useState("Members");
  const members = ALUMNI.filter((a) => a.batchBS === "2076 B.S." && a.status === "approved");

  return (
    <div className="bg-paper min-h-screen">
      {/* Hero */}
      <div className="relative h-64 bg-pine-800 overflow-hidden">
        <img src={BATCH_IMG} alt="Batch photo" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-900/60 to-pine-900/80" />
        <div className="absolute inset-0 flex items-end p-6">
          <div className="max-w-5xl mx-auto w-full">
            <div className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">Batch</div>
            <h1 className="font-display text-5xl font-bold text-white">2076 B.S.</h1>
            <div className="text-pine-300 text-sm mt-1">2019/20 A.D.</div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Batch info bar */}
        <div className="bg-white border-b border-charcoal-100 px-6 py-4">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div className="text-sm">
                <span className="text-charcoal-400">Program: </span>
                <span className="font-semibold text-charcoal">SEE</span>
              </div>
              <div className="text-sm">
                <span className="text-charcoal-400">Members: </span>
                <span className="font-semibold text-charcoal">16 Gorkhans</span>
              </div>
              <div className="text-sm">
                <span className="text-charcoal-400">School: </span>
                <span className="font-semibold text-charcoal">GUPS, Kohalpur-2</span>
              </div>
            </div>
            <button
              onClick={() => navigate("register")}
              className="px-5 py-2 bg-pine-600 text-white text-sm font-semibold rounded-lg hover:bg-pine-700 transition-colors"
            >
              Reconnect with your batch
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-charcoal-100 bg-white mb-6">
          <div className="flex gap-0 overflow-x-auto">
            {["Members", "Posts", "Memories", "Achievements"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
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

        {activeTab === "Members" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
              {members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => navigate("profile")}
                  className="group text-left p-5 bg-white border border-charcoal-100 rounded-xl hover:border-pine-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar initials={member.initials} color={member.color} size="lg" />
                    <div>
                      <div className="font-semibold text-charcoal text-sm group-hover:text-pine-700">{member.name}</div>
                      {member.verified && <div className="text-gold-600 text-xs">✓ Verified Gorkhan</div>}
                    </div>
                  </div>
                  <div className="text-xs text-charcoal-400 space-y-1">
                    <div>💼 {member.profession}</div>
                    <div>📍 {member.city}, {member.country}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Posts" && (
          <div className="max-w-2xl pb-10 space-y-4">
            <div className="bg-white rounded-xl border border-charcoal-100 p-5">
              <textarea
                placeholder="Share something with the 2076 B.S. batch…"
                rows={3}
                className="w-full px-4 py-3 border border-charcoal-200 rounded-lg text-sm bg-paper focus:outline-none focus:border-pine-500 resize-none mb-3"
              />
              <button
                onClick={() => navigate("login")}
                className="px-5 py-2 bg-pine-600 text-white rounded-lg text-sm font-semibold"
              >
                Post to Batch
              </button>
            </div>
            {BATCH_POSTS.map((post) => (
              <div key={post.id} className="bg-white rounded-xl border border-charcoal-100 p-5">
                <div className="flex gap-3">
                  <Avatar initials={post.initials} color={post.color} size="md" />
                  <div>
                    <div className="font-semibold text-charcoal text-sm">{post.author}</div>
                    <div className="text-charcoal-300 text-xs">{post.time}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-charcoal-600 leading-relaxed">{post.content}</p>
                <div className="mt-3 flex gap-4 text-xs text-charcoal-400">
                  <button className="hover:text-pine-600">♥ {post.likes}</button>
                  <button className="hover:text-pine-600">💬 Reply</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {(activeTab === "Memories" || activeTab === "Achievements") && (
          <div className="text-center py-20 text-charcoal-400 pb-10">
            <div className="text-3xl mb-3">◑</div>
            <div className="font-medium text-charcoal-600 mb-1">
              {"Your batch doesn't have any " + activeTab.toLowerCase() + " yet."}
            </div>
            <div className="text-sm">Be the first Gorkhan to share something.</div>
          </div>
        )}
      </div>
    </div>
  );
}
