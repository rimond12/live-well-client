import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "../Pages/Dashboard/Sidebar";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-indigo-50">
      {" "}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg
          transform md:translate-x-0 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:shadow-none
        `}
      >
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top navbar */}
        <header className="md:hidden flex justify-between items-center px-4 py-3 bg-black shadow">
          <h1
            className="text-lg font-semibold select-none"
            style={{ color: "#c6b39a" }}
          >
            🏢 Live Well
          </h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
            className="p-2 rounded-md hover:bg-[#c6b39a33] active:bg-[#c6b39a55] transition"
          >
            <Menu size={26} style={{ color: "#c6b39a" }} />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-indigo-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
