import { Link } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/apartment">Apartments</Link></li>
      <li><Link to="/about">About</Link></li>
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

          {/* Center: Menu (hidden on mobile) */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="menu menu-horizontal gap-8 text-[16px] text-white font-medium">
              {navLinks}
            </ul>
          </div>

          {/* Right: Login */}
          <div className="flex-1 text-right hidden md:block">
            <Link
              to="/login"
              className="btn btn-sm bg-[#8bc34a] text-white border-none hover:bg-[#7cb342]"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
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
            <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
