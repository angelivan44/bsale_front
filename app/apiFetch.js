const BASE_URL = "https://immense-beach-55627.herokuapp.com";

async function apiFetch(...args) {
  const response = await fetch(...args);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors);
  }
  if (response.status !== 204) {
    return await response.json();
  }
  return response.text;
}

export { BASE_URL, apiFetch };
