import Avatar from "../components/Avatar";
import Footer from "../layout/Footer";
import type { AppView } from "../types";
import { DISTINGUISHED_ALUMNI } from "../data";

interface DistinguishedPageProps {
  navigate: (view: AppView) => void;
}

export default function DistinguishedPage({ navigate }: DistinguishedPageProps) {
  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-pine-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Recognition</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">Distinguished Gorkhans</h1>
          <p className="text-pine-300 text-base max-w-xl leading-relaxed">
            Gorkhans who have made a meaningful mark in their careers and communities — carrying the values of GUPS wherever they go.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DISTINGUISHED_ALUMNI.map((alumni) => (
            <div
              key={alumni.id}
              className="bg-white border border-charcoal-100 rounded-xl overflow-hidden hover:border-pine-300 hover:shadow-md transition-all"
            >
              <div className="h-2 bg-gradient-to-r from-pine-700 to-pine-500" />
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar initials={alumni.initials} color={alumni.color} size="xl" />
                  <div>
                    <h3 className="font-display text-xl font-bold text-charcoal">{alumni.name}</h3>
                    <div className="text-pine-700 text-sm font-medium mt-0.5">{alumni.profession}</div>
                    <div className="text-charcoal-400 text-xs mt-1">{alumni.organization}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-pine-50 text-pine-700 text-xs font-medium rounded border border-pine-100">
                    {alumni.batch}
                  </span>
                  <span className="px-2.5 py-1 bg-charcoal-100 text-charcoal-600 text-xs rounded">
                    {alumni.program}
                  </span>
                  <span className="px-2.5 py-1 bg-charcoal-100 text-charcoal-600 text-xs rounded">
                    📍 {alumni.country}
                  </span>
                </div>

                <p className="text-charcoal-600 text-sm leading-relaxed mb-4">{alumni.achievement}</p>

                <button
                  onClick={() => navigate("profile")}
                  className="text-pine-600 text-sm font-medium hover:text-pine-800 transition-colors"
                >
                  View Story →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl border border-charcoal-100 text-center">
          <div className="font-display text-lg font-semibold text-charcoal mb-2">Nominate a Gorkhan</div>
          <p className="text-charcoal-400 text-sm mb-4">
            Know a Gorkhan who deserves recognition? The Distinguished Alumni list is curated by the association committee. Submit a nomination.
          </p>
          <button onClick={() => navigate("contact")} className="px-6 py-2.5 border border-pine-600 text-pine-700 rounded-lg font-semibold text-sm hover:bg-pine-50 transition-colors">
            Contact the Association
          </button>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
