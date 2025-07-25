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
  console.log(role);
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                isActive ? "bg-indigo-300 font-medium" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
            end
          >
            <FaHome className="text-indigo-700" />
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                isActive ? "bg-indigo-300 font-medium" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaTachometerAlt className="text-indigo-700" />
            Dashboard Home
          </NavLink>

          { !loading && (role === "member" || role === "user") &&
            <>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                    isActive ? "bg-indigo-300 font-medium" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUser className="text-indigo-700" />
                My Profile
              </NavLink>

              <NavLink
                to="/dashboard/announcements"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                    isActive ? "bg-indigo-300 font-medium" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaBullhorn className="text-indigo-700" />
                Announcements
              </NavLink>
            </>
          }

          {/* member role */}
          {!loading && role === "member" && (
            <>
              <NavLink
                to="/dashboard/my-agreement"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                    isActive ? "bg-indigo-300 font-medium" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaFileContract className="text-indigo-700" />
                My Agreement
              </NavLink>

              <NavLink
                to="/dashboard/make-payment"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                    isActive ? "bg-indigo-300 font-medium" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaMoneyCheckAlt className="text-indigo-700" />
                Make Payment
              </NavLink>

              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                    isActive ? "bg-indigo-300 font-medium" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaHistory className="text-indigo-700" />
                Payment History
              </NavLink>
            </>
          )}

          {/* admin role */}

          {!loading && role === "admin" && (
            <>
              <NavLink
                to="/dashboard/admin-profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                    isActive ? "bg-indigo-300 font-medium" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUserShield className="text-indigo-700" />
                Admin Profile
              </NavLink>
              <NavLink
                to="/dashboard/agreement-requests"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                    isActive ? "bg-indigo-300 font-medium" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaClipboardList className="text-indigo-700" />
                Agreement Requests
              </NavLink>
              <NavLink
                to="/dashboard/manage-members"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                    isActive ? "bg-indigo-300 font-medium" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUsersCog className="text-indigo-700" />
                Manage Members
              </NavLink>
              <NavLink
                to="/dashboard/manage-coupons"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                    isActive ? "bg-indigo-300 font-medium" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaTicketAlt className="text-indigo-700" />
                Manage Coupons
              </NavLink>
              <NavLink
                to="/dashboard/post-announcement"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                    isActive ? "bg-indigo-300 font-medium" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaBullhorn className="text-indigo-700" />
                Post Announcement
              </NavLink>
              <NavLink
                to="/dashboard/all-agreements"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-200 transition ${
                    isActive ? "bg-indigo-300 font-medium" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaClipboardList className="text-indigo-700" />
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
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
