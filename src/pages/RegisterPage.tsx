import { useState } from "react";
import Seal from "../components/Seal";
import type { AppView } from "../types";
import { BATCHES } from "../data";

interface RegisterPageProps {
  navigate: (view: AppView) => void;
  onLogin: (role: "alumni") => void;
}

const AD_MAP: Record<string, string> = {
  "2061 B.S.": "2004/05 A.D.", "2067 B.S.": "2010/11 A.D.", "2072 B.S.": "2015/16 A.D.",
  "2074 B.S.": "2017/18 A.D.", "2075 B.S.": "2018/19 A.D.", "2076 B.S.": "2019/20 A.D.",
  "2081 B.S.": "2024/25 A.D.", "2082 B.S.": "2025/26 A.D.",
};

const STEPS = [
  { n: 1, label: "Basic Info" },
  { n: 2, label: "GUPS Info" },
  { n: 3, label: "Current Life" },
  { n: 4, label: "Profile" },
  { n: 5, label: "Privacy" },
];

const COUNTRIES = ["Nepal", "Australia", "United Kingdom", "United States", "Japan", "South Korea", "Canada", "Qatar", "UAE", "India", "Germany", "Other"];
const PROGRAMS = ["SLC", "SEE", "+2 Science", "+2 Management", "B.Sc. Agriculture"];

