/**
 * MyPostedTasks Component
 * 
 * Shows all tasks posted by the current user.
 * Provides functionality to update, delete, and view bids on tasks.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase.config';

// Import icons
import { 
  FaEdit,     // Edit icon
  FaTrash,    // Delete icon
  FaGavel,    // Bids icon
  FaTasks     // Tasks icon
} from 'react-icons/fa';

const MyPostedTasks = () => {
  // ===== STATE MANAGEMENT =====
  const [tasks, setTasks] = useState([]);       // Store user's tasks
  const [loading, setLoading] = useState(true); // Track loading state

  // ===== DATA FETCHING =====
  // Fetch user's posted tasks when component mounts
  useEffect(() => {
    // Only fetch if user is logged in
    if (auth.currentUser) {
      const fetchUserTasks = async () => {
        try {
          // Get API URL from environment variables
          const apiUrl = import.meta.env.VITE_API_URL;
          
          // Fetch tasks filtered by current user's email
          const response = await axios.get(
            `${apiUrl}/tasks?userEmail=${auth.currentUser.email}`
          );
          
          // Update state with fetched tasks
          setTasks(response.data);
          
          // Turn off loading state
          setLoading(false);
        } catch (error) {
          // Handle errors
          console.error('Error fetching user tasks:', error);
          setLoading(false);
          toast.error('Failed to load your tasks');
        }
      };
      
      // Call the fetch function
      fetchUserTasks();
    } else {
      // Handle case when user is not logged in
      setLoading(false);
    }
  }, []); // Empty dependency array means this runs once on mount

  // ===== EVENT HANDLERS =====
  /**
   * Handle task deletion
   * @param {string} id - Task ID to delete
   */
  const handleDelete = async (id) => {
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        // Get API URL from environment variables
        const apiUrl = import.meta.env.VITE_API_URL;
        
        // Send delete request to API
        await axios.delete(`${apiUrl}/tasks/${id}`);
        
        // Update local state by filtering out deleted task
        setTasks(tasks.filter((task) => task._id !== id));
        
        // Show success message
        toast.success('Task deleted successfully!');
      } catch (error) {
        // Handle errors
        console.error('Error deleting task:', error);
        toast.error('Failed to delete task!');
      }
    }
  };

  // ===== HELPER FUNCTIONS =====
  /**
   * Format date to locale string
   * @param {string} dateString - Date string to format
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // ===== COMPONENT RENDERING =====
  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 p-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaTasks className="mr-2 text-primary" /> My Posted Tasks
        </h2>
        
        {/* Conditional rendering based on loading state */}
        {loading ? (
          // Show loading spinner
          <div className="flex justify-center items-center py-12">
            <div className="loader animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
            <span className="ml-2 text-lg">Loading tasks...</span>
          </div>
        ) : (
          // Show tasks in table format
          <div className="card bg-base-100 dark:bg-gray-800 shadow-xl">
            <div className="card-body">
              <div className="overflow-x-auto">
                {tasks.length > 0 ? (
                  <table className="table table-zebra w-full">
                    {/* Table Header */}
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task._id}>
                          <td>{task.title}</td>
                          <td>{task.category}</td>
                          <td>{formatDate(task.deadline)}</td>
                          <td className="space-x-2">
                            {/* Update Button */}
                            <Link 
                              to={`/update-task/${task._id}`} 
                              className="btn btn-sm btn-primary"
                            >
                              <FaEdit className="mr-1" /> Update
                            </Link>
                            
                            {/* Delete Button */}
                            <button
                              onClick={() => handleDelete(task._id)}
                              className="btn btn-sm btn-error"
                            >
                              <FaTrash className="mr-1" /> Delete
                            </button>
                            
                            {/* View Bids Button */}
                            <Link 
                              to={`/task/${task._id}`} 
                              className="btn btn-sm btn-success"
                            >
                              <FaGavel className="mr-1" /> Bids
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  // Message when no tasks are found
                  <div className="text-center py-8">
                    <p className="text-lg mb-4">You haven't posted any tasks yet</p>
                    <Link to="/add-task" className="btn btn-primary">
                      Create Your First Task
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostedTasks;