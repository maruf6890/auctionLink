import React, { createContext, useState, useEffect } from "react";
import authService from "./aurh"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setUser(null); // Ensure user is null if fetching fails
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const session = await authService.login(email, password);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      return session;
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw to handle in the component
    }
  };

  const signup = async ({ email, password, name }) => {
    if (!email || !password || !name) {
        throw new Error("All fields are required.");
    }
    try {
        await authService.createAccount({ email, password, name });
        await login(email, password); // Automatically log in the user
    } catch (err) {
        console.error("Signup error:", err);
        throw err;
    }
};

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const value = {
    user,
    signup,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
