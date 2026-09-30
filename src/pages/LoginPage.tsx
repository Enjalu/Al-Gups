import { useState } from "react";
import Seal from "../components/Seal";
import type { AppView, AuthState } from "../types";

interface LoginPageProps {
  navigate: (view: AppView) => void;
  onLogin: (role: AuthState) => void;
}

export default function LoginPage({ navigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.toLowerCase().includes("admin")) {
        onLogin("admin");
      } else {
        onLogin("alumni");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-pine-900 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1636513988093-126e51dee32d?w=800&h=1200&fit=crop&auto=format)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pine-950/80 to-pine-900/90" />
        </div>

        {/* Decorative lines */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gold-500/20" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gold-500/10" />

        <div className="relative">
          <Seal size={56} />
        </div>

        <div className="relative">
          <blockquote className="font-display text-3xl font-bold text-white mb-4 leading-tight">
            "Once a Gorkhan,<br />
            <span className="text-gold-400">Always a Gorkhan."</span>
          </blockquote>
          <p className="text-pine-300 text-sm leading-relaxed mb-8">
            The Alumni Association of Gorkha United Public School, Kohalpur-2, Banke, Nepal.
          </p>

          <div className="flex gap-6 text-center">
            {[
              { n: "98", l: "Gorkhans" },
              { n: "39", l: "Countries" },
              { n: "8", l: "Batches" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold text-gold-400">{s.n}</div>
                <div className="text-pine-400 text-xs">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-pine-500 text-xs">
          Established 2082 B.S. · Kohalpur, Banke, Nepal
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-paper">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Seal size={40} />
            <div className="font-display font-semibold text-pine-800">GUPS Alumni Association</div>
          </div>

          <h1 className="font-display text-3xl font-bold text-charcoal mb-1">Welcome back,<br />Gorkhan.</h1>
          <p className="text-charcoal-400 text-sm mb-8">Sign in to your alumni account.</p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-1.5">Email or Phone</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="suman@example.com"
                className="w-full px-4 py-3 border border-charcoal-200 rounded-lg text-sm bg-white focus:outline-none focus:border-pine-500 transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-charcoal-400">Password</label>
                <button className="text-xs text-pine-600 hover:text-pine-800">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-charcoal-200 rounded-lg text-sm bg-white focus:outline-none focus:border-pine-500 transition-colors pr-10"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 bg-pine-600 text-white font-semibold rounded-lg hover:bg-pine-700 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : "Log In"}
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-charcoal-200" />
            <span className="text-charcoal-300 text-xs">OR</span>
            <div className="flex-1 h-px bg-charcoal-200" />
          </div>

          <button className="w-full py-3 border border-charcoal-200 bg-white rounded-lg text-sm text-charcoal font-medium hover:bg-paper-dark transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google (Prototype)
          </button>

          <p className="mt-6 text-sm text-charcoal-400 text-center">
            {"Don't have an account? "}
            <button onClick={() => navigate("register")} className="text-pine-600 font-medium hover:text-pine-800">
              Join the Gorkhans
            </button>
          </p>

          <div className="mt-6 p-4 bg-white border border-charcoal-100 rounded-lg">
            <div className="text-xs font-semibold text-charcoal mb-2">Already registered on gorkhaschool.com?</div>
            <button
              onClick={() => navigate("claim-profile")}
              className="text-pine-600 text-xs font-medium hover:text-pine-800 underline"
            >
              Claim your existing profile →
            </button>
          </div>

          <div className="mt-6 p-3 bg-gold-50 border border-gold-200 rounded text-xs text-gold-800">
            <strong>Demo:</strong> Enter any email + password. Use "admin@..." to enter the admin panel.
          </div>
        </div>
      </div>
    </div>
  );
}
