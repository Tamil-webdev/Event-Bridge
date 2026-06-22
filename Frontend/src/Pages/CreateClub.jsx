import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { createClub } from "../api/clubs";
import { getColleges } from "../api/college";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Field from "../components/ui/Field";
import ImageUploader from "../components/ui/ImageUploader";
import PageHeader from "../components/ui/PageHeader";

function CreateClub() {
  const [form, setForm] = useState({ name: "", description: "", category: "", collegeId: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const data = await getColleges();
        setColleges(data);
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.collegeId) {
          setForm((current) => ({ ...current, collegeId: user.collegeId }));
        }
      } catch {
        setError("Failed to load colleges");
      }
    };

    fetchColleges();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.collegeId) {
      setError("Please select a college");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("collegeId", form.collegeId);
      if (image) formData.append("image", image);

      await createClub(formData);
      toast.success("Club created successfully");
      navigate("/clubs");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create club";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Create"
        title="Create a club"
        description="Set up a polished club profile that can publish and manage campus events."
        actions={
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-5 sm:p-6">
          {error && (
            <div className="mb-5 rounded-xl border border-[color-mix(in_srgb,var(--color-danger)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)] px-4 py-3 text-[var(--color-danger)]" role="alert">
              {error}
            </div>
          )}

          <div className="grid gap-5">
            <Field label="Club Name" name="name" value={form.name} onChange={handleChange} required success={form.name.length > 2 ? "Name is ready" : ""} />
            <Field label="Description" name="description" as="textarea" value={form.description} onChange={handleChange} />
            <Field label="Category" name="category" value={form.category} onChange={handleChange} success={form.category ? "Category added" : ""} />
            <Field as="select" label="College" name="collegeId" value={form.collegeId} onChange={handleChange} required error={!form.collegeId && error ? "College is required" : ""}>
              <option value="">Select a college</option>
              {colleges.map((college) => (
                <option key={college._id} value={college._id}>
                  {college.name}
                </option>
              ))}
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" loading={loading} className="flex-1" size="lg">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Create Club
            </Button>
            <Button type="button" variant="ghost" className="flex-1" size="lg" onClick={() => navigate("/clubs")}>
              Cancel
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <ImageUploader
            label="Club image"
            value={imagePreview}
            onChange={({ file, preview }) => {
              setImage(file);
              setImagePreview(preview);
            }}
            onRemove={() => {
              setImage(null);
              setImagePreview("");
            }}
          />
        </Card>
      </form>
    </div>
  );
}

export default CreateClub;
