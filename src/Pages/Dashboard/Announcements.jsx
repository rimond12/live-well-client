import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Announcements = () => {
  const axiosSecure = useAxiosSecure();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axiosSecure.get("/announcements").then((res) => {
      setAnnouncements(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Latest Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map((item) => (
          <div key={item._id} className="border rounded-xl p-4 shadow bg-white">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-gray-700">{item.description}</p>
            <p className="mt-3 text-sm text-gray-500">
              {new Date(item.date).toLocaleString()}
            </p>
          </div>
        ))}
        {announcements.length === 0 && (
          <p className="text-gray-500">No announcements found.</p>
        )}
      </div>
    </div>
  );
};

export default Announcements;
