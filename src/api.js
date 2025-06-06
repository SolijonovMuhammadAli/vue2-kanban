import axios from "axios";

const api = axios.create({
  baseURL: "https://de31-2a05-45c2-620b-8e00-a5f5-ce10-6adc-90f6.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  // kerak bo'lsa token qo'shish mumkin:
  // headers: { Authorization: `Bearer ${token}` }
});

export default api;
