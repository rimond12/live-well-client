import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import useAuth from "./../../hooks/useAuth";
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
import Loading from "../Loading/Loading";

const COLORS = ["#4CAF50", "#FF5252"];

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/stats?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <Loading></Loading>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading admin stats.
      </p>
    );

  const roomData = [
    { name: "Available Rooms", value: parseFloat(stats.availablePercentage) },
    {
      name: "Unavailable Rooms",
      value: parseFloat(stats.unavailablePercentage),
    },
  ];

  return (
    <section className="p-6 md:p-10 max-w-6xl mx-auto space-y-12">
      {/* Profile Header */}
      <motion.div
        className="bg-gradient-to-r from-[#111111] to-[#1b1b1b] rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={user.photoURL || "https://i.ibb.co/fdJ7D1h/admin.png"}
          alt="Admin"
          className="w-32 h-32 object-cover rounded-full border-4 border-[#c7b39a] shadow-md"
        />
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-3xl font-bold flex items-center gap-2 justify-center md:justify-start">
            <FaUserShield className="text-[#c7b39a]" /> {stats.adminName}
          </h2>
          <p className="text-gray-400 text-lg">{stats.adminEmail}</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          icon={<FaDoorOpen className="text-[#c7b39a] text-4xl mx-auto mb-2" />}
          label="Total Rooms"
          value={stats.totalRooms}
        />
        <StatCard
          icon={<FaUsers className="text-[#c7b39a] text-4xl mx-auto mb-2" />}
          label="Total Users"
          value={stats.totalUsers}
        />
        <StatCard
          icon={
            <FaUserFriends className="text-[#c7b39a] text-4xl mx-auto mb-2" />
          }
          label="Members"
          value={stats.totalMembers}
        />
      </div>

      {/* Pie Chart */}
      <motion.div
        className="bg-[#111111] rounded-2xl shadow-xl p-8 text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-2xl font-bold text-center mb-6">
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
    className="bg-[#1b1b1b] text-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {icon}
    <h3 className="text-xl font-semibold">{label}</h3>
    <p className="text-3xl font-bold text-[#c7b39a]">{value}</p>
  </motion.div>
);

export default AdminProfile;
