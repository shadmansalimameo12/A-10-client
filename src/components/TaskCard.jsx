import { Link } from 'react-router-dom';
import { Reveal } from 'react-awesome-reveal';
import { FaInfoCircle, FaCalendarAlt, FaTags, FaDollarSign } from 'react-icons/fa';

const TaskCard = ({ task }) => {
  const formattedDate = new Date(task.deadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Reveal>
      <div className="card bg-base-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-primary">
        <div className="card-body p-5">
          <h3 className="card-title text-xl font-semibold text-gray-800 dark:text-white mb-3 truncate" title={task.title}>
            {task.title}
          </h3>

          <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <FaTags className="mr-2 text-primary" />
              Category: <span className="font-medium ml-1">{task.category}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-primary" />
              Deadline: <span className="font-medium ml-1">{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <FaDollarSign className="mr-2 text-primary" />
              Budget: <span className="font-medium ml-1">${task.budget}</span>
            </div>
          </div>

          <div className="card-actions justify-end">
            <Link
              to={`/task/${task._id}`}
              className="btn btn-sm btn-primary hover:bg-primary-focus transition-colors w-full md:w-auto"
            >
              <FaInfoCircle className="mr-1" /> See Details
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default TaskCard;