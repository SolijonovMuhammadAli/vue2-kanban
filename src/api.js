import axios from "axios";

const api = axios.create({
  baseURL: "https://7b94-213-230-92-69.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  // kerak bo'lsa token qo'shish mumkin:
  // headers: { Authorization: `Bearer ${token}` }
});

export default api;
