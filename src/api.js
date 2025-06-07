import axios from "axios";

const api = axios.create({
  baseURL: "https://9c3f-185-139-138-116.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
  // kerak bo'lsa token qo'shish mumkin:
  // headers: { Authorization: `Bearer ${token}` }
});

export default api;
