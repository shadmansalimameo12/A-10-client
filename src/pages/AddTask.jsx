<<<<<<< HEAD
// Add Task page with responsive form
import { useState, useEffect } from 'react';
=======
import { useState } from 'react';
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';
<<<<<<< HEAD
import { FaTasks, FaListAlt, FaAlignLeft, FaCalendarAlt, FaDollarSign, FaEnvelope, FaUser } from 'react-icons/fa';

const AddTask = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
=======
import { FaTasks, FaListAlt, FaAlignLeft, FaCalendarAlt, FaDollarSign, FaEnvelope, FaUser, FaPlusCircle } from 'react-icons/fa';

const AddTask = () => {
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    deadline: '',
    budget: '',
  });
<<<<<<< HEAD

  // User check korsi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Form data change handle korsi
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit korsi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://server-ten-virid-49.vercel.app/api/tasks', {
        ...formData,
        userEmail: user.email,
        userName: user.displayName,
      });
      toast.success('Task add hoye gese!');
      navigate('/my-posted-tasks');
    } catch (error) {
      toast.error('Task add korte problem holo!');
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="container mx-auto max-w-full sm:max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Task Title</label>
            <div className="flex items-center">
              <FaTasks className="mr-2 text-gray-900 dark:text-gray-200" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="border p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Category</label>
            <div className="flex items-center">
              <FaListAlt className="mr-2 text-gray-900 dark:text-gray-200" />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
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
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Description</label>
            <div className="flex items-center">
              <FaAlignLeft className="mr-2 text-gray-900 dark:text-gray-200" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                className="border p-2 w-full rounded h-24 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Deadline</label>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-900 dark:text-gray-200" />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="border p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Budget</label>
            <div className="flex items-center">
              <FaDollarSign className="mr-2 text-gray-900 dark:text-gray-200" />
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter budget"
                className="border p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Your Email</label>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-900 dark:text-gray-200" />
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-200"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-gray-200">Your Name</label>
            <div className="flex items-center">
              <FaUser className="mr-2 text-gray-900 dark:text-gray-200" />
              <input
                type="text"
                value={user?.displayName || ''}
                readOnly
                className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-200"
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded w-full">
            <FaTasks className="inline mr-1" /> Add Task
=======
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
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;