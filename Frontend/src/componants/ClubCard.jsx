import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Building2 } from "lucide-react";
import Card from "../components/ui/Card";

const DEFAULT_CLUB_IMAGE =
  "https://img.freepik.com/free-vector/team-mobile-web-app-development_107791-12795.jpg?semt=ais_hybrid&w=740&q=80";

function ClubCard({ club }) {
  const navigate = useNavigate();
  const imageUrl = club.image ? `${import.meta.env.VITE_API_URL}${club.image}` : DEFAULT_CLUB_IMAGE;

  return (
    <Card
      as="button"
      type="button"
      interactive
      onClick={() => navigate(`/clubs/${club._id}`)}
      className="flex h-full w-full flex-col overflow-hidden text-left"
    >
      <div className="aspect-[16/10] overflow-hidden bg-[color-mix(in_srgb,var(--color-border)_50%,transparent)]">
        <img
          src={imageUrl}
          alt={club.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEFAULT_CLUB_IMAGE;
          }}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] p-3 text-[var(--color-primary)]">
            <Building2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <ArrowUpRight className="h-5 w-5 text-[var(--color-text-2)]" aria-hidden="true" />
        </div>
        <h3 className="font-display text-xl font-bold text-[var(--color-text-1)]">{club.name}</h3>
        <p className="mt-1 text-sm font-medium text-[var(--color-primary)]">
          {club.collegeId?.name || "Unknown College"}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--color-text-2)]">
          {club.description || "Explore events and announcements from this campus club."}
        </p>
      </div>
    </Card>
  );
}

export default ClubCard;
