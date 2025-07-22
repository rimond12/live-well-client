import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const imgbbAPIKey = import.meta.env.VITE_image_upload_key; // 🟡 Replace this with your actual key

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoFile = form.photo.files[0];

    if (!photoFile) return toast.error("Please upload a profile photo.");

    // Password validation
    if (!/[A-Z]/.test(password)) {
      return toast.error("Must have at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      return toast.error("Must have at least one lowercase letter.");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      setIsUploading(true);

      // Upload photo to imgbb
      const formData = new FormData();
      formData.append("image", photoFile);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );

      const photoURL = imgbbRes.data.data.display_url;
      console.log("Uploaded image URL:", photoURL);

      // Create user with Firebase
      const result = await createUser(email, password);
      console.log("✅ Firebase created user:", result.user);

      await updateUserProfile(name, photoURL);
      await Swal.fire("Success", "Account created successfully!", "success");

      navigate("/");
    } catch (err) {
      console.error("❌ Register error:", err.message);
      setError(err.message);
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
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
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {isUploading ? "Uploading..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-red-500 mt-2">{error}</p>
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
