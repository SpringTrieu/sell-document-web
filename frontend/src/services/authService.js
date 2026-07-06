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
  try {
    const res = await fetch(`${API_URL}/me`, {
      method: "GET",
      credentials: "include",
      signal: AbortSignal.timeout(3000), // fail fast sau 3s khi backend offline
    });

    return await res.json();
  } catch {
    // Backend chưa chạy hoặc network error — trả về thất bại yên lặng
    return { success: false };
  }
}

export async function logout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  return await res.json();


}