<<<<<<< HEAD
// Navbar component with theme toggle, logout, ar hover effect
=======
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
<<<<<<< HEAD
import { FaUserCircle, FaBars, FaSignOutAlt, FaTasks, FaPlus, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Theme local storage theke nebo, default light
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  // User login check and theme apply korsi
  useEffect(() => {
    // User check korsi
=======
import { FaUserCircle, FaBars, FaSignOutAlt, FaTasks, FaPlus, FaHome, FaBriefcase, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // User change hole menu close korsi
      setIsMenuOpen(false);
    });
<<<<<<< HEAD
    // Theme apply korsi HTML root e
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
=======
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
    return () => unsubscribe();
  }, [theme]);

<<<<<<< HEAD
  // Logout handle korsi
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logout hoye gese!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout korte problem holo!');
    }
    setIsMenuOpen(false);
  };

  // Theme toggle ar menu close ek sathe korsi
  const toggleThemeAndCloseMenu = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setIsMenuOpen(false);
  };

  // Menu toggle korsi
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-500 dark:text-blue-400">
          TaskMarket
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            Home
          </Link>
          <Link to="/browse-tasks" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            Browse Tasks
          </Link>
          {user && (
            <>
              <Link to="/add-task" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                <FaPlus className="inline mr-1" /> Add Task
              </Link>
              <Link to="/my-posted-tasks" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                <FaTasks className="inline mr-1" /> My Tasks
              </Link>
            </>
          )}
          <button onClick={toggleThemeAndCloseMenu} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            {theme === 'light' ? <FaMoon className="inline mr-1" /> : <FaSun className="inline mr-1" />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="relative">
              <button onClick={toggleMenu} className="flex items-center relative group">
                {user.photoURL ? (
                  <>
                    <img src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full" />
                    {/* Hover e displayName show korbo */}
                    <span className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                      {user.displayName || 'User'}
                    </span>
                  </>
                ) : (
                  <FaUserCircle className="h-8 w-8 text-gray-700 dark:text-gray-200" />
                )}
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded z-50">
                  <div className="p-2 border-b">
                    <p className="text-gray-900 dark:text-gray-200 font-medium">{user.displayName || 'User'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block p-2 text-red-600 dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                  >
                    <FaSignOutAlt className="inline mr-1" /> Sign out
                  </button>
                </div>
              )}
=======
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      setIsProfileDropdownOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
      console.error('Logout error:', error);
    }
  };

  const NavLink = ({ to, children, icon, onClick }) => (
    <Link
      to={to}
      onClick={() => {
        setIsMobileMenuOpen(false);
        if (onClick) onClick();
      }}
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-all duration-200"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Link>
  );
  
  const MobileNavLink = ({ to, children, icon, onClick }) => (
    <Link
      to={to}
      onClick={() => {
        setIsMobileMenuOpen(false);
        if (onClick) onClick();
      }}
      className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary transition-all duration-200"
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </Link>
  );


  return (
    <nav className="bg-base-100 dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-3xl font-bold text-primary hover:opacity-80 transition-opacity">
            TaskMarket
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" icon={<FaHome />}>Home</NavLink>
            <NavLink to="/browse-tasks" icon={<FaBriefcase />}>Browse Tasks</NavLink>
            {user && (
              <>
                <NavLink to="/add-task" icon={<FaPlus />}>Add Task</NavLink>
                <NavLink to="/my-posted-tasks" icon={<FaTasks />}>My Tasks</NavLink>
              </>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex text-sm bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-700 focus:ring-primary"
                  aria-expanded={isProfileDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  {user.photoURL ? (
                    <img className="h-10 w-10 rounded-full object-cover" src={user.photoURL} alt="User" />
                  ) : (
                    <FaUserCircle className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                {isProfileDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-xl bg-base-100 dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user.displayName || 'Welcome User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                    {/* Add Profile Link if you create a profile page */}
                    {/* <NavDropdownLink to="/profile">Your Profile</NavDropdownLink> */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaSignOutAlt className="mr-2" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login" className="btn btn-sm btn-outline btn-primary">Login</Link>
                <Link to="/signup" className="btn btn-sm btn-primary">Signup</Link>
              </div>
            )}

            <div className="ml-3 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn btn-ghost btn-circle text-gray-700 dark:text-gray-200"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </button>
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login" className="text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 p-1 rounded">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-500 dark:bg-blue-600 text-white p-1 rounded">
                Signup
              </Link>
            </div>
          )}
          <button onClick={toggleMenu} className="md:hidden ml-2 text-gray-700 dark:text-gray-200">
            <FaBars />
          </button>
        </div>
      </div>
<<<<<<< HEAD
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 p-2">
          <Link
            to="/"
            className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/browse-tasks"
            className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Tasks
          </Link>
          {user && (
            <>
              <Link
                to="/add-task"
                className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaPlus className="inline mr-1" /> Add Task
              </Link>
              <Link
                to="/my-posted-tasks"
                className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTasks className="inline mr-1" /> My Tasks
              </Link>
              <Link
                to="/profile"
                className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={toggleThemeAndCloseMenu}
                className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 w-full text-left"
              >
                {theme === 'light' ? <FaMoon className="inline mr-1" /> : <FaSun className="inline mr-1" />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
              <button
                onClick={handleLogout}
                className="block p-2 text-red-600 dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              >
                <FaSignOutAlt className="inline mr-1" /> Sign out
              </button>
            </>
          )}
          {!user && (
            <>
              <Link
                to="/login"
                className="block p-2 text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block p-2 bg-blue-500 dark:bg-blue-600 text-white rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
=======

      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-base-100 dark:bg-gray-800 shadow-lg rounded-b-lg pb-4 z-40" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" icon={<FaHome />}>Home</MobileNavLink>
            <MobileNavLink to="/browse-tasks" icon={<FaBriefcase />}>Browse Tasks</MobileNavLink>
            {user && (
              <>
                <MobileNavLink to="/add-task" icon={<FaPlus />}>Add Task</MobileNavLink>
                <MobileNavLink to="/my-posted-tasks" icon={<FaTasks />}>My Tasks</MobileNavLink>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                 <div className="px-3 py-2">
                    <div className="flex items-center mb-2">
                        {user.photoURL ? (
                        <img className="h-10 w-10 rounded-full object-cover mr-3" src={user.photoURL} alt="User" />
                        ) : (
                        <FaUserCircle className="h-10 w-10 text-gray-500 dark:text-gray-400 mr-3" />
                        )}
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {user.displayName || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                        </div>
                    </div>
                    {/* <MobileNavLink to="/profile">Your Profile</MobileNavLink> */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-3 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                    >
                      <FaSignOutAlt className="mr-3" /> Sign out
                    </button>
                </div>
              </>
            )}
            {!user && (
              <div className="mt-4 px-3 space-y-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-outline btn-primary w-full">Login</Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-primary w-full">Signup</Link>
              </div>
            )}
          </div>
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
        </div>
      )}
    </nav>
  );
};

export default Navbar;