import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../Pages/Dashboard/Sidebar";
import { Menu } from "lucide-react";


const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar (only on mobile) */}
        <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow">
          <h1 className="text-lg font-semibold text-indigo-700">🏢 Live Well</h1>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={26} className="text-indigo-700" />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
