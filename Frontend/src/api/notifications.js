import API from "./api";

export const getNotifications = () => API.get("/notifications");
export const markNotificationRead = (notificationId) =>
  API.patch(`/notifications/${notificationId}/read`);
export const markAllNotificationsRead = () => API.patch("/notifications/read-all");
