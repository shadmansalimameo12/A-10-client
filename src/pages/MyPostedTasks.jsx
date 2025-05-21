import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase.config';
import { FaEdit, FaTrash, FaGavel, FaTasks, FaPlus } from 'react-icons/fa';

const MyPostedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const fetchUserTasks = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL;
          const response = await axios.get(`${apiUrl}/tasks?userEmail=${currentUser.email}`); // [cite: 30]
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching user tasks:', error);
          toast.error('Failed to load your tasks.');
        } finally {
          setLoading(false);
        }
      };
      fetchUserTasks();
    } else {
      setLoading(false);
      toast.info("Please log in to see your posted tasks.");
    }
  }, [currentUser]);

  const handleDelete = async (taskId) => { // [cite: 38]
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        await axios.delete(`${apiUrl}/tasks/${taskId}`);
        setTasks(currentTasks => currentTasks.filter(task => task._id !== taskId));
        toast.success('Task deleted successfully!');
      } catch (error) {
        console.error('Error deleting task:', error);
        toast.error('Failed to delete task.');
      }
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <span className="loading loading-lg loading-spinner text-primary mb-4"></span>
        <p className="text-xl text-gray-600 dark:text-gray-300">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="bg-base-200 dark:bg-gray-900 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
          <FaTasks className="mr-3 text-primary" /> My Posted Tasks
        </h2>
        <Link to="/add-task" className="btn btn-primary btn-sm mt-4 sm:mt-0">
          <FaPlus className="mr-1" /> Add New Task
        </Link>
      </div>

      {tasks.length > 0 ? (
        <div className="overflow-x-auto bg-base-100 dark:bg-gray-800 rounded-lg shadow-md">
          <table className="table w-full"> {/* [cite: 31] */}
            <thead className="bg-base-300 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Task Title</th>
                <th className="p-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Category</th>
                <th className="p-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Deadline</th>
                <th className="p-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Budget</th>
                <th className="p-4 text-center text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {tasks.map((task) => ( // [cite: 31]
                <tr key={task._id} className="hover:bg-base-200 dark:hover:bg-gray-700 transition-colors">
                  <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{task.title}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{task.category}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{formatDate(task.deadline)}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${task.budget}</td>
                  <td className="p-4 whitespace-nowrap text-sm font-medium space-x-2 text-center">
                    <Link to={`/update-task/${task._id}`} className="btn btn-xs btn-outline btn-info hover:text-white">
                      <FaEdit /> Update
                    </Link>
                    <button onClick={() => handleDelete(task._id)} className="btn btn-xs btn-outline btn-error hover:text-white">
                      <FaTrash /> Delete
                    </button>
                    <Link to={`/task/${task._id}`} className="btn btn-xs btn-outline btn-success hover:text-white">
                      <FaGavel /> Bids
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-base-100 dark:bg-gray-800 rounded-lg shadow-md">
          <FaTasks className="text-6xl text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">You haven't posted any tasks yet.</p>
          <p className="text-gray-500 dark:text-gray-500">Let's get started!</p>
          <Link to="/add-task" className="btn btn-primary mt-6">
            <FaPlus className="mr-2" /> Post Your First Task
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPostedTasks;