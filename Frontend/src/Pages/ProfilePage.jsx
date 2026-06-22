import { useMemo, useState } from "react";
import { createElement } from "react";
import { CalendarDays, Mail, MapPin, Save, ShieldCheck, Trash2, UploadCloud, UserRound } from "lucide-react";
import { toast } from "react-hot-toast";
import { getLoggedInUser } from "../api/auth";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ImageUploader from "../components/ui/ImageUploader";
import StatCard from "../components/ui/StatCard";

const STORAGE_KEY = "event_bridge_profile_media";

function getStoredMedia() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function Profile() {
  const user = getLoggedInUser();
  const storedMedia = useMemo(() => getStoredMedia(), []);
  const [avatar, setAvatar] = useState(storedMedia.avatar || "");
  const [cover, setCover] = useState(storedMedia.cover || "");
  const [pendingAvatar, setPendingAvatar] = useState("");
  const [pendingCover, setPendingCover] = useState("");
  const [avatarPosition, setAvatarPosition] = useState(storedMedia.avatarPosition || 50);

  if (!user) {
    return (
      <Card className="mx-auto max-w-lg p-8 text-center">
        <p className="text-[var(--color-text-2)]">Please login to view your profile.</p>
      </Card>
    );
  }

  const initials =
    user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  const persistMedia = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const confirmAvatar = () => {
    const next = { ...getStoredMedia(), avatar: pendingAvatar, avatarPosition };
    setAvatar(pendingAvatar);
    setPendingAvatar("");
    persistMedia(next);
    toast.success("Avatar updated");
  };

  const confirmCover = () => {
    const next = { ...getStoredMedia(), cover: pendingCover };
    setCover(pendingCover);
    setPendingCover("");
    persistMedia(next);
    toast.success("Cover photo updated");
  };

  const removeAvatar = () => {
    const next = { ...getStoredMedia(), avatar: "" };
    setAvatar("");
    setPendingAvatar("");
    persistMedia(next);
    toast.success("Avatar removed");
  };

  const removeCover = () => {
    const next = { ...getStoredMedia(), cover: "" };
    setCover("");
    setPendingCover("");
    persistMedia(next);
    toast.success("Cover removed");
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Card className="overflow-hidden">
        <div className="relative h-56 overflow-hidden bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary),var(--color-accent))] sm:h-72">
          {cover && (
            <img
              src={cover}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-95 transition duration-300"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
        </div>

        <div className="px-5 pb-8 sm:px-8">
          <div className="-mt-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="group grid h-32 w-32 place-items-center overflow-hidden rounded-full border-4 border-[var(--color-surface)] bg-[var(--color-card)] text-4xl font-bold text-[var(--color-primary)] shadow-xl transition duration-300 hover:scale-105">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={`${user.name} avatar`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300"
                    style={{ objectPosition: `center ${avatarPosition}%` }}
                  />
                ) : (
                  initials
                )}
              </div>

              <div className="pb-1">
                <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--color-success)_13%,transparent)] px-3 py-1 text-sm font-semibold text-[var(--color-success)]">
                  <ShieldCheck className="h-4 w-4" />
                  Verified profile
                </p>
                <h1 className="font-display text-3xl font-bold text-[var(--color-text-1)] md:text-[36px]">{user.name}</h1>
                <p className="mt-2 text-[var(--color-text-2)]">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">
                <UploadCloud className="h-4 w-4" aria-hidden="true" />
                Media ready
              </Button>
              <Button variant="ghost" onClick={removeAvatar}>
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Remove avatar
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-6">
              <Card className="p-5 shadow-none">
                <h2 className="font-display text-2xl font-bold text-[var(--color-text-1)]">Profile overview</h2>
                <p className="mt-3 max-w-3xl leading-7 text-[var(--color-text-2)]">
                  A campus member profile for discovering clubs, managing event publishing, and coordinating activity across Event Bridge.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Info icon={UserRound} label="Role" value={user.role?.replace("_", " ") || "Member"} />
                  <Info icon={CalendarDays} label="Joined" value={joined} />
                  <Info icon={Mail} label="Contact" value={user.email} />
                  <Info icon={MapPin} label="College" value={user.collegeId?.name || user.collegeId || "Assigned college"} />
                </div>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                <StatCard label="Events viewed" value={12} icon={CalendarDays} progress={72} />
                <StatCard label="Clubs followed" value={4} icon={UserRound} tone="secondary" progress={45} />
                <StatCard label="Profile strength" value={86} icon={ShieldCheck} tone="success" progress={86} />
              </div>
            </div>

            <Card className="p-5">
              <h2 className="font-display text-xl font-bold text-[var(--color-text-1)]">Profile media</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-2)]">
                Preview images locally, tune the avatar crop, then confirm the change.
              </p>

              <div className="mt-5 grid gap-6">
                <ImageUploader
                  label="Avatar"
                  avatar
                  value={pendingAvatar || avatar}
                  onChange={({ preview }) => setPendingAvatar(preview)}
                  onRemove={removeAvatar}
                />

                {(pendingAvatar || avatar) && (
                  <label className="block text-sm font-medium text-[var(--color-text-2)]">
                    Avatar crop position
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={avatarPosition}
                      onChange={(e) => setAvatarPosition(e.target.value)}
                      className="mt-2 w-full accent-[var(--color-primary)]"
                    />
                  </label>
                )}

                {pendingAvatar && (
                  <Button onClick={confirmAvatar}>
                    <Save className="h-4 w-4" aria-hidden="true" />
                    Confirm Avatar
                  </Button>
                )}

                <ImageUploader
                  label="Cover photo"
                  value={pendingCover || cover}
                  onChange={({ preview }) => setPendingCover(preview)}
                  onRemove={removeCover}
                />

                {pendingCover && (
                  <Button onClick={confirmCover}>
                    <Save className="h-4 w-4" aria-hidden="true" />
                    Confirm Cover
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_58%,transparent)] p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
        {createElement(icon, { className: "h-4 w-4" })}
        {label}
      </div>
      <p className="break-words text-sm capitalize text-[var(--color-text-1)]">{value}</p>
    </div>
  );
}

export default Profile;
