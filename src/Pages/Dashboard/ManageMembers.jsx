import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageMembers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchUsers = () => {
    setLoading(true);
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    axiosSecure
      .patch(`/users/${userId}/role`, { role: newRole })
      .then(() => fetchUsers())
      .catch((err) => console.error(err));
  };

  const handleDelete = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    axiosSecure
      .delete(`/users/${userId}`)
      .then(() => fetchUsers())
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Loading users...</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        Manage Members
      </h2>
      <table className="min-w-full border-collapse text-center">
        <thead>
          <tr className="bg-indigo-200 text-indigo-900 uppercase text-sm font-semibold tracking-wide">
            <th className="p-3 border border-indigo-300">Name</th>
            <th className="p-3 border border-indigo-300">Email</th>
            <th className="p-3 border border-indigo-300">Role</th>
            <th className="p-3 border border-indigo-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-indigo-50 transition">
              <td className="border border-indigo-300 p-3">
                {user.name || user.userName || "No Name"}
              </td>
              <td className="border border-indigo-300 p-3 truncate max-w-xs">
                {user.email}
              </td>
              <td className="border border-indigo-300 p-3 capitalize font-semibold">
                {user.role}
              </td>
              <td className="border border-indigo-300 p-3 space-x-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="user">User</option>
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMembers;
