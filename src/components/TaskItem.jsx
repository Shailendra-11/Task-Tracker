import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../store/taskSlice';
import { Trash2, Edit, GripVertical, CheckCircle2, Circle } from 'lucide-react';

const TaskItem = ({ task, index, onEdit, onDragStart, onDragEnter, onDragEnd }) => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);

  const priorityColors = {
    high: 'border-l-4 border-red-500 bg-red-50',
    medium: 'border-l-4 border-yellow-500 bg-yellow-50',
    low: 'border-l-4 border-green-500 bg-green-50'
  };

  const categoryColors = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-green-100 text-green-800',
    study: 'bg-purple-100 text-purple-800',
    health: 'bg-pink-100 text-pink-800',
    shopping: 'bg-orange-100 text-orange-800'
  };

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    onDragStart(e, index);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    onDragEnd(e);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className={`bg-white rounded-lg shadow-sm p-4 mb-3 transition-all duration-200 ${priorityColors[task.priority]} ${isDragging ? 'opacity-50' : 'hover:shadow-md'} ${task.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start gap-3">
        <button
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 mt-1"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <GripVertical size={20} />
        </button>

        <button
          onClick={handleToggle}
          className="flex-shrink-0 mt-1 text-gray-400 hover:text-blue-600 transition-colors"
        >
          {task.completed ? (
            <CheckCircle2 size={24} className="text-green-600" />
          ) : (
            <Circle size={24} />
          )}
        </button>

        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`font-semibold text-gray-800 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit task"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Delete task"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {task.description && (
            <p className={`text-sm text-gray-600 mb-2 ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 items-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
              {task.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority} priority
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
