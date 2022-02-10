import { apiFetch, BASE_URL } from "../apiFetch.js";

export const listProducts = () =>
  apiFetch(`${BASE_URL}/products`, {
    method: "GET",
  });
