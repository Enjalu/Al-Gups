import { useState } from "react";
import Footer from "../layout/Footer";
import type { AppView } from "../types";

interface ContactPageProps {
  navigate: (view: AppView) => void;
}

export default function ContactPage({ navigate }: ContactPageProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1000);
  };

  const inputClass = "w-full px-4 py-3 border border-charcoal-200 rounded-lg text-sm bg-white focus:outline-none focus:border-pine-500 transition-colors";

  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-pine-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Reach Out</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">Get in Touch</h1>
          <p className="text-pine-300 text-base max-w-xl">
            Have questions about the Alumni Association? Want to get involved? {"We'd"} love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div>
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-4">Association Details</div>
              <div className="space-y-3 text-sm text-charcoal-600">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-pine-50 rounded flex items-center justify-center text-pine-600 shrink-0">📍</div>
                  <div>
                    <div className="font-medium text-charcoal">Alumni Association of GUPS</div>
                    <div className="text-charcoal-400">Kohalpur-2, Banke, Nepal</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-pine-50 rounded flex items-center justify-center text-pine-600 shrink-0">📞</div>
                  <div>
                    <div className="font-medium text-charcoal">+977 984 8082446</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-pine-50 rounded flex items-center justify-center text-pine-600 shrink-0">✉</div>
                  <div>
                    <a href="mailto:alumnigups@gmail.com" className="font-medium text-pine-600 hover:text-pine-800">alumnigups@gmail.com</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-pine-50 rounded flex items-center justify-center text-pine-600 shrink-0">🌐</div>
                  <div>
                    <a href="https://gorkhaschool.com" target="_blank" rel="noopener noreferrer" className="font-medium text-pine-600 hover:text-pine-800">gorkhaschool.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-4">Get Involved</div>
              <div className="space-y-3">
                {[
                  { title: "Volunteer with the Association", desc: "Help organise events, manage communications, or support tech initiatives." },
                  { title: "Become a Mentor", desc: "Guide younger Gorkhans in their career and life journey." },
                  { title: "Contribute to Events", desc: "Help plan alumni gatherings and community activities." },
                  { title: "Sponsor an Initiative", desc: "Support scholarships, classroom renovation, or alumni programmes." },
                ].map((item) => (
                  <div key={item.title} className="p-4 bg-white rounded-lg border border-charcoal-100">
                    <div className="font-medium text-charcoal text-sm mb-1">{item.title}</div>
                    <div className="text-charcoal-400 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-xl border border-charcoal-100 p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-pine-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <h3 className="font-display text-xl font-bold text-charcoal mb-2">Message Sent!</h3>
                <p className="text-charcoal-400 text-sm">
                  Thank you for reaching out. The association team will get back to you soon.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="font-display text-lg font-semibold text-charcoal mb-5">Send a Message</div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Your Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Suman Giri" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="suman@example.com" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Subject</label>
                  <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass}>
                    <option value="">Select subject</option>
                    <option>General Inquiry</option>
                    <option>Volunteer Interest</option>
                    <option>Mentorship</option>
                    <option>Sponsorship / Support</option>
                    <option>Event Inquiry</option>
                    <option>Technical Issue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Message *</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" rows={5} className={`${inputClass} resize-none`} />
                </div>
                <button
                  onClick={handleSend}
                  disabled={sending || !form.name || !form.email || !form.message}
                  className="w-full py-3 bg-pine-600 text-white rounded-lg font-semibold text-sm hover:bg-pine-700 disabled:opacity-50 transition-colors"
                >
                  {sending ? "Sending…" : "Send Message"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
