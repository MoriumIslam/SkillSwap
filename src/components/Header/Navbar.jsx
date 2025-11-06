import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { LogOut, Menu, X } from "lucide-react";
import yogaLogo from "../../assets/yoga-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUser?.();
    } finally {
      setIsMobileMenuOpen(false);
      navigate("/login", { replace: true });
    }
  };

  const linkBase = "font-medium cursor-pointer transition duration-300";
  const linkInactive = "text-gray-700 hover:text-blue-600 transform hover:scale-105";
  const linkActive = "text-blue-600 font-bold";

  const navItem = (to, label, onClick) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? linkActive : linkInactive}`
      }
    >
      <li className="list-none">{label}</li>
    </NavLink>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo + brand */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition transform hover:scale-105 duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src={yogaLogo}
              alt="Yoga Logo"
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "https://i.postimg.cc/RVgJYLjg/avatar-placeholder.png";
              }}
            />
            <span className="text-2xl font-bold tracking-wide">
              <span className="text-blue-600">Skill</span>
              <span className="text-gray-800">Swap</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navItem("/", "Home", () => setIsMobileMenuOpen(false))}
            {user && navItem("/profile", "My Profile", () => setIsMobileMenuOpen(false))}
          </ul>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                {/* Avatar with hover tooltip */}
                <div className="relative group">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.postimg.cc/RVgJYLjg/avatar-placeholder.png"
                    }
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://i.postimg.cc/RVgJYLjg/avatar-placeholder.png";
                    }}
                  />
                  <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-xs px-3 py-1 rounded-lg">
                    {user.displayName || "User"}
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium text-sm flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="px-5 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium text-sm border border-gray-300 hover:border-blue-500">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium text-sm">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            className="md:hidden p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-200 bg-white rounded-lg shadow-lg">
            <ul className="flex flex-col gap-4 pt-4 px-4">
              {navItem("/", "Home", () => setIsMobileMenuOpen(false))}
              {user && navItem("/club", "ToyTopia Club", () => setIsMobileMenuOpen(false))}
              {user && navItem("/profile", "My Profile", () => setIsMobileMenuOpen(false))}
            </ul>

            <div className="pt-4 border-t border-gray-200 px-4">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-2 py-2 bg-blue-50 rounded-lg">
                    <img
                      src={
                        user.photoURL ||
                        "https://i.postimg.cc/RVgJYLjg/avatar-placeholder.png"
                      }
                      alt={user.displayName || "User"}
                      className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://i.postimg.cc/RVgJYLjg/avatar-placeholder.png";
                      }}
                    />
                    <span className="font-medium text-gray-800 text-sm">
                      {user.displayName || "User"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium border border-gray-300 hover:border-blue-500">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;