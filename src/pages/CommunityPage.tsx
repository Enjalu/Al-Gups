import { useState } from "react";
import Avatar from "../components/Avatar";
import type { AppView } from "../types";
import { COMMUNITY_POSTS } from "../data";
import type { CommunityPost } from "../types";

interface CommunityPageProps {
  navigate: (view: AppView) => void;
}

const POST_TYPES = ["All", "Text", "Achievement", "Event", "Batch Update"];

export default function CommunityPage({ navigate }: CommunityPageProps) {
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [filter, setFilter] = useState("All");
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);

  const filtered = filter === "All" ? posts : posts.filter((p) => p.type === filter.toLowerCase().replace(" ", "-"));

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosting(true);
    setTimeout(() => {
      const newEntry: CommunityPost = {
        id: Date.now().toString(),
        author: "Suman Giri",
        authorInitials: "SG",
        authorColor: "#2B5F3A",
        authorBatch: "2076 B.S.",
        content: newPost,
        time: "Just now",
        likes: 0,
        comments: 0,
        type: "text",
        liked: false,
      };
      setPosts((prev) => [newEntry, ...prev]);
      setNewPost("");
      setPosting(false);
    }, 800);
  };

  const typeLabel: Record<string, string> = {
    text: "Post",
    achievement: "Achievement",
    event: "Event",
    "batch-update": "Batch Update",
  };

  const typeBg: Record<string, string> = {
    text: "bg-charcoal-100 text-charcoal-600",
    achievement: "bg-gold-100 text-gold-700",
    event: "bg-pine-100 text-pine-700",
    "batch-update": "bg-blue-50 text-blue-700",
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <div className="font-display text-2xl font-bold text-charcoal mb-1">Community</div>
        <p className="text-charcoal-400 text-sm">Connect with Gorkhans from all batches.</p>
      </div>

      {/* Compose */}
      <div className="bg-white rounded-xl border border-charcoal-100 p-5 mb-6">
        <div className="flex gap-3">
          <Avatar initials="SG" color="#2B5F3A" size="md" className="shrink-0" />
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share something with the Gorkhan community…"
              rows={3}
              className="w-full px-4 py-3 border border-charcoal-200 rounded-lg text-sm bg-paper focus:outline-none focus:border-pine-500 transition-colors resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-charcoal-400">{newPost.length}/500</div>
              <button
                onClick={handlePost}
                disabled={!newPost.trim() || posting}
                className="px-5 py-2 bg-pine-600 text-white rounded-lg text-sm font-semibold hover:bg-pine-700 disabled:opacity-50 transition-colors"
              >
                {posting ? "Posting…" : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {POST_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${
              filter === t
                ? "bg-pine-600 text-white border-pine-600"
                : "bg-white text-charcoal-600 border-charcoal-200 hover:border-pine-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-charcoal-400">
            <div className="text-3xl mb-2">◈</div>
            <div className="font-medium text-charcoal-600 mb-1">No posts yet</div>
            <div className="text-sm">Be the first Gorkhan to share something.</div>
          </div>
        ) : filtered.map((post) => (
          <div key={post.id} className="bg-white rounded-xl border border-charcoal-100 p-5 hover:border-pine-200 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <Avatar initials={post.authorInitials} color={post.authorColor} size="md" className="shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-charcoal text-sm">{post.author}</span>
                  <span className="text-charcoal-300 text-xs">·</span>
                  <span className="text-charcoal-400 text-xs">{post.authorBatch}</span>
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${typeBg[post.type] || typeBg.text}`}>
                    {typeLabel[post.type]}
                  </span>
                </div>
                <div className="text-charcoal-300 text-xs mt-0.5">{post.time}</div>
              </div>
            </div>

            <p className="text-charcoal-700 text-sm leading-relaxed mb-4">{post.content}</p>

            <div className="flex items-center gap-4 pt-3 border-t border-charcoal-100">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  post.liked ? "text-red-500" : "text-charcoal-400 hover:text-red-500"
                }`}
              >
                <span>{post.liked ? "♥" : "♡"}</span>
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-charcoal-400 hover:text-pine-600 transition-colors">
                <span>💬</span>
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-charcoal-400 hover:text-pine-600 transition-colors">
                <span>↗</span>
                <span>Share</span>
              </button>
              <button className="ml-auto text-xs text-charcoal-300 hover:text-red-400 transition-colors">
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
