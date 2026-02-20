import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

const Login = () => {
  const [formData, setFormData] = useState({
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
      const { data } = await API.post("/auth/login", formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      
      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        
        {/* Logo / Branding */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-wide">
            🚀 RegAlert
          </h1>
          <p className="text-sm mt-2 text-gray-200">
            Never Miss Any Opportunity Again
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
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
              placeholder="Enter your password"
              className="w-full mt-1 p-3 rounded-lg bg-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white text-indigo-600 font-bold hover:scale-105 transition-transform duration-200"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 border-t border-white/40"></div>

        {/* Footer */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="underline hover:text-gray-200"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;