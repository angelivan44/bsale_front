import { apiFetch, BASE_URL } from "../apiFetch.js";

export const searchProduct = (search) =>
  apiFetch(`${BASE_URL}/query/${search}`, {
    method: "GET",
  });
