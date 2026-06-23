import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";
import { getEventById, updateEvent } from "../api/event";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Field from "../components/ui/Field";
import ImageUploader from "../components/ui/ImageUploader";
import PageHeader from "../components/ui/PageHeader";
import { Skeleton } from "../components/ui/Skeleton";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", description: "", eventDate: "", eventTime: "", venue: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id);
        const event = res.data;
        setForm({
          title: event.title || "",
          description: event.description || "",
          eventDate: event.eventDate ? new Date(event.eventDate).toISOString().split("T")[0] : "",
          eventTime: event.eventTime || "",
          venue: event.venue || "",
        });
        setImagePreview(event.image ? (event.image.startsWith("http") ? event.image : `${import.meta.env.VITE_BACKEND_URL}${event.image}`) : "");
      } catch (err) {
        console.error("Failed to fetch event", err);
        setError("Failed to load event details");
        toast.error("Could not load event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (image) formData.append("image", image);

      await updateEvent(id, formData);
      toast.success("Event updated successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update event");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl">
        <Skeleton className="mb-8 h-24 w-full" />
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Skeleton className="h-[460px]" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-xl p-8 text-center text-[var(--color-danger)]" role="alert">
        {error}
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Update"
        title="Edit event"
        description="Refresh event details while keeping the publishing flow fast and predictable."
        actions={
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-5 sm:p-6">
          <div className="grid gap-5">
            <Field label="Title" name="title" value={form.title} onChange={handleChange} required success={form.title.length > 2 ? "Ready to save" : ""} />
            <Field label="Description" name="description" as="textarea" value={form.description} onChange={handleChange} required />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Date" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} required />
              <Field label="Time" name="eventTime" type="time" value={form.eventTime} onChange={handleChange} required />
            </div>
            <Field label="Venue" name="venue" value={form.venue} onChange={handleChange} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" loading={submitting} className="flex-1" size="lg">
              <Save className="h-4 w-4" aria-hidden="true" />
              Update Event
            </Button>
            <Button type="button" variant="ghost" className="flex-1" size="lg" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <ImageUploader
            label="Event image"
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

export default EditEvent;
