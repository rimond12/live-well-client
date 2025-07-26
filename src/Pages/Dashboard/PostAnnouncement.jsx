import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaBullhorn } from "react-icons/fa";
import toast from "react-hot-toast";

const PostAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await axiosSecure.post("/announcements", {
        title,
        description,
      });
      if (res.data.insertedId) {
        setMessage({
          type: "success",
          text: "Announcement posted successfully!",
        });
        setTitle("");
        setDescription("");
      } else {
        setMessage({ type: "error", text: "Failed to post announcement." });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Try again later.",
      });
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto mt-14 bg-white rounded-2xl shadow-xl border border-[#c7b39a]/40 p-8"
    >
      <h2 className="text-3xl font-bold text-[#111111] flex items-center gap-3 mb-6">
        <FaBullhorn className="text-[#c7b39a]" /> Post Announcement
      </h2>

      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg font-semibold ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block font-semibold text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-[#c7b39a] focus:ring focus:ring-[#c7b39a]/40 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter announcement title"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-semibold text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-[#c7b39a] focus:ring focus:ring-[#c7b39a]/40 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter announcement details"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md bg-[#111111] text-white font-semibold hover:bg-[#333333] transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Posting..." : "Post Announcement"}
        </button>
      </form>
    </motion.div>
  );
};

export default PostAnnouncement;
