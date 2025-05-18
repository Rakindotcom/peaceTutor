import React, { useState } from "react";
  import { auth } from "../firebase";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { useNavigate } from "react-router-dom";

  const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/admin");
      } catch (err) {
        console.error("Login error:", err);
        setError(err.code === "auth/wrong-password" || err.code === "auth/user-not-found"
          ? "Invalid email or password."
          : "Failed to log in. Please try again.");
      }
    };

    return (
      <div className="max-w-md mx-auto px-6 py-12 bg-white rounded-2xl shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Admin Login</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
      </div>
    );
  };

  export default AdminLogin;