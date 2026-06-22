import API from "./api";

export const createEvent = (data) => {
  return API.post("/events", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getEvents = () => API.get("/events");

export const getEventsByClub = (clubId) =>
  API.get(`/events/club/${clubId}`);

export const getEventById = (id) =>
  API.get(`/events/${id}`);

export const updateEvent = (id, data) =>
  API.put(`/events/${id}`, data);

export const deleteEvent = (id) =>
  API.delete(`/events/${id}`);
