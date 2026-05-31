import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logout as logoutApi } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchCurrentUser = async () => {
    const result = await getCurrentUser();

    if (result.success) {
      setUser(result.user);
    }
  };

  const logout = async () => {
  try {
    await logoutApi();
  } catch (error) {
    console.log(error);
  } finally {
    setUser(null);
  }
};

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}