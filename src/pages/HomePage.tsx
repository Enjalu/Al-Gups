import { useState } from "react";
import Seal from "../components/Seal";
import Avatar from "../components/Avatar";
import Footer from "../layout/Footer";
import type { AppView } from "../types";
import { BATCHES, EVENTS, COUNTRY_DATA, ALUMNI } from "../data";

interface HomePageProps {
  navigate: (view: AppView) => void;
}

const HERO_IMG = "https://images.unsplash.com/photo-1636513988093-126e51dee32d?w=1400&h=800&fit=crop&auto=format";
const GATHERING_IMG = "https://images.unsplash.com/photo-1724222808004-42d0dbc5fc59?w=800&h=500&fit=crop&auto=format";
const MEMORY_IMG1 = "https://images.unsplash.com/photo-1511215579272-6192432f83bc?w=400&h=300&fit=crop&auto=format";
const MEMORY_IMG2 = "https://images.unsplash.com/photo-1580424917967-a8867a6e676e?w=400&h=300&fit=crop&auto=format";

export default function HomePage({ navigate }: HomePageProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const upcomingEvents = EVENTS.filter((e) => e.type === "upcoming");
  const featuredBatches = BATCHES.slice(2, 5);
  const selectedRegion = COUNTRY_DATA.find((r) => r.region === activeRegion);

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-pine-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-950/80 via-pine-900/60 to-pine-900/90" />

        {/* Decorative ruled lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gold-500/30" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold-500/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-gold-500" />
              <span className="text-gold-400 text-xs font-semibold tracking-widest uppercase">Established 2082 B.S.</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-3">
              Once a<br />
              <span className="text-gold-400">Gorkhan,</span>
            </h1>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
              Always a Gorkhan.
            </h1>

            <p className="text-pine-200 text-lg leading-relaxed mb-10 max-w-md">
              The official alumni community of Gorkha United Public School. Stay connected with the people who shared your classrooms, your campus, your story.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("directory")}
                className="px-7 py-3.5 bg-gold-500 text-charcoal font-semibold rounded hover:bg-gold-400 transition-colors"
              >
                Find Alumni
              </button>
              <button
                onClick={() => navigate("register")}
                className="px-7 py-3.5 border border-white/40 text-white font-semibold rounded hover:bg-white/10 transition-colors"
              >
                Join the Association
              </button>
            </div>

            <div className="mt-10 text-pine-400 text-sm italic font-display">
              98 Gorkhans. 39 countries. One community.
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative rounded-lg overflow-hidden border border-gold-500/30 shadow-2xl">
              <img src={GATHERING_IMG} alt="GUPS alumni gathering" className="w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-white text-sm font-medium">GUPS Alumni Gathering</div>
                <div className="text-pine-300 text-xs">Kohalpur, Banke</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-gold-500 rounded-lg p-4 shadow-lg">
              <div className="text-charcoal font-bold text-xl">98</div>
              <div className="text-charcoal-700 text-xs font-medium">Gorkhans</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-pine-800 border border-gold-500/40 rounded-lg p-4 shadow-lg">
              <div className="text-white font-bold text-xl">39</div>
              <div className="text-pine-300 text-xs font-medium">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-paper-dark border-y border-paper-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { number: "98", label: "Registered Alumni", sub: "Gorkhans" },
              { number: "39", label: "Countries", sub: "Worldwide" },
              { number: "8", label: "Active Batches", sub: "2061–2082 B.S." },
              { number: "2082 B.S.", label: "Since", sub: "2025/26 A.D." },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-pine-700">{stat.number}</div>
                <div className="text-xs text-charcoal-400 uppercase tracking-widest mt-1">{stat.label}</div>
                <div className="text-xs text-charcoal-300 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">Batches</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">Our Gorkhans by Batch</h2>
          </div>
          <button onClick={() => navigate("batches")} className="text-pine-600 text-sm font-medium hover:text-pine-800 hidden sm:block">
            Explore All Batches →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredBatches.map((batch) => (
            <button
              key={batch.id}
              onClick={() => navigate("batch-detail")}
              className="group text-left p-6 bg-white border border-charcoal-100 rounded-lg hover:border-pine-300 hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold-300 rounded-tr-lg" />

              <div className="font-display text-2xl font-bold text-pine-700 mb-1">{batch.yearBS}</div>
              <div className="text-charcoal-400 text-xs mb-4">{batch.yearAD}</div>

              <div className="inline-block px-2 py-0.5 bg-pine-50 text-pine-700 text-xs font-medium rounded mb-4">
                {batch.program}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  {ALUMNI.filter((a) => a.batchBS === batch.yearBS).slice(0, 4).map((m) => (
                    <Avatar key={m.id} initials={m.initials} color={m.color} size="xs" className="border-2 border-white" />
                  ))}
                </div>
                <span className="text-charcoal-400 text-xs">{batch.memberCount} members</span>
              </div>

              <div className="text-pine-600 text-sm font-medium group-hover:text-pine-800 transition-colors">
                View Batch →
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <button onClick={() => navigate("batches")} className="text-pine-600 text-sm font-medium">
            Explore All Batches →
          </button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-white border-y border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">Calendar</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">Upcoming Events</h2>
            </div>
            <button onClick={() => navigate("events")} className="text-pine-600 text-sm font-medium hover:text-pine-800 hidden sm:block">
              All Events →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, i) => (
              <button
                key={event.id}
                onClick={() => navigate("events")}
                className="group text-left p-6 bg-paper rounded-lg border border-charcoal-100 hover:border-pine-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="px-2.5 py-1 bg-pine-600 text-white text-xs font-medium rounded">
                    {i === 0 ? "Next" : "Upcoming"}
                  </div>
                  <div className="text-charcoal-300 text-xs">{event.attendees} attending</div>
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal mb-2">{event.title}</h3>
                <div className="flex flex-col gap-1 text-sm text-charcoal-400">
                  <div className="font-medium text-charcoal-700">{event.dateBS}</div>
                  <div className="text-xs text-charcoal-300">{event.dateAD}</div>
                  <div className="mt-1">📍 {event.location}</div>
                </div>
                <div className="mt-4 text-pine-600 text-sm font-medium group-hover:text-pine-800">
                  View Details →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Memories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">Gallery</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">Gorkhan Memories</h2>
          </div>
          <button onClick={() => navigate("memories")} className="text-pine-600 text-sm font-medium hover:text-pine-800 hidden sm:block">
            View Archive →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="md:row-span-2 rounded-lg overflow-hidden bg-charcoal-100">
            <img src={MEMORY_IMG1} alt="GUPS campus community" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden bg-charcoal-100">
            <img src={MEMORY_IMG2} alt="Nepal landscape" className="w-full h-48 object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden bg-pine-100 flex items-center justify-center h-48">
            <div className="text-center p-4">
              <Seal size={48} className="mx-auto mb-2" />
              <div className="text-pine-700 text-sm font-medium">Share Your Memories</div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden bg-charcoal-100">
            <img src={MEMORY_IMG1} alt="Alumni gathering" className="w-full h-48 object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden bg-gold-50 flex items-center justify-center h-48">
            <div className="text-center p-4">
              <div className="text-gold-600 text-3xl font-display font-bold">+</div>
              <button onClick={() => navigate("memories")} className="mt-2 text-pine-600 text-sm font-medium">
                Browse Archive
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Where Are Gorkhans */}
      <section className="bg-pine-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Global Community</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Where Are Our Gorkhans?</h2>
            <p className="text-pine-300 max-w-md mx-auto text-sm">
              Gorkhans have spread across 39 countries — yet remain connected to Kohalpur and to each other.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {COUNTRY_DATA.map((region) => (
              <button
                key={region.region}
                onClick={() => setActiveRegion(activeRegion === region.region ? null : region.region)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  activeRegion === region.region
                    ? "bg-gold-500/20 border-gold-500"
                    : "bg-pine-800/50 border-pine-700 hover:border-pine-500"
                }`}
              >
                <div className="font-medium text-white text-sm mb-2">{region.region}</div>
                <div className="text-pine-300 text-xs space-y-0.5">
                  {region.countries.map((c) => (
                    <div key={c.name} className="flex justify-between">
                      <span>{c.name}</span>
                      <span className="text-gold-400 font-medium">{c.count}</span>
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {selectedRegion && (
            <div className="mt-6 p-5 bg-pine-800 rounded-lg border border-gold-500/30">
              <div className="text-gold-400 font-semibold text-sm mb-2">{selectedRegion.region}</div>
              <div className="flex flex-wrap gap-3">
                {selectedRegion.countries.map((c) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gold-400" />
                    <span className="text-white text-sm">{c.name}</span>
                    <span className="text-pine-300 text-sm">— {c.count} Gorkhans</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("directory")}
              className="px-7 py-3.5 bg-gold-500 text-charcoal font-semibold rounded hover:bg-gold-400 transition-colors"
            >
              Explore the Gorkhan Community
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-paper py-20 border-t border-paper-darker">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <Seal size={60} className="mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Stay connected to your batch.<br />
            Stay connected to GUPS.
          </h2>
          <p className="text-charcoal-400 text-base mb-8 max-w-md mx-auto">
            Whether you graduated last year or two decades ago, the Gorkhan community is waiting. Join the Alumni Association.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("register")}
              className="px-8 py-3.5 bg-pine-600 text-white font-semibold rounded hover:bg-pine-700 transition-colors"
            >
              Join the Alumni Association
            </button>
            <button
              onClick={() => navigate("claim-profile")}
              className="px-8 py-3.5 border border-charcoal-300 text-charcoal-600 font-semibold rounded hover:border-pine-400 hover:text-pine-700 transition-colors"
            >
              Claim Existing Profile
            </button>
          </div>
          <div className="mt-6 text-charcoal-400 text-sm">
            Already listed on <a href="https://gorkhaschool.com" target="_blank" rel="noopener noreferrer" className="text-pine-600 hover:underline">gorkhaschool.com</a>? Claim your profile to connect it here.
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}
