import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">

      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">

        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-wide">
            🚀 RegAlert
          </h1>
          <p className="text-sm mt-2 text-gray-200">
            Create Your Opportunity Manager
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full mt-1 p-3 rounded-lg bg-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 rounded-lg bg-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full mt-1 p-3 rounded-lg bg-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white text-indigo-600 font-bold hover:scale-105 transition-transform duration-200"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 border-t border-white/40"></div>

        {/* Footer */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="underline hover:text-gray-200"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;