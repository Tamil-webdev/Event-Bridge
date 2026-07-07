import { useNavigate } from "react-router-dom";
import { CalendarDays, Users, Zap, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";
import { useTheme } from "../context/ThemeContext";

function LandingPage() {
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-1)]">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
            <CalendarDays className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-xl font-bold">Event Bridge</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDark ? "Light" : "Dark"}
          </Button>
          <Button variant="ghost" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button onClick={() => navigate("/register")} size="sm">
            Register
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] px-4 py-2">
            <span className="text-sm font-semibold text-[var(--color-primary)]">✨ Connect, Discover, Celebrate</span>
          </div>
          
          <h1 className="mb-6 font-display text-5xl font-bold leading-tight md:text-6xl">
            Your Campus Event Hub
          </h1>
          
          <p className="mb-8 text-lg text-[var(--color-text-2)]">
            Event Bridge brings your college community together. Discover exciting events, join clubs, and make lasting connections all in one place.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              onClick={() => navigate("/register")} 
              size="lg"
              className="gap-2"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")}
              size="lg"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-[var(--color-border)] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center font-display text-4xl font-bold">
            Why Event Bridge?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-primary)_5%,transparent)] p-8 transition-all hover:border-[var(--color-primary)] hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
                <CalendarDays className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold">Discover Events</h3>
              <p className="text-[var(--color-text-2)]">
                Find all upcoming college events in one place. Filter by club, date, or category and never miss out on exciting opportunities.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-primary)_5%,transparent)] p-8 transition-all hover:border-[var(--color-primary)] hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold">Join Clubs</h3>
              <p className="text-[var(--color-text-2)]">
                Explore clubs across your campus and join communities that match your interests. Connect with like-minded peers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-primary)_5%,transparent)] p-8 transition-all hover:border-[var(--color-primary)] hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold">Stay Updated</h3>
              <p className="text-[var(--color-text-2)]">
                Get real-time notifications for new events, club updates, and announcements. Never miss important information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[var(--color-border)] px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-8 py-16 text-center text-white">
          <h2 className="mb-4 font-display text-4xl font-bold">Ready to Join?</h2>
          <p className="mb-8 text-lg opacity-90">
            Create your account and start exploring the vibrant campus community today.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              onClick={() => navigate("/register")}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[var(--color-primary)]"
            >
              Create Account
            </Button>
            <Button 
              onClick={() => navigate("/login")}
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/20"
            >
              Already have an account? Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] px-6 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-[var(--color-text-2)]">
          <p>&copy; 2024 Event Bridge. Connecting college communities, one event at a time.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
