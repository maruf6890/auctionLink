import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../Apprwite/AuthProvider";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext); // Use login from context
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password); // Call login from context
            navigate("/"); // Redirect to home
        } catch (err) {
            setError("Invalid email or password. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <button type="submit" className="btn btn-primary w-full">
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
