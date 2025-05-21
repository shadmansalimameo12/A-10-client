import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { FaUserCircle, FaBars, FaSignOutAlt, FaTasks, FaPlus, FaHome, FaBriefcase, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
            </div>
          </div>
        </div>
      </div>

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
        </div>
      )}
    </nav>
  );
};

export default Navbar;