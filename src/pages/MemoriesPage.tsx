import { useState } from "react";
import type { AppView } from "../types";

interface MemoriesPageProps {
  navigate: (view: AppView) => void;
  loggedIn?: boolean;
}

const CATEGORIES = ["All", "School Days", "Batch Memories", "Alumni Gatherings", "Sports", "Cultural Events"];

const MEMORIES = [
  { id: "1", category: "Alumni Gatherings", caption: "First GUPS Alumni Day — Shrawan 2082 B.S.", batch: "All Batches", year: "2082 B.S.", contributor: "Alumni Association", img: "https://images.unsplash.com/photo-1724222808004-42d0dbc5fc59?w=500&h=350&fit=crop&auto=format" },
  { id: "2", category: "School Days", caption: "Morning assembly at GUPS campus, Kohalpur", batch: "2076 B.S.", year: "2076 B.S.", contributor: "Suman Giri", img: "https://images.unsplash.com/photo-1580424917967-a8867a6e676e?w=500&h=350&fit=crop&auto=format" },
  { id: "3", category: "Batch Memories", caption: "After the SEE exams — relief and celebration!", batch: "2076 B.S.", year: "2076 B.S.", contributor: "Dipika Rana", img: "https://images.unsplash.com/photo-1511215579272-6192432f83bc?w=500&h=350&fit=crop&auto=format" },
  { id: "4", category: "Cultural Events", caption: "Dashain celebrations at GUPS — traditional attire", batch: "2074 B.S.", year: "2074 B.S.", contributor: "Anisha Bhandari", img: "https://images.unsplash.com/photo-1761124739609-779ca810c056?w=500&h=350&fit=crop&auto=format" },
  { id: "5", category: "Sports", caption: "Inter-school football match — GUPS vs Kohalpur Academy", batch: "2072 B.S.", year: "2072 B.S.", contributor: "Bibek Shrestha", img: "https://images.unsplash.com/photo-1636513988093-126e51dee32d?w=500&h=350&fit=crop&auto=format" },
  { id: "6", category: "School Days", caption: "GUPS campus — the courtyard we all remember", batch: "All Batches", year: "2078 B.S.", contributor: "Alumni Association", img: "https://images.unsplash.com/photo-1580424917967-a8867a6e676e?w=500&h=350&fit=crop&auto=format" },
];

export default function MemoriesPage({ navigate, loggedIn }: MemoriesPageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<(typeof MEMORIES)[0] | null>(null);

  const filtered = activeCategory === "All" ? MEMORIES : MEMORIES.filter((m) => m.category === activeCategory);

  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-white border-b border-charcoal-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">Archive</div>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">Gorkhan Memories</h1>
              <p className="text-charcoal-400 text-sm mt-1">A visual archive of GUPS and alumni life.</p>
            </div>
            {loggedIn && (
              <button className="px-4 py-2 bg-pine-600 text-white rounded-lg text-sm font-semibold hover:bg-pine-700 transition-colors">
                + Share Memory
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Category filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
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

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-charcoal-400">
            <div className="text-3xl mb-3">◑</div>
            <div className="font-medium text-charcoal-600 mb-1">No memories uploaded yet</div>
            <div className="text-sm">Be the first to share a memory from this category.</div>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((memory) => (
              <button
                key={memory.id}
                onClick={() => setLightbox(memory)}
                className="group break-inside-avoid block w-full rounded-xl overflow-hidden bg-white border border-charcoal-100 hover:border-pine-300 hover:shadow-md transition-all text-left"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={memory.img}
                    alt={memory.caption}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-white text-xs font-medium">{memory.batch} · {memory.year}</div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-charcoal text-xs font-medium leading-snug">{memory.caption}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="px-1.5 py-0.5 bg-charcoal-100 text-charcoal-400 text-xs rounded">{memory.category}</span>
                    <span className="text-charcoal-300 text-xs">{memory.contributor}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {!loggedIn && (
          <div className="mt-12 p-6 bg-pine-50 rounded-xl border border-pine-100 text-center">
            <div className="font-display text-lg font-semibold text-pine-800 mb-2">Share Your Memories</div>
            <p className="text-charcoal-400 text-sm mb-4">Join the alumni community to share and contribute to the Gorkhan memory archive.</p>
            <button onClick={() => navigate("register")} className="px-6 py-2.5 bg-pine-600 text-white rounded-lg font-semibold text-sm hover:bg-pine-700 transition-colors">
              Join the Gorkhans
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8" onClick={() => setLightbox(null)}>
          <div className="fixed inset-0 bg-black/80" />
          <div className="relative bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.caption} className="w-full object-cover max-h-96" />
            <div className="p-6">
              <p className="font-semibold text-charcoal text-base mb-2">{lightbox.caption}</p>
              <div className="flex flex-wrap gap-3 text-sm text-charcoal-400">
                <span>📁 {lightbox.category}</span>
                <span>♦ {lightbox.batch}</span>
                <span>📅 {lightbox.year}</span>
                <span>👤 {lightbox.contributor}</span>
              </div>
            </div>
            <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
