import api from "./api";

export const getClubs = async () => {
  const res = await api.get("/clubs");
  return res.data;
};

export const getClubById = async (id) => {
  const res = await api.get(`/clubs/${id}`);
  return res.data;
};

export const createClub = async (data) => {
  const res = await api.post("/clubs", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const followClub = async (id) => {
  const res = await api.post(`/clubs/${id}/follow`);
  return res.data;
};

export const unfollowClub = async (id) => {
  const res = await api.delete(`/clubs/${id}/follow`);
  return res.data;
};
