/**
 * Application Entry Point
 * 
 * This file initializes the React application and mounts it to the DOM
 */

import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Import Tailwind CSS styles

/**
 * Render the application
 * 
 * 1. Find the 'root' element in the HTML document
 * 2. Create a React root
 * 3. Render the App component inside the root
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // App component is the main entry point of our application
  <App />
);