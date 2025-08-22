import axios from "axios";
import { API_URL, API_KEY } from "@env";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "app-id": API_KEY,
  },
});
