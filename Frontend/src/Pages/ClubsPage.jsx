import { useEffect, useState } from "react";
import { Plus, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getClubs } from "../api/clubs";
import ClubCard from "../componants/ClubCard";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { CardGridSkeleton } from "../components/ui/Skeleton";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getClubs();
      setClubs(res.data ?? res);
    } catch (err) {
      console.error("Error fetching clubs:", err);
      setError("Failed to load clubs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Community"
        title="Clubs directory"
        description="Discover campus groups, review their events, and manage club-led programming from one place."
        actions={
          <Button onClick={() => navigate("/create-club")}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Create Club
          </Button>
        }
      />

      {error && (
        <div className="mb-8 rounded-xl border border-[color-mix(in_srgb,var(--color-danger)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)] px-4 py-3 text-[var(--color-danger)]" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <CardGridSkeleton />
      ) : clubs.length === 0 ? (
        <EmptyState
          icon={UsersRound}
          title="No clubs yet"
          description="Create the first club profile so students can discover upcoming events and activities."
          actionLabel="Create Club"
          onAction={() => navigate("/create-club")}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Clubs;
