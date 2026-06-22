import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { register } from "../api/auth";
import { getColleges } from "../api/college";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Field from "../components/ui/Field";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    collegeId: "",
  });
  const [colleges, setColleges] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const data = await getColleges();
        setColleges(data);
      } catch (err) {
        console.error("Failed to fetch colleges", err);
      }
    };
    fetchColleges();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password, formData.role, formData.collegeId);
      toast.success("Account created");
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4 py-10">
      <Card className="w-full max-w-2xl p-6 sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-[var(--color-primary)]">Create your workspace identity</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-[var(--color-text-1)]">Register</h1>
          <p className="mt-2 text-sm text-[var(--color-text-2)]">Join Event Bridge as a student or club admin.</p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-[color-mix(in_srgb,var(--color-danger)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)] px-4 py-3 text-sm text-[var(--color-danger)]" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <Field label="Name" name="name" value={formData.name} onChange={handleChange} required success={formData.name.length > 2 ? "Ready" : ""} />
          <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required success={formData.email.includes("@") ? "Valid email" : ""} />
          <Field label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required className="md:col-span-2" />

          <Field as="select" label="Role" name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="club_admin">Club Admin</option>
          </Field>

          <Field as="select" label="College" name="collegeId" value={formData.collegeId} onChange={handleChange} required>
            <option value="">Select a college</option>
            {colleges.map((college) => (
              <option key={college._id} value={college._id}>
                {college.name}
              </option>
            ))}
          </Field>

          <Button type="submit" loading={loading} className="md:col-span-2" size="lg">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text-2)]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
