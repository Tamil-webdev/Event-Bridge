import api from "./api";

export const getColleges = async () => {
  const res = await api.get("/colleges");
  return res.data;
};
