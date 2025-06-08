import axios from "axios";

const api = axios.create({
  baseURL: "https://d571-185-139-138-47.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

export default api;
