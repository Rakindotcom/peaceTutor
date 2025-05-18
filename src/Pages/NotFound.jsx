import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "/logo.png"; // Update path if needed

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 text-center px-4">
      <img src={logo} alt="Logo" className="w-16 h-16 mb-6 animate-bounce" />
      <h1 className="text-7xl font-extrabold text-purple-600 drop-shadow-lg">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">Oops! This page doesn't exist.</p>
      <p className="text-gray-600 mt-2 max-w-md">
        Maybe the link is broken or you typed the wrong address. Don’t worry, let’s get you back home.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg shadow-md transition"
      >
        <ArrowLeft size={20} /> Go Back Home
      </Link>
    </div>
  );
}