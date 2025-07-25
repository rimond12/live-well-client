import { NavLink } from "react-router";
import { X } from "lucide-react";
import {
  FaHome,
  FaTachometerAlt,
  FaUser,
  FaFileContract,
  FaMoneyCheckAlt,
  FaBullhorn,
  FaHistory,
  FaUsersCog,
  FaClipboardList,
  FaUserShield,
  FaTicketAlt,
} from "react-icons/fa";
import useUserRole from "../../hooks/useUserRole";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { role, loading } = useUserRole();

  return (
    <>
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#1a1917] shadow-lg z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Mobile close header */}
        <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-[#c7b39a]">
          <h2 className="text-xl font-semibold text-[#c7b39a]">Dashboard</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#c7b39a] hover:text-white transition"
            aria-label="Close sidebar"
          >
            <X size={26} />
          </button>
        </div>

        {/* Sidebar nav */}
        <nav className="p-6 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 
              ${
                isActive
                  ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                  : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
              }`
            }
            onClick={() => setIsOpen(false)}
            end
          >
            <FaHome />
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
              ${
                isActive
                  ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                  : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaTachometerAlt />
            Dashboard Home
          </NavLink>

          {!loading && (role === "member" || role === "user") && (
            <>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                      : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUser />
                My Profile
              </NavLink>

              <NavLink
                to="/dashboard/announcements"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                      : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaBullhorn />
                Announcements
              </NavLink>
            </>
          )}

          {!loading && role === "member" && (
            <>
              <NavLink
                to="/dashboard/my-agreement"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                      : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaFileContract />
                My Agreement
              </NavLink>

              <NavLink
                to="/dashboard/make-payment"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                      : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaMoneyCheckAlt />
                Make Payment
              </NavLink>

              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                      : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaHistory />
                Payment History
              </NavLink>
            </>
          )}

          {!loading && role === "admin" && (
            <>
              <NavLink
                to="/dashboard/admin-profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                      : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUserShield />
                Admin Profile
              </NavLink>

              <NavLink
                to="/dashboard/agreement-requests"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                      : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaClipboardList />
                Agreement Requests
              </NavLink>

              <NavLink
                to="/dashboard/manage-members"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                      : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUsersCog />
                Manage Members
              </NavLink>

              <NavLink
                to="/dashboard/manage-coupons"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                      : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaTicketAlt />
                Manage Coupons
              </NavLink>

              <NavLink
                to="/dashboard/post-announcement"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                      : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaBullhorn />
                Post Announcement
              </NavLink>

              <NavLink
                to="/dashboard/all-agreements"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#c7b39a] text-[#1a1917] font-semibold shadow-md"
                      : "text-[#d7c9af] hover:bg-[#c7b39a] hover:text-[#1a1917]"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaClipboardList />
                All Agreements
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
