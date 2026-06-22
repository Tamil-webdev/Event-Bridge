import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { createEvent } from "../api/event";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Field from "../components/ui/Field";
import ImageUploader from "../components/ui/ImageUploader";
import PageHeader from "../components/ui/PageHeader";

function CreateEvent() {
  const { clubId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", description: "", eventDate: "", eventTime: "", venue: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDateError("");
    setTimeError("");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(form.eventDate);

    if (selectedDate < today) {
      setDateError("Event date cannot be in the past.");
      return;
    }

    if (!form.eventTime) {
      setTimeError("Please select a valid time.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append("clubId", clubId);
      if (image) formData.append("image", image);

      await createEvent(formData);
      toast.success("Event created successfully");
      navigate(`/clubs/${clubId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create event.");
      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Schedule"
        title="Create event"
        description="Publish a clear, discoverable event with date, venue, and visual context."
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
            <Field label="Event Title" name="title" value={form.title} onChange={handleChange} required success={form.title.length > 2 ? "Title looks good" : ""} />
            <Field label="Description" name="description" as="textarea" value={form.description} onChange={handleChange} required />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Date" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} required error={dateError} />
              <Field label="Time" name="eventTime" type="time" value={form.eventTime} onChange={handleChange} required error={timeError} />
            </div>
            <Field label="Venue" name="venue" value={form.venue} onChange={handleChange} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" loading={loading} className="flex-1" size="lg">
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              Create Event
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

export default CreateEvent;
