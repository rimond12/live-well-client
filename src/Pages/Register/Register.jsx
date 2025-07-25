import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import Lottie from "lottie-react";

// Lottie animation
import registerAnimation from "../../lotties/Register.json";

const imgbbAPIKey = import.meta.env.VITE_image_upload_key;

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  // For file input
  const [selectedFileName, setSelectedFileName] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFileName("");
      setPreviewSrc("");
    }
  };

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

      const userInfo = {
        email,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
        displayName: name,
      };

      await axiosInstance.post("/users", userInfo);

      const formData = new FormData();
      formData.append("image", photoFile);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );

      const photoURL = imgbbRes.data.data.display_url;

      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);
      await Swal.fire("Success", "Account created successfully!", "success");
      navigate("/");
    } catch (err) {
      console.error("Register error:", err.message);
      setError(err.message);
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1ea] to-[#e4ded4] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Animation */}
        <div className="hidden md:flex items-center justify-center bg-[#f5f1ea]">
          <Lottie
            animationData={registerAnimation}
            loop={true}
            className="w-3/4"
          />
        </div>

        {/* Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-[#a38966] mb-8">
            Create an Account
          </h2>
          <form onSubmit={handleRegister} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#a38966] focus:outline-none"
            />

            {/* Custom file input with preview */}
            <div>
              <label
                htmlFor="photo"
                className="cursor-pointer flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:border-[#a38966] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#a38966]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3l-4 4-4-4"
                  />
                </svg>
                <span className="text-gray-700">
                  {selectedFileName || "Upload Profile Photo"}
                </span>
              </label>
              <input
                id="photo"
                type="file"
                name="photo"
                accept="image/*"
                required
                className="hidden"
                onChange={handleFileChange}
              />
              {/* Image preview */}
              {previewSrc && (
                <img
                  src={previewSrc}
                  alt="Preview"
                  className="mt-2 h-24 w-24 object-cover rounded-md border border-gray-300"
                />
              )}
            </div>

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
              disabled={isUploading}
              className="w-full bg-black text-white py-3 rounded-lg font-medium 
                        hover:bg-[#a38966] hover:text-black transition-all duration-300"
            >
              {isUploading ? "Uploading..." : "Register"}
            </button>
          </form>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#a38966] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
