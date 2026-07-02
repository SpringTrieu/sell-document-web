const API_URL = "http://localhost:5000/api/auth";

export async function login(data) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  return await res.json();
}

export async function logout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  return await res.json();

}

export async function updateProfile(data) {
  const res = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return await res.json();
}