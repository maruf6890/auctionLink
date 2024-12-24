import React, { useState, useRef } from "react";
import authService from "../Apprwite/aurh";
import '../app.css';

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    setSuccess("");

    try {
      await authService.createAccount({email, password, name});
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      console.error("Registration error:", err);
      if (err.message.includes("email")) {
        setError((prev) => ({ ...prev, email: "Invalid email address." }));
        emailRef.current.focus();
      } else if (err.message.includes("password")) {
        setError((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters.",
        }));
        passwordRef.current.focus();
      } else {
        setError((prev) => ({ ...prev, general: "Registration failed. Try again." }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        {error.general && (
          <div className="mb-4 text-red-500 text-sm" aria-live="assertive">
            {error.general}
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-500 text-sm" aria-live="polite">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="theme-input"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`theme-input ${error.email ? "border-red-500" : ""}`}
              placeholder="Enter your email"
              required
            />
            {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`theme-input ${error.password ? "border-red-500" : ""}`}
              placeholder="Enter a password"
              minLength="8"
              required
            />
            {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
          </div>

          <div className="mb-6">
            <button type="submit" className={`theme-button ${loading ? "opacity-50" : ""}`} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
