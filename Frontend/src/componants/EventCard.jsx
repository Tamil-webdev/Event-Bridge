import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../api/auth";
import { deleteEvent } from "../api/event";
import { CalendarDays, Clock, Edit3, GraduationCap, MapPin, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { createElement } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const DEFAULT_IMAGE =
  "https://img.freepik.com/free-vector/hand-drawn-flat-design-innovation-concept_52683-78089.jpg?semt=ais_hybrid&w=740&q=80";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const isCreator = user?._id === event?.createdBy?._id || user?._id === event?.createdBy;

  const imageUrl = event?.image
    ? event.image.startsWith("http")
      ? event.image
      : `${import.meta.env.VITE_BACKEND_URL}${event.image}`
    : DEFAULT_IMAGE;

  const formatAddress = (address) => {
    if (!address) return "";
    return [address.num, address.street, address.area, address.city, address.state, address.pincode]
      .filter(Boolean)
      .join(", ");
  };

  const formattedDate = event?.eventDate
    ? new Date(event.eventDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TBA";

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(event._id);
      toast.success("Event deleted successfully");
      window.location.reload();
    } catch (err) {
      toast.error("Failed to delete event");
      console.error(err);
    }
  };

  return (
    <Card interactive className="group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-[color-mix(in_srgb,var(--color-border)_50%,transparent)]">
        <img
          src={imageUrl}
          alt={event?.title || "Event image"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/55 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900 shadow-sm backdrop-blur">
          {event?.clubId?.name || "Club event"}
        </div>
        {isCreator && (
          <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full bg-white/95"
              aria-label="Edit event"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/events/${event._id}/edit`);
              }}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 rounded-full bg-white/95 text-[var(--color-danger)]"
              aria-label="Delete event"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold leading-snug text-[var(--color-text-1)]">
          {event?.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-text-2)]">{event?.description}</p>

        <div className="mt-5 grid gap-3 text-sm text-[var(--color-text-2)]">
          <Meta icon={CalendarDays}>{formattedDate}</Meta>
          {event?.eventTime && <Meta icon={Clock}>{event.eventTime}</Meta>}
          {event?.venue && <Meta icon={MapPin}>{event.venue}</Meta>}
          {event?.collegeId && (
            <Meta icon={GraduationCap}>
              {event.collegeId.name}
              {event.collegeId.address ? `, ${formatAddress(event.collegeId.address)}` : ""}
            </Meta>
          )}
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-text-2)]">
            <span>Organized by {event?.createdBy?.name || "Club"}</span>
            <span className="rounded-full bg-[color-mix(in_srgb,var(--color-success)_13%,transparent)] px-2.5 py-1 font-semibold text-[var(--color-success)]">
              Upcoming
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

function Meta({ icon, children }) {
  return (
    <div className="flex items-start gap-2">
      {createElement(icon, {
        className: "mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]",
        "aria-hidden": "true",
      })}
      <span className="line-clamp-2">{children}</span>
    </div>
  );
}

export default EventCard;
