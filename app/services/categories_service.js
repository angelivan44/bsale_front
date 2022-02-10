import { apiFetch, BASE_URL } from "../apiFetch.js";

export const listCategories = () =>
  apiFetch(`${BASE_URL}/categories`, {
    method: "GET",
  });
