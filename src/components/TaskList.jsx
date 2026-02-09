import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reorderTasks, selectFilteredTasks } from '../store/taskSlice';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { ListTodo } from 'lucide-react';

const TaskList = () => {
  const dispatch = useDispatch();
  const filteredTasks = useSelector(selectFilteredTasks);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    dispatch(reorderTasks({
      dragIndex: draggedIndex,
      hoverIndex: index
    }));
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseEdit = () => {
    setEditingTask(null);
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <ListTodo className="mx-auto text-gray-400 mb-4" size={64} />
        <p className="text-gray-500 text-lg">No tasks found</p>
        <p className="text-gray-400 text-sm mt-2">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {editingTask && (
        <TaskForm editTask={editingTask} onClose={handleCloseEdit} />
      )}

      <div className="space-y-3">
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            onEdit={handleEdit}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
