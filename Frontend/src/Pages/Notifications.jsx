import { useEffect, useState } from "react";
import { Bell, CheckCircle, Inbox } from "lucide-react";
import { getNotifications, markNotificationRead, markAllNotificationsRead } from "../api/notifications";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import PageHeader from "../components/ui/PageHeader";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getNotifications();
      setNotifications(response.data.notifications || []);
    } catch (err) {
      console.error("Fetch notifications error:", err);
      setError("Could not load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      await fetchNotifications();
    } catch (err) {
      console.error("Mark notification read error:", err);
      setError("Could not update notification status.");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      await fetchNotifications();
    } catch (err) {
      console.error("Mark all read error:", err);
      setError("Could not update notification status.");
    }
  };

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Notifications"
        title="Activity updates"
        description="Get real-time updates from clubs you follow and stay notified when new events are published."
        actions={
          notifications.length > 0 && (
            <Button variant="secondary" onClick={handleMarkAllRead}>
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              Mark all read
            </Button>
          )
        }
      />

      {error && (
        <Card className="mb-6 rounded-xl border border-[color-mix(in_srgb,var(--color-danger)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)] px-4 py-3 text-[var(--color-danger)]" role="alert">
          {error}
        </Card>
      )}

      {loading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, idx) => (
            <Card key={idx} className="h-24 animate-pulse" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No notifications yet"
          description="Follow a club and new event notifications will appear here instantly."
        />
      ) : (
        <div className="grid gap-4">
          <div className="flex items-center justify-between rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
            <p className="text-sm font-medium text-[var(--color-text-2)]">{unreadCount} unread notification{unreadCount === 1 ? "" : "s"}</p>
          </div>
          {notifications.map((notification) => (
            <Card key={notification._id} className="flex flex-col gap-4 p-5">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-[var(--color-primary)]">
                  <Bell className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--color-text-1)]">{notification.message}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-2)]">
                    {notification.clubId?.name ? `${notification.clubId.name} · ` : ""}
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notification.isRead && (
                  <Button variant="secondary" size="sm" onClick={() => handleMarkRead(notification._id)}>
                    Mark read
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
