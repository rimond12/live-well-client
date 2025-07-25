import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

// Lottie animation JSON (আপনি public ফোল্ডারে animation.json রাখবেন)
import loginAnimation from "../../lotties/Login.json";

const Login = () => {
  const { signIn, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then(() => {
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
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        await axiosInstance.post("/users", userInfo);
        toast.success("Logged in with Google");
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1ea] to-[#e4ded4] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Animation */}
        <div className="hidden md:flex items-center justify-center bg-[#f5f1ea]">
          <Lottie
            animationData={loginAnimation}
            loop={true}
            className="w-3/4"
          />
        </div>

        {/* Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-[#a38966] mb-8">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#a38966] focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#a38966] focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-medium 
                        hover:bg-[#a38966] hover:text-black transition-all duration-300"
            >
              Login
            </button>
          </form>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

          <p className="text-center mt-6 text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-[#a38966] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

          <div className="mt-6">
            <button
              onClick={handleGoogle}
              className="flex items-center justify-center gap-2 w-full border py-3 rounded-lg hover:bg-[#f5f1ea] transition"
            >
              <FaGoogle className="text-[#a38966]" /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