export default function RegisterPage({ navigate, onLogin }: RegisterPageProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", password: "",
    batchBS: "", program: "", studentId: "",
    country: "", city: "", profession: "", employer: "",
    photo: null as File | null, bio: "",
    privacyCity: "alumni", privacyProfession: "alumni", privacyPhone: "private",
    digest: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validateStep = () => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!form.fullName.trim()) errs.fullName = "Full name is required.";
      if (!form.email.trim()) errs.email = "Email is required.";
      if (!form.password || form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    }
    if (step === 2) {
      if (!form.batchBS) errs.batchBS = "Please select your batch year.";
      if (!form.program) errs.program = "Please select your program.";
    }
    if (step === 3) {
      if (!form.country) errs.country = "Please select your country.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 5));
  };

  const submit = () => {
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-lg text-sm bg-white focus:outline-none focus:border-pine-500 transition-colors ${errors[field] ? "border-red-400" : "border-charcoal-200"}`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-pine-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Seal size={52} />
          </div>
          <h2 className="font-display text-3xl font-bold text-charcoal mb-3">Profile Submitted!</h2>
          <p className="text-charcoal-400 text-sm mb-2">
            Your application is now waiting for association verification.
          </p>
          <p className="text-charcoal-400 text-sm mb-8">
            The GUPS Alumni Association team will review your information and notify you at <strong>{form.email}</strong> within a few days.
          </p>
          <div className="p-4 bg-gold-50 border border-gold-200 rounded-lg text-sm text-left mb-6">
            <div className="font-semibold text-gold-800 mb-2">What happens next?</div>
            <ul className="text-gold-700 space-y-1 text-xs">
              <li>→ Association team reviews your batch information</li>
              <li>→ Cross-referenced with GUPS records</li>
              <li>→ You receive an approval or request for more info</li>
              <li>→ Upon approval, your profile appears in the directory</li>
            </ul>
          </div>
          <button
            onClick={() => onLogin("alumni")}
            className="w-full py-3 bg-pine-600 text-white font-semibold rounded-lg hover:bg-pine-700 transition-colors"
          >
            Go to My Dashboard
          </button>
          <button onClick={() => navigate("home")} className="mt-3 text-sm text-charcoal-400 hover:text-charcoal">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="bg-white border-b border-charcoal-100 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <Seal size={32} />
            <span className="font-display font-semibold text-pine-800 text-sm">GUPS Alumni</span>
          </button>
          <button onClick={() => navigate("login")} className="text-sm text-charcoal-400 hover:text-charcoal">
            Already a member? Log in
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-charcoal mb-1">Join the Gorkhans</h1>
          <p className="text-charcoal-400 text-sm">Create your alumni profile in a few steps.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-10">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step > s.n ? "bg-pine-600 text-white" :
                  step === s.n ? "bg-pine-600 text-white ring-4 ring-pine-100" :
                  "bg-charcoal-200 text-charcoal-400"
                }`}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <div className={`text-xs mt-1 font-medium hidden sm:block ${step >= s.n ? "text-pine-700" : "text-charcoal-400"}`}>
                  {s.label}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${step > s.n ? "bg-pine-400" : "bg-charcoal-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-white rounded-xl border border-charcoal-100 p-8">
          {step === 1 && (
            <div className="space-y-5">
              <div className="font-display text-xl font-semibold text-charcoal mb-5">Basic Information</div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Full Name *</label>
                <input type="text" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Suman Giri" className={inputClass("fullName")} />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Email Address *</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="suman@example.com" className={inputClass("email")} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Phone Number</label>
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+977 984..." className={inputClass("phone")} />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Password *</label>
                <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Min. 6 characters" className={inputClass("password")} />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="font-display text-xl font-semibold text-charcoal mb-5">GUPS Information</div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Batch Year (B.S.) *</label>
                <select value={form.batchBS} onChange={(e) => update("batchBS", e.target.value)} className={inputClass("batchBS")}>
                  <option value="">Select your batch year</option>
                  {BATCHES.map((b) => <option key={b.id} value={b.yearBS}>{b.yearBS}</option>)}
                </select>
                {form.batchBS && (
                  <p className="text-charcoal-400 text-xs mt-1">{AD_MAP[form.batchBS]}</p>
                )}
                {errors.batchBS && <p className="text-red-500 text-xs mt-1">{errors.batchBS}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Program *</label>
                <select value={form.program} onChange={(e) => update("program", e.target.value)} className={inputClass("program")}>
                  <option value="">Select your program</option>
                  {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.program && <p className="text-red-500 text-xs mt-1">{errors.program}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Student ID / Registration Number</label>
                <input type="text" value={form.studentId} onChange={(e) => update("studentId", e.target.value)} placeholder="Optional — helps verification" className={inputClass("studentId")} />
                <p className="text-charcoal-300 text-xs mt-1">This is only used for verification and will not be shown publicly.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="font-display text-xl font-semibold text-charcoal mb-5">Where Are You Now?</div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Country *</label>
                <select value={form.country} onChange={(e) => update("country", e.target.value)} className={inputClass("country")}>
                  <option value="">Select your country</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">City</label>
                <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Kathmandu, Melbourne, London…" className={inputClass("city")} />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Profession</label>
                <input type="text" value={form.profession} onChange={(e) => update("profession", e.target.value)} placeholder="Software Engineer, Doctor, Student…" className={inputClass("profession")} />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Employer / Organization</label>
                <input type="text" value={form.employer} onChange={(e) => update("employer", e.target.value)} placeholder="Optional" className={inputClass("employer")} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div className="font-display text-xl font-semibold text-charcoal mb-5">Your Profile</div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-2">Profile Photo</label>
                <div className="border-2 border-dashed border-charcoal-200 rounded-lg p-8 text-center hover:border-pine-400 transition-colors cursor-pointer">
                  <div className="text-3xl mb-2">📷</div>
                  <div className="text-sm text-charcoal-400 mb-1">Upload a photo</div>
                  <div className="text-xs text-charcoal-300">JPG, PNG up to 5MB</div>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => update("photo", e.target.files?.[0] ? "set" : "")} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Short Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  placeholder="A brief introduction about yourself — optional"
                  rows={4}
                  className="w-full px-4 py-3 border border-charcoal-200 rounded-lg text-sm bg-white focus:outline-none focus:border-pine-500 transition-colors resize-none"
                />
                <p className="text-charcoal-300 text-xs mt-1">{form.bio.length}/300 characters</p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <div className="font-display text-xl font-semibold text-charcoal mb-2">Privacy Settings</div>
              <p className="text-charcoal-400 text-sm mb-5">Choose who can see each part of your profile. You can change these at any time.</p>

              <div className="p-4 bg-paper rounded-lg border border-charcoal-100 text-sm mb-6">
                <div className="font-medium text-charcoal mb-3">Always Public</div>
                <div className="text-charcoal-400 space-y-1 text-xs">
                  <div>✓ Name</div>
                  <div>✓ Batch & Program</div>
                  <div>✓ Profile Photo</div>
                  <div>✓ Country</div>
                </div>
              </div>

              {[
                { field: "privacyCity", label: "City / Location" },
                { field: "privacyProfession", label: "Profession & Employer" },
                { field: "privacyPhone", label: "Phone Number" },
              ].map((item) => (
                <div key={item.field} className="flex items-center justify-between py-3 border-b border-charcoal-100">
                  <div className="text-sm text-charcoal font-medium">{item.label}</div>
                  <select
                    value={form[item.field as keyof typeof form] as string}
                    onChange={(e) => update(item.field, e.target.value)}
                    className="px-3 py-1.5 border border-charcoal-200 rounded text-sm bg-white focus:outline-none focus:border-pine-400"
                  >
                    <option value="public">Public</option>
                    <option value="alumni">Alumni only</option>
                    <option value="private">Only me</option>
                  </select>
                </div>
              ))}

              <div className="pt-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="digest"
                    checked={form.digest}
                    onChange={(e) => update("digest", e.target.checked)}
                    className="w-4 h-4 accent-pine-600 mt-0.5"
                  />
                  <div>
                    <label htmlFor="digest" className="text-sm font-medium text-charcoal cursor-pointer">
                      Subscribe to the Gorkhan Monthly Digest
                    </label>
                    <p className="text-xs text-charcoal-400 mt-0.5">
                      A monthly email with new members, events, and community updates. No spam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => step > 1 ? setStep((s) => s - 1) : navigate("home")}
            className="px-5 py-2.5 border border-charcoal-200 text-charcoal-600 rounded-lg text-sm font-medium hover:bg-paper-dark transition-colors"
          >
            {step === 1 ? "Cancel" : "← Back"}
          </button>
          {step < 5 ? (
            <button
              onClick={next}
              className="px-7 py-2.5 bg-pine-600 text-white rounded-lg text-sm font-semibold hover:bg-pine-700 transition-colors"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={submit}
              className="px-7 py-2.5 bg-pine-600 text-white rounded-lg text-sm font-semibold hover:bg-pine-700 transition-colors"
            >
              Submit for Verification
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
