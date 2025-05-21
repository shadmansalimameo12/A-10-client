// ==========================================
// AddTask Component - Form to create new tasks
// ==========================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase.config';
import { 
  FaTasks, 
  FaListAlt, 
  FaAlignLeft, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaEnvelope, 
  FaUser 
} from 'react-icons/fa';

const AddTask = () => {
  // ========== STATE MANAGEMENT ==========
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    deadline: '',
    budget: '',
  });
  
  const navigate = useNavigate();
  const user = auth.currentUser;

  // ========== EVENT HANDLERS ==========
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create task data with user info
      const taskData = {
        ...formData,
        userEmail: user.email,
        userName: user.displayName,
      };
      
      // Send POST request to create task
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskData);
      
      // Show success message
      toast.success('Task added successfully!');
      
      // Redirect to my posted tasks page
      navigate('/my-posted-tasks');
    } catch (error) {
      toast.error('Failed to add task!');
      console.error('Error adding task:', error);
    }
  };

  // ========== RENDERING ==========
  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 p-4">
      <div className="container mx-auto">
        {/* Form Card */}
        <div className="card w-full max-w-lg mx-auto bg-base-100 dark:bg-gray-800 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 text-center">Add New Task</h2>
            
            <form onSubmit={handleSubmit} className="form-control">
              {/* Task Title */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Task Title</span>
                </label>
                <div className="input-group">
                  <span className="input input-bordered flex items-center justify-center w-12">
                    <FaTasks className="text-primary" />
                  </span>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter task title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              {/* Category */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <div className="input-group">
                  <span className="input input-bordered flex items-center justify-center w-12">
                    <FaListAlt className="text-primary" />
                  </span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Design">Design</option>
                    <option value="Writing">Writing</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
              
              {/* Description */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <div className="input-group">
                  <span className="input input-bordered flex items-center justify-center w-12">
                    <FaAlignLeft className="text-primary" />
                  </span>
                  <textarea
                    name="description"
                    placeholder="Enter task description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full h-32 focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              {/* Deadline */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Deadline</span>
                </label>
                <div className="input-group">
                  <span className="input input-bordered flex items-center justify-center w-12">
                    <FaCalendarAlt className="text-primary" />
                  </span>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              {/* Budget */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Budget</span>
                </label>
                <div className="input-group">
                  <span className="input input-bordered flex items-center justify-center w-12">
                    <FaDollarSign className="text-primary" />
                  </span>
                  <input
                    type="number"
                    name="budget"
                    placeholder="Enter budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              {/* User Email (Read-only) */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Your Email</span>
                </label>
                <div className="input-group">
                  <span className="input input-bordered flex items-center justify-center w-12">
                    <FaEnvelope className="text-primary" />
                  </span>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="input input-bordered w-full bg-base-200 dark:bg-gray-600"
                  />
                </div>
              </div>
              
              {/* User Name (Read-only) */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Your Name</span>
                </label>
                <div className="input-group">
                  <span className="input input-bordered flex items-center justify-center w-12">
                    <FaUser className="text-primary" />
                  </span>
                  <input
                    type="text"
                    value={user?.displayName || ''}
                    readOnly
                    className="input input-bordered w-full bg-base-200 dark:bg-gray-600"
                  />
                </div>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-full hover:bg-primary-focus transition-colors"
              >
                <FaTasks className="mr-2" /> Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;