import { Outlet } from "react-router";
import Sidebar from "../Pages/Dashboard/Sidebar";


const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
