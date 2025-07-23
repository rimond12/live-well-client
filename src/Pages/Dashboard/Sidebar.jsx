import { Link, useLocation } from "react-router";
import { X } from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard Home" },
    { to: "/dashboard/my-profile", label: "My Profile" },
    { to: "/dashboard/my-agreement", label: "My Agreement" },
    { to: "/dashboard/make-payment", label: "Make Payment" },
    { to: "/dashboard/announcements", label: "Announcements" },
    { to: "/dashboard/payment-history", label: "Payment History" },
    { to: "/dashboard/all-agreements", label: "All Agreements" },
    { to: "/dashboard/post-announcement", label: "Post Announcement" },
    { to: "/dashboard/manage-coupons", label: "Manage Coupons" },
    { to: "/dashboard/manage-members", label: "Manage Members" },
    { to: "/dashboard/agreement-requests", label: "Agreement Requests" },
    { to: "/dashboard/admin-profile", label: "Admin Profile" },
  ];

  return (
    <>
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-indigo-100 shadow-md z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Mobile close header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-indigo-200">
          <h2 className="text-lg font-semibold text-indigo-700">Dashboard</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Sidebar nav */}
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-2 rounded hover:bg-indigo-200 transition ${
                location.pathname === link.to ? "bg-indigo-300 font-medium" : ""
              }`}
              onClick={() => setIsOpen(false)} // close on mobile nav
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
