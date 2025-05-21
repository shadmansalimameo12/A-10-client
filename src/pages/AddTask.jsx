import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase.config';
import { FaTasks, FaListAlt, FaAlignLeft, FaCalendarAlt, FaDollarSign, FaEnvelope, FaUser, FaPlusCircle } from 'react-icons/fa';

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    deadline: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const categories = ["Web Development", "Design", "Writing", "Marketing", "Data Entry", "Consulting", "Video Editing", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to add a task.");
      navigate("/login");
      return;
    }
    setIsSubmitting(true);
    try {
      const taskData = {
        ...formData,
        userEmail: user.email,
        userName: user.displayName || "Anonymous User",
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskData); // [cite: 20]
      toast.success('Task added successfully!'); // [cite: 20]
      navigate('/my-posted-tasks');
    } catch (error) {
      toast.error('Failed to add task. Please try again.');
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: 'title', label: 'Task Title', type: 'text', placeholder: 'e.g., Design a new company logo', icon: <FaTasks />, required: true },
    { name: 'category', label: 'Category', type: 'select', options: categories, icon: <FaListAlt />, required: true },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Provide a detailed description of the task...', icon: <FaAlignLeft />, required: true },
    { name: 'deadline', label: 'Deadline', type: 'date', icon: <FaCalendarAlt />, required: true },
    { name: 'budget', label: 'Budget ($)', type: 'number', placeholder: 'e.g., 500', icon: <FaDollarSign />, required: true },
  ];
  
  const readOnlyFields = [ // [cite: 18]
      { label: 'Your Email', value: user?.email || '', icon: <FaEnvelope /> },
      { label: 'Your Name', value: user?.displayName || 'Not Available', icon: <FaUser /> }
  ];

  return (
    <div className="bg-base-200 dark:bg-gray-900 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Create a New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-base-100 dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md">
          {formFields.map(field => (
            <div className="form-control" key={field.name}>
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300 font-medium">{field.label}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary text-lg">
                  {field.icon}
                </span>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full pl-12 h-32 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                    required={field.required}
                    disabled={isSubmitting}
                  />
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="select select-bordered w-full pl-12 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                    required={field.required}
                    disabled={isSubmitting}
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="input input-bordered w-full pl-12 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white"
                    required={field.required}
                    min={field.type === 'number' ? 0 : undefined}
                    disabled={isSubmitting}
                  />
                )}
              </div>
            </div>
          ))}

          {readOnlyFields.map(field => (
             <div className="form-control" key={field.label}>
                <label className="label">
                    <span className="label-text text-gray-700 dark:text-gray-300 font-medium">{field.label}</span>
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary text-lg">
                        {field.icon}
                    </span>
                    <input
                        type="text"
                        value={field.value}
                        readOnly
                        className="input input-bordered w-full pl-12 bg-base-200 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                    />
                </div>
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary w-full text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className="loading loading-spinner"></span> : <FaPlusCircle />}
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;