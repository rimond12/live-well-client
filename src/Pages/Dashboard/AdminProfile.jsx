import React, { useEffect, useState } from "react";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import useAuth from "./../../hooks/useAuth";
// তোমার Firebase user hook ধরছি
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaUsers,
  FaUserFriends,
  FaDoorOpen,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4CAF50", "#FF5252"];

const AdminProfile = () => {
  const [stats, setStats] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // logged-in Firebase user

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/admin/stats?email=${user.email}`)
        .then((res) => setStats(res.data))
        .catch((err) => console.error(err));
    }
  }, [axiosSecure, user]);

  if (!stats)
    return (
      <p className="text-center text-gray-500 mt-10">Loading admin stats...</p>
    );

  const roomData = [
    { name: "Available Rooms", value: parseFloat(stats.availablePercentage) },
    {
      name: "Unavailable Rooms",
      value: parseFloat(stats.unavailablePercentage),
    },
  ];

  return (
    <section className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Profile Header */}
      <motion.div
        className="bg-gradient-to-r from-green-50 via-white to-green-50 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6 mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={user.photoURL}
          alt="Admin"
          className="w-32 h-32 object-cover rounded-full border-4 border-green-500 shadow-md"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2 justify-center md:justify-start">
            <FaUserShield className="text-green-600" /> {stats.adminName}
          </h2>
          <p className="text-gray-600 text-lg">{stats.adminEmail}</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard
          icon={<FaDoorOpen className="text-green-600 text-4xl mx-auto mb-2" />}
          label="Total Rooms"
          value={stats.totalRooms}
        />
        <StatCard
          icon={<FaUsers className="text-blue-500 text-4xl mx-auto mb-2" />}
          label="Total Users"
          value={stats.totalUsers}
        />
        <StatCard
          icon={
            <FaUserFriends className="text-purple-500 text-4xl mx-auto mb-2" />
          }
          label="Members"
          value={stats.totalMembers}
        />
      </div>

      {/* Pie Chart */}
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Room Availability Overview
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={roomData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {roomData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  );
};

const StatCard = ({ icon, label, value }) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {icon}
    <h3 className="text-xl font-semibold">{label}</h3>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </motion.div>
);

export default AdminProfile;
