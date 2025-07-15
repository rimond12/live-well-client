import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signIn, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        console.log(result);
        
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Invalid credentials!");
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google");
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
            Login
          </button>
        </form>
        <p className="text-sm text-red-500 mt-2">{error}</p>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogle}
            className="flex items-center justify-center gap-2 w-full border py-2 rounded-lg hover:bg-gray-100"
          >
            <FaGoogle /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
