const API_URL = "http://localhost:5000/api/universities";

export async function getUniversities() {
  const res = await fetch(`${API_URL}/`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
}