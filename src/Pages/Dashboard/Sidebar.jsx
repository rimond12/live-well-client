import { Link, useLocation } from "react-router";

const Sidebar = () => {
  const location = useLocation();

  const links = [
  // Common Links
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard Home" },
  { to: "/dashboard/my-profile", label: "My Profile" },

  // User & Member
  { to: "/dashboard/my-agreement", label: "My Agreement" },
  { to: "/dashboard/make-payment", label: "Make Payment" },
  { to: "/dashboard/announcements", label: "Announcements" },

  // Member Only
  { to: "/dashboard/payment-history", label: "Payment History" },

  // Admin Only
  { to: "/dashboard/all-agreements", label: "All Agreements" },
  { to: "/dashboard/post-announcement", label: "Post Announcement" },
  { to: "/dashboard/manage-coupons", label: "Manage Coupons" },
  { to: "/dashboard/manage-members", label: "Manage Members" },
  { to: "/dashboard/agreement-requests", label: "Agreement Requests" },
  { to: "/dashboard/admin-profile", label: "Admin Profile" },
];


  return (
    <aside className="w-64 bg-indigo-100 p-4 min-h-screen shadow-md">
      <h2 className="text-xl font-bold mb-4">📋 Dashboard</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`block px-4 py-2 rounded hover:bg-indigo-200 transition ${
              location.pathname === link.to ? "bg-indigo-300" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
