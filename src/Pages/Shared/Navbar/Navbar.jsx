import { Link, NavLink } from "react-router";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import "./style.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logOut } = useAuth();

  const profileRef = useRef(null);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out"))
      .catch(() => toast.error("Logout failed"));
    setProfileOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apartments"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setIsOpen(false)}
        >
          Apartments
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setIsOpen(false)}
        >
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-[#111111] shadow-md px-6 md:px-2">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between py-3 relative">
          {/* Left: Logo */}
          <div className="flex-1 flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <img
                src="https://i.ibb.co/pv8PQkKy/1.png"
                alt="LiveWell Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold font-serif text-[#c7b39a]">
                LiveWell
              </span>
            </Link>
          </div>

          {/* Center: Menu */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="menu menu-horizontal gap-8 text-[14px] text-[#ccbead] font-medium">
              {navLinks}
            </ul>
          </div>

          {/* Right: Auth Buttons / Profile */}
          <div className="flex-1 text-right hidden md:block">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-sm bg-[#c6b39a] text-white border-none hover:bg-[#a69875] mx-2 transition-colors duration-300"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-sm bg-[#c6b39a] text-white border-none hover:bg-[#a69875] transition-colors duration-300"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className="relative inline-block" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="focus:outline-none"
                >
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-[60px] h-[60px] rounded-full border-2 border-white cursor-pointer"
                  />
                </button>

                {profileOpen && (
                  <ul className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-2 z-50 text-gray-700">
                    <li className="px-4 py-2 font-semibold select-none">
                      {user.displayName}
                    </li>
                    <hr />
                    <li>
                      <Link
                        to="/dashboard"
                        className=" px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => {
                          setProfileOpen(false);
                          setIsOpen(false);
                        }}
                      >
                        <MdDashboard /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-semibold flex items-center gap-2"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#c6b39a] focus:outline-none"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#111111] px-6 pb-4 shadow-sm">
          <ul className="flex flex-col gap-3 text-[#c6b39a] font-medium">
            {navLinks}
            {!user ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="pointer-events-none font-semibold text-[#c6b39a]">
                  {user.displayName}
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-left hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
