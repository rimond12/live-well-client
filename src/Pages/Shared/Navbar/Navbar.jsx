import { Link, NavLink } from "react-router";
import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// import { AuthContext } from "../Provider/AuthProvider";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  console.log(user);
  

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out"))
      .catch(() => toast.error("Logout failed"));
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/apartment">Apartments</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-[#111111] shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3 relative">

          {/* Left: Logo */}
          <div className="flex-1">
            <Link to="/" className="text-2xl font-bold font-serif text-white">
              LiveWell
            </Link>
          </div>

          {/* Center: Menu */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="menu menu-horizontal gap-8 text-[16px] text-white font-medium">
              {navLinks}
            </ul>
          </div>

          {/* Right: Auth Buttons / Profile */}
          <div className="flex-1 text-right hidden md:block">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-sm bg-[#8bc34a] text-white border-none hover:bg-[#7cb342] mx-2"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-sm bg-[#8bc34a] text-white border-none hover:bg-[#7cb342]"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className="dropdown dropdown-end inline-block">
                <div tabIndex={0} role="button" className="">
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-[70px] h-[70px] rounded-full border-2 cursor-pointer"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[999] menu p-2 shadow bg-white rounded-box w-52 mt-4"
                >
                  <li className="text-gray-800 font-semibold pointer-events-none">
                    {user.displayName}
                  </li>
                  <hr />
                  <li>
                    <Link to="/dashboard" className="flex items-center gap-2 text-gray-700">
                      <MdDashboard /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-600 hover:text-red-800"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4 shadow-sm">
          <ul className="flex flex-col gap-3 text-[#0f172a] font-medium">
            {navLinks}
            {!user ? (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </>
            ) : (
              <>
                <li className="pointer-events-none font-semibold text-gray-600">
                  {user.displayName}
                </li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogout} className="text-left">Logout</button></li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
