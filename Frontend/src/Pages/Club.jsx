import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CalendarPlus, CalendarX, MapPin, UsersRound, Bell, Check, Plus } from "lucide-react";
import { getClubById, followClub, unfollowClub } from "../api/clubs";
import { getEventsByClub } from "../api/event";
import EventCard from "../componants/EventCard";
import { getLoggedInUser } from "../api/auth";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import { CardGridSkeleton } from "../components/ui/Skeleton";

function Club() {
  const { id: clubId } = useParams();
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const clubRes = await getClubById(clubId);
      const eventsRes = await getEventsByClub(clubId);
      setClub(clubRes?.club || null);
      setEvents(Array.isArray(eventsRes?.data) ? eventsRes.data : eventsRes?.data?.events || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load club data");
    } finally {
      setLoading(false);
    }
  }, [clubId]);

  useEffect(() => {
    if (clubId) fetchAllData();
  }, [clubId, fetchAllData]);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter((event) => event.eventDate && new Date(event.eventDate) >= now)
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  const pastEvents = events
    .filter((event) => event.eventDate && new Date(event.eventDate) < now)
    .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

  const isCreator = String(user?._id) === String(club?.createdBy?._id) || String(user?._id) === String(club?.createdBy);
  const [actionLoading, setActionLoading] = useState(false);

  const handleFollowToggle = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setActionLoading(true);
    try {
      if (club.isFollowing) {
        await unfollowClub(clubId);
      } else {
        await followClub(clubId);
      }
      await fetchAllData();
    } catch (err) {
      console.error("Follow error:", err);
      setError("Could not update follow status");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <CardGridSkeleton count={3} />
      </div>
    );
  }

  if (error || !club) {
    return (
      <Card className="mx-auto max-w-xl p-8 text-center text-[var(--color-danger)]" role="alert">
        {error || "Club not found"}
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Card className="mb-8 overflow-hidden">
        <div className="h-44 bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary),var(--color-accent))]" />
        <div className="p-6 sm:p-8">
          <div className="-mt-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="grid h-28 w-28 place-items-center rounded-3xl border-4 border-[var(--color-surface)] bg-[var(--color-card)] text-[var(--color-primary)] shadow-xl">
                <UsersRound className="h-11 w-11" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-[var(--color-text-1)] md:text-[36px]">{club.name}</h1>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[var(--color-text-2)]">
                  <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                  {club.collegeId?.name || "Unknown College"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={handleFollowToggle} loading={actionLoading} variant={club?.isFollowing ? "secondary" : "primary"}>
                {club?.isFollowing ? <Check className="h-4 w-4" aria-hidden="true" /> : <Bell className="h-4 w-4" aria-hidden="true" />}
                {club?.isFollowing ? "Following" : "Follow"}
              </Button>

              {isCreator && (
                <Button onClick={() => navigate(`/clubs/${clubId}/create-event`)}>
                  <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                  Create Event
                </Button>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-2)]">
            <span>{club.description}</span>
            <span className="rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-border)_15%,transparent)] px-3 py-1">
              {club.followersCount ?? 0} follower{club.followersCount === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </Card>

      <SectionTitle title="Upcoming Events" count={upcomingEvents.length} />
      {upcomingEvents.length === 0 ? (
        <EmptyState
          icon={CalendarX}
          title="No upcoming events"
          description="This club has not scheduled anything new yet. Check back later for fresh updates."
          actionLabel={isCreator ? "Create Event" : undefined}
          onAction={isCreator ? () => navigate(`/clubs/${clubId}/create-event`) : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {pastEvents.length > 0 && (
        <div className="mt-12">
          <SectionTitle title="Past Events" count={pastEvents.length} muted />
          <div className="grid grid-cols-1 gap-6 opacity-85 sm:grid-cols-2 xl:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ title, count, muted = false }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className={`h-8 w-1 rounded-full ${muted ? "bg-[var(--color-border)]" : "bg-[var(--color-primary)]"}`} />
      <h2 className="font-display text-2xl font-bold text-[var(--color-text-1)]">{title}</h2>
      <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs font-semibold text-[var(--color-text-2)]">
        {count}
      </span>
    </div>
  );
}

export default Club;
