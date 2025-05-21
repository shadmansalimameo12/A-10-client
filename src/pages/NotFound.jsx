/**
 * NotFound Component
 * 
 * Displays a friendly 404 error page when users navigate to non-existent routes.
 * Includes a warning icon and a message explaining the error.
 */
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 flex items-center justify-center p-4">
      {/* Error Card */}
      <div className="bg-base-100 dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        {/* Warning Icon */}
        <FaExclamationTriangle className="text-6xl text-error mx-auto mb-6" />
        
        {/* Error Message */}
        <h2 className="text-4xl font-bold mb-4">
          404 - Page Not Found
        </h2>
        
        {/* Explanation */}
        <p className="text-lg mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        
        {/* Return Home Button */}
        <Link to="/" className="btn btn-primary">
          <FaHome className="mr-2" /> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;