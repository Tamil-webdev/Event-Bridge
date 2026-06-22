import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { login } from "../api/auth";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Field from "../components/ui/Field";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Welcome back");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[var(--color-bg)] lg:grid-cols-[1.1fr_0.9fr]">
      <section className="hidden flex-col justify-between overflow-hidden bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))] p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
            <CalendarDays className="h-6 w-6" />
          </span>
          <span className="font-display text-2xl font-bold">Event Bridge</span>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100">Campus operations</p>
          <h1 className="font-display text-5xl font-bold leading-tight">
            A polished workspace for clubs, events, and campus discovery.
          </h1>
          <div className="mt-8 grid gap-4 text-sm text-blue-50">
            {["Track upcoming events", "Coordinate club activity", "Manage event publishing"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-blue-100">Designed for fast, accessible campus collaboration.</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md p-6 sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">Welcome back</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-[var(--color-text-1)]">Login</h1>
              <p className="mt-2 text-sm text-[var(--color-text-2)]">Access your campus events dashboard.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? "Light" : "Dark"}
            </Button>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-[color-mix(in_srgb,var(--color-danger)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)] px-4 py-3 text-sm text-[var(--color-danger)]" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              success={email.includes("@") ? "Looks good" : ""}
            />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-text-2)]">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-[var(--color-primary)] hover:underline">
              Register
            </Link>
          </p>
        </Card>
      </section>
    </div>
  );
}

export default Login;
