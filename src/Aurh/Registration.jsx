import React, { useState, useContext, useRef } from "react";
import AuthContext from "../Apprwite/AuthProvider";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { signup } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    setSuccess("");

    try {
      await signup(email, password, name);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      console.error("Registration error:", err);

      // Map errors to fields
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        {/* General Error */}
        {error.general && (
          <div className="mb-4 text-red-500 text-sm" aria-live="assertive">
            {error.general}
          </div>
        )}
        {/* Success Message */}
        {success && (
          <div className="mb-4 text-green-500 text-sm" aria-live="polite">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input input-bordered w-full ${
                error.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              required
            />
            {error.email && (
              <p className="text-red-500 text-xs mt-1">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input input-bordered w-full ${
                error.password ? "border-red-500" : ""
              }`}
              placeholder="Enter a password"
              minLength="8"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters.
            </p>
            {error.password && (
              <p className="text-red-500 text-xs mt-1">{error.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {/* Redirect to Login */}
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
