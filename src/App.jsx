import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { undo, redo } from './store/taskSlice';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import ExportImport from './components/ExportImport';
import { Undo2, Redo2, ListChecks } from 'lucide-react';

function App() {
  const dispatch = useDispatch();
  const [showDashboard, setShowDashboard] = useState(true);
  const canUndo = useSelector(state => state.tasks.history.past.length > 0);
  const canRedo = useSelector(state => state.tasks.history.future.length > 0);

  const handleUndo = () => {
    if (canUndo) {
      dispatch(undo());
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      dispatch(redo());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ListChecks className="text-blue-600" size={36} />
              <h1 className="text-4xl font-bold text-gray-800">Task Tracker</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleUndo}
                disabled={!canUndo}
                className="p-2 bg-white rounded-md shadow hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                title="Undo"
              >
                <Undo2 size={20} className="text-gray-600" />
              </button>
              <button
                onClick={handleRedo}
                disabled={!canRedo}
                className="p-2 bg-white rounded-md shadow hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                title="Redo"
              >
                <Redo2 size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <button
              onClick={() => setShowDashboard(!showDashboard)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
            </button>
            <ExportImport />
          </div>
        </div>

        {showDashboard && <Dashboard />}

        <TaskForm />

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar />
            </div>
            <FilterBar />
          </div>
        </div>

        <TaskList />
      </div>
    </div>
  );
}

export default App;
