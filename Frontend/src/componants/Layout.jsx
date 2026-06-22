import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createElement } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { getLoggedInUser, logout } from "../api/auth";
import { getNotifications } from "../api/notifications";
import { useTheme } from "../context/ThemeContext";
import Button from "../components/ui/Button";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) {
        setUnreadCount(0);
        return;
      }

      try {
        const response = await getNotifications();
        const notifications = response.data.notifications || [];
        setUnreadCount(notifications.filter((notification) => !notification.isRead).length);
      } catch {
        setUnreadCount(0);
      }
    };

    fetchNotifications();
  }, [user]);

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "EB";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <ProtectedRoute>
      <div className="app-shell flex">
        <aside
          className={[
            "fixed inset-y-0 left-0 z-40 hidden border-r border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)] backdrop-blur-xl transition-all duration-300 lg:flex lg:flex-col",
            collapsed ? "w-20" : "w-72",
          ].join(" ")}
          aria-label="Primary navigation"
        >
          <div className="flex h-20 items-center justify-between px-5">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-3 rounded-xl text-left"
              aria-label="Go to dashboard"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))] text-white shadow-lg shadow-blue-500/20">
                <CalendarDays className="h-5 w-5" />
              </span>
              {!collapsed && (
                <span>
                  <span className="block font-display text-xl font-bold text-[var(--color-text-1)]">Event Bridge</span>
                  <span className="text-xs font-medium text-[var(--color-text-2)]">Campus events suite</span>
                </span>
              )}
            </button>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-2">
            <SideItem collapsed={collapsed} to="/" icon={LayoutDashboard} label="Dashboard" />
            <SideItem collapsed={collapsed} to="/clubs" icon={Users} label="Clubs" />
            <SideItem collapsed={collapsed} to="/create-club" icon={Plus} label="Create Club" />
            <SideItem collapsed={collapsed} to="/profile" icon={User} label="Profile" />
          </nav>

          <div className="border-t border-[var(--color-border)] p-4">
            <button
              type="button"
              onClick={() => setCollapsed((current) => !current)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-3 py-2 text-sm font-semibold text-[var(--color-text-2)] hover:bg-[color-mix(in_srgb,var(--color-border)_35%,transparent)]"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {!collapsed && "Collapse"}
            </button>
          </div>
        </aside>

        <div className={["min-w-0 flex-1 transition-all duration-300", collapsed ? "lg:pl-20" : "lg:pl-72"].join(" ")}>
          <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_84%,transparent)] backdrop-blur-xl">
            <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
              <div className="relative hidden flex-1 md:block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-2)]" />
                <input
                  type="search"
                  placeholder="Search events, clubs, colleges..."
                  className="h-11 w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] pl-11 pr-4 text-sm text-[var(--color-text-1)] shadow-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]"
                  aria-label="Global search"
                />
              </div>

              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                <TopIconButton aria-label="Notifications" onClick={() => navigate("/notifications")}> 
                  <Bell className="h-5 w-5" />
                </TopIconButton>
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[var(--color-danger)] px-1.5 text-[10px] font-semibold text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
                <TopIconButton aria-label="Settings" onClick={() => navigate("/profile")}>
                  <Settings className="h-5 w-5" />
                </TopIconButton>
                <TopIconButton aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"} onClick={toggleTheme}>
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </TopIconButton>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((current) => !current)}
                    className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 text-left shadow-sm"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] text-sm font-bold text-[var(--color-primary)]">
                      {initials}
                    </span>
                    <span className="hidden sm:block">
                      <span className="block text-sm font-semibold text-[var(--color-text-1)]">{user?.name || "User"}</span>
                      <span className="block text-xs capitalize text-[var(--color-text-2)]">{user?.role?.replace("_", " ") || "Member"}</span>
                    </span>
                  </button>

                  {menuOpen && (
                    <div
                      className="absolute right-0 mt-3 w-56 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-2xl"
                      role="menu"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/profile");
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-[var(--color-text-2)] hover:bg-[color-mix(in_srgb,var(--color-border)_38%,transparent)]"
                        role="menuitem"
                      >
                        <User className="h-4 w-4" />
                        View profile
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-[var(--color-danger)] hover:bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)]"
                        role="menuitem"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-[var(--color-border)] px-4 py-3 lg:hidden">
              <MobileItem to="/" icon={LayoutDashboard} label="Dashboard" />
              <MobileItem to="/clubs" icon={Users} label="Clubs" />
              <MobileItem to="/create-club" icon={Plus} label="Create" />
              <MobileItem to="/profile" icon={User} label="Profile" />
            </div>
          </header>

          <main className="page-shell px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function SideItem({ to, icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition",
          isActive
            ? "bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-[var(--color-primary)]"
            : "text-[var(--color-text-2)] hover:bg-[color-mix(in_srgb,var(--color-border)_35%,transparent)] hover:text-[var(--color-text-1)]",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={[
              "absolute left-0 h-7 w-1 rounded-r-full bg-[var(--color-primary)] transition-all duration-300",
              isActive ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
          {createElement(icon, { className: "h-5 w-5 shrink-0", "aria-hidden": "true" })}
          {!collapsed && <span>{label}</span>}
        </>
      )}
    </NavLink>
  );
}

function MobileItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
          isActive
            ? "bg-[var(--color-primary)] text-white"
            : "bg-[var(--color-surface)] text-[var(--color-text-2)] border border-[var(--color-border)]",
        ].join(" ")
      }
    >
      {createElement(icon, { className: "h-4 w-4", "aria-hidden": "true" })}
      {label}
    </NavLink>
  );
}

function TopIconButton({ children, ...props }) {
  return (
    <Button size="icon" variant="ghost" className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]" {...props}>
      {children}
    </Button>
  );
}

export default Layout;
