import Seal from "../components/Seal";
import type { AppView } from "../types";

interface FooterProps {
  navigate: (view: AppView) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-pine-900 text-pine-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Seal size={44} />
              <div>
                <div className="font-display font-semibold text-white text-base leading-tight">GUPS Alumni</div>
                <div className="text-pine-300 text-sm">Association</div>
              </div>
            </div>
            <p className="text-pine-300 text-sm leading-relaxed italic font-display">
              "Once a Gorkhan, Always a Gorkhan."
            </p>
            <div className="mt-4 text-xs text-pine-400">
              Established 2082 B.S. (2025/26 A.D.)
            </div>
          </div>

          <div>
            <div className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Community</div>
            <div className="space-y-2">
              {["Alumni Directory", "Batch Directory", "Distinguished Alumni", "Community Feed"].map((item) => (
                <div key={item} className="text-pine-300 text-sm hover:text-white cursor-pointer transition-colors">{item}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Participate</div>
            <div className="space-y-2">
              {[
                { label: "Events", view: "events" as AppView },
                { label: "Memories", view: "memories" as AppView },
                { label: "Opportunities", view: "opportunities" as AppView },
                { label: "Fundraising", view: "fundraising" as AppView },
                { label: "Get Involved", view: "contact" as AppView },
              ].map((item) => (
                <button key={item.view} onClick={() => navigate(item.view)} className="block text-pine-300 text-sm hover:text-white transition-colors">
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Contact</div>
            <div className="space-y-2 text-sm text-pine-300">
              <div>Kohalpur-2, Banke, Nepal</div>
              <div>+977 984 8082446</div>
              <div>alumnigups@gmail.com</div>
              <div className="pt-2">
                <a href="https://gorkhaschool.com" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">
                  gorkhaschool.com ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-pine-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-pine-400 text-xs">
            © 2083 B.S. (2026/27 A.D.) Alumni Association of Gorkha United Public School. Prototype — sample data only.
          </div>
          <div className="flex gap-4 text-xs text-pine-400">
            <span className="cursor-pointer hover:text-pine-200">Privacy Policy</span>
            <span className="cursor-pointer hover:text-pine-200">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
