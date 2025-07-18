import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
      const res = await axiosSecure.post("/announcements", { title, description });
      if (res.data.insertedId) {
        setMessage({ type: "success", text: "Announcement posted successfully!" });
        setTitle("");
        setDescription("");
      } else {
        setMessage({ type: "error", text: "Failed to post announcement." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Try again later." });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">📢 Post Announcement</h2>

      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter announcement title"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-400"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter announcement details"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Posting..." : "Post Announcement"}
        </button>
      </form>
    </div>
  );
};

export default PostAnnouncement;
