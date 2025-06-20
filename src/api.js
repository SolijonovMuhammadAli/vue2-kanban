import axios from "axios";

const api = axios.create({
  baseURL: "https://tester.gohouse.uz/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

export default api;
