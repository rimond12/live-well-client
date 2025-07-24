import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Fetch only members
  const fetchMembers = () => {
    setLoading(true);
    axiosSecure
      .get("/members")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Handle remove (role -> user)
  const handleRemove = (memberId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This member will lose access to the member dashboard.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/members/${memberId}/remove`)
          .then((res) => {
            if (res.data.success) {
              setMembers((prev) => prev.filter((m) => m._id !== memberId));
              Swal.fire("Removed!", "Member is now a normal user.", "success");
            }
          })
          .catch((err) =>
            Swal.fire("Error!", "Failed to remove member.", "error")
          );
      }
    });
  };

  if (loading) return <p>Loading members...</p>;
  if (members.length === 0) return <p>No members found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Manage Members</h2>
      <table className="min-w-full border-collapse text-center">
        <thead>
          <tr className="bg-indigo-200 text-indigo-900 uppercase text-sm font-semibold tracking-wide">
            <th className="p-3 border border-indigo-300">Name</th>
            <th className="p-3 border border-indigo-300">Email</th>
            <th className="p-3 border border-indigo-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id} className="hover:bg-indigo-50 transition">
              <td className="border border-indigo-300 p-3">
                {member.name || member.displayName || "No Name"}
              </td>
              <td className="border border-indigo-300 p-3 truncate max-w-xs">
                {member.email}
              </td>
              <td className="border border-indigo-300 p-3 space-x-2">
                <button
                  onClick={() => handleRemove(member._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                >
                  Remove
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
