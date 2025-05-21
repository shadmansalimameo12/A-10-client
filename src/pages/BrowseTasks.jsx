/**
 * BrowseTasks Component
 * 
 * Displays all available tasks in a responsive grid layout.
 * Fetches task data from the API and handles loading states.
 */
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';

const BrowseTasks = () => {
  // ===== STATE MANAGEMENT =====
  const [tasks, setTasks] = useState([]);       // Store all tasks
  const [loading, setLoading] = useState(true); // Track loading state

  // ===== DATA FETCHING =====
  // Fetch all tasks when component mounts
  useEffect(() => {
    // Define the fetch function
    const fetchTasks = async () => {
      try {
        // Get API URL from environment variables
        const apiUrl = import.meta.env.VITE_API_URL;
        
        // Fetch tasks from API
        const response = await axios.get(`${apiUrl}/tasks`);
        
        // Update state with fetched tasks
        setTasks(response.data);
        
        // Turn off loading state
        setLoading(false);
      } catch (error) {
        // Handle errors
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };
    
    // Call the fetch function
    fetchTasks();
  }, []); // Empty dependency array means this runs once on mount

  // ===== COMPONENT RENDERING =====
  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Browse Tasks</h2>
        
        {/* Conditional rendering based on loading state */}
        {loading ? (
          // Show loading message while fetching data
          <div className="text-center p-8">
            <div className="loader animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
            <div className="text-lg">Loading tasks...</div>
          </div>
        ) : (
          // Show task grid once data is loaded
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map through tasks array to create task cards */}
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))
            ) : (
              // Show message if no tasks are available
              <div className="col-span-3 text-center p-8">
                <p className="text-lg">No tasks available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTasks;