/**
 * Navbar Component
 * 
 * Main navigation bar for the TaskMarket application
 * Displays different options based on user authentication status
 * Shows user profile picture for logged-in users
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { FaUserCircle, FaBars, FaSignOutAlt, FaTasks, FaPlus } from 'react-icons/fa';

const Navbar = () => {
  // ========== STATE MANAGEMENT ==========
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ========== AUTHENTICATION LISTENER ==========
  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    
    // Clean up listener on component unmount
    return () => unsubscribe();
  }, []);

  // ========== EVENT HANDLERS ==========
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed!');
      console.error('Logout error:', error);
    }
  };

  // Close mobile menu when clicking a link
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  // ========== RENDERING ==========
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* ===== LOGO ===== */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">
              TaskMarket
            </Link>
          </div>

          {/* ===== DESKTOP MENU ===== */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
              >
                Home
              </Link>
              <Link 
                to="/browse-tasks" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
              >
                Browse Tasks
              </Link>
              
              {/* Conditional menu items for logged-in users */}
              {user && (
                <>
                  <Link 
                    to="/add-task" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
                  >
                    <span className="flex items-center">
                      <FaPlus className="mr-1" /> Add Task
                    </span>
                  </Link>
                  <Link 
                    to="/my-posted-tasks" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
                  >
                    <span className="flex items-center">
                      <FaTasks className="mr-1" /> My Posted Tasks
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* ===== USER ACTIONS ===== */}
          <div className="flex items-center">
            {user ? (
              // Logged-in user dropdown
              <div className="relative ml-3">
                <div>
                  <button 
                    className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    {/* Show user profile picture if available, otherwise show placeholder icon */}
                    {user.photoURL ? (
                      <img 
                        className="h-8 w-8 rounded-full object-cover border-2 border-blue-500"
                        src={user.photoURL} 
                        alt="User profile"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FaUserCircle className="text-xl" />
                      </div>
                    )}
                  </button>
                </div>
                
                {/* User dropdown menu */}
                {isMenuOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleMenuItemClick}
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <span className="flex items-center">
                        <FaSignOutAlt className="mr-2" /> Sign out
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login/Signup buttons for guests
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="px-3 py-1 border border-blue-500 text-blue-500 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
                >
                  Signup
                </Link>
              </div>
            )}

            {/* ===== MOBILE MENU BUTTON ===== */}
            <div className="ml-4 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <FaBars className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              onClick={handleMenuItemClick}
            >
              Home
            </Link>
            <Link 
              to="/browse-tasks" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              onClick={handleMenuItemClick}
            >
              Browse Tasks
            </Link>
            
            {/* Conditional menu items for mobile */}
            {user ? (
              <>
                <Link 
                  to="/add-task" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  onClick={handleMenuItemClick}
                >
                  <span className="flex items-center">
                    <FaPlus className="mr-2" /> Add Task
                  </span>
                </Link>
                <Link 
                  to="/my-posted-tasks" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  onClick={handleMenuItemClick}
                >
                  <span className="flex items-center">
                    <FaTasks className="mr-2" /> My Posted Tasks
                  </span>
                </Link>
                
                {/* User info in mobile menu */}
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center px-4">
                    {user.photoURL ? (
                      <div className="flex-shrink-0">
                        <img 
                          className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
                          src={user.photoURL} 
                          alt="User profile"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FaUserCircle className="text-xl" />
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{user.displayName || 'User'}</div>
                      <div className="text-sm font-medium text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Link 
                      to="/profile" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={handleMenuItemClick}
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100"
                    >
                      <span className="flex items-center">
                        <FaSignOutAlt className="mr-2" /> Sign out
                      </span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-200 pt-4 pb-3 px-4 flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="w-full px-3 py-2 text-center border border-blue-500 text-blue-500 rounded-md font-medium hover:bg-blue-50"
                  onClick={handleMenuItemClick}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="w-full px-3 py-2 text-center bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600"
                  onClick={handleMenuItemClick}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;