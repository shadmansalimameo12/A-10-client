// ==========================================
// TaskCard Component - Display a single task in a card format
// ==========================================
import { Link } from 'react-router-dom';
import { Reveal } from 'react-awesome-reveal';
import { FaInfoCircle, FaCalendarAlt, FaTag, FaDollarSign } from 'react-icons/fa';

/**
 * TaskCard Component
 * @param {Object} props - Component props
 * @param {Object} props.task - Task data object containing title, category, deadline, budget, and _id
 */
const TaskCard = ({ task }) => {
  // Format the date nicely
  const formattedDate = new Date(task.deadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Reveal>
      <div className="card border hover:border-primary transition-colors bg-base-100 dark:bg-gray-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
        <div className="card-body">
          {/* Card Header */}
          <h3 className="card-title text-lg font-semibold text-primary-focus mb-2">
            {task.title}
          </h3>
          
          {/* Card Content */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <FaTag className="mr-2 text-gray-500" />
              <span>Category: <span className="font-medium">{task.category}</span></span>
            </div>
            
            <div className="flex items-center text-sm">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <span>Deadline: <span className="font-medium">{formattedDate}</span></span>
            </div>
            
            <div className="flex items-center text-sm">
              <FaDollarSign className="mr-2 text-gray-500" />
              <span>Budget: <span className="font-medium">${task.budget}</span></span>
            </div>
          </div>
          
          {/* Card Footer - Action Button */}
          <Link 
            to={`/task/${task._id}`} 
            className="btn btn-sm btn-primary w-full hover:bg-primary-focus transition-colors"
          >
            <FaInfoCircle className="mr-1" /> See Details
          </Link>
        </div>
      </div>
    </Reveal>
  );
};

export default TaskCard;