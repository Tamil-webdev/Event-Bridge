import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Plus, Search, Sparkles, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EventCard from "../componants/EventCard";
import { getEvents } from "../api/event";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import StatCard from "../components/ui/StatCard";
import EmptyState from "../components/ui/EmptyState";
import { CardGridSkeleton } from "../components/ui/Skeleton";

function Home() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      const allEvents = Array.isArray(res.data) ? res.data : res.data?.events || [];

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const futureEvents = allEvents
        .filter((event) => {
          if (!event.eventDate) return false;
          return new Date(event.eventDate) >= today;
        })
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

      setEvents(futureEvents);
    } catch (err) {
      console.error(err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    if (!searchTerm.trim()) return events;
    return events.filter((event) => event.title?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [events, searchTerm]);

  const uniqueClubs = new Set(events.map((event) => event.clubId?._id || event.clubId?.name).filter(Boolean)).size;
  const thisWeek = events.filter((event) => {
    const date = new Date(event.eventDate);
    const now = new Date();
    const weekOut = new Date();
    weekOut.setDate(now.getDate() + 7);
    return date >= now && date <= weekOut;
  }).length;

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Dashboard"
        title="Discover campus events"
        description="Browse upcoming workshops, meetups, and club-led activities in one polished workspace."
        actions={
          <Button onClick={() => navigate("/clubs")}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Explore Clubs
          </Button>
        }
      />

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Upcoming events" value={events.length} icon={CalendarDays} progress={82} />
        <StatCard label="Active clubs" value={uniqueClubs} icon={Users} tone="secondary" progress={64} />
        <StatCard label="This week" value={thisWeek} icon={TrendingUp} tone="accent" progress={48} />
      </section>

      <section className="mb-8 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] p-3 text-[var(--color-primary)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-[var(--color-text-1)]">Event pipeline</h2>
              <p className="text-sm text-[var(--color-text-2)]">Sorted by nearest date and filtered to future events.</p>
            </div>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-2)]" />
            <input
              type="search"
              placeholder="Search events by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] pl-11 pr-4 text-sm text-[var(--color-text-1)] outline-none transition focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]"
            />
          </div>
        </div>
      </section>

      {error && (
        <div className="mb-8 rounded-xl border border-[color-mix(in_srgb,var(--color-danger)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)] px-4 py-3 text-[var(--color-danger)]" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <CardGridSkeleton />
      ) : filteredEvents.length === 0 ? (
        <EmptyState
          title={searchTerm ? "No matching events" : "No events available"}
          description={
            searchTerm
              ? `No events matched "${searchTerm}". Try another title or browse clubs.`
              : "There are no upcoming events yet. Visit clubs to find teams that may publish soon."
          }
          actionLabel="Browse Clubs"
          onAction={() => navigate("/clubs")}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
