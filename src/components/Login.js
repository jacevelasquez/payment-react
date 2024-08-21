import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handles changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        credentials,
        { withCredentials: true }
      );
      localStorage.setItem('userId', response.data.user.id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Navigate to Register Component
  const navRegister = () => {
    navigate("/register");
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-full max-w-md h-[350px] p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <label className="mt-3 block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
          <label className="mt-3 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 mt-6 bg-indigo-600 text-white font-bold rounded-md shadow-sm"
          >
            Login
          </button>
          <button
            onClick={navRegister}
            className="w-full py-2 px-4 mt-2 bg-green-600 text-white font-bold rounded-md shadow-sm"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
