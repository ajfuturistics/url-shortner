import axios from "axios";

// static base url it should come from .env but i am hard coding it
export const BASE_URL = "http://localhost:5000";

export const API = axios.create({
  baseURL: BASE_URL,
});
