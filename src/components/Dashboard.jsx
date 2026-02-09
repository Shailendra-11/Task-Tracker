import { useSelector } from 'react-redux';
import { selectTaskStats } from '../store/taskSlice';
import { BarChart3, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = useSelector(selectTaskStats);

  const completionPercentage = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
            </div>
            <BarChart3 className="text-blue-400" size={32} />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-700">{stats.completed}</p>
            </div>
            <CheckCircle2 className="text-green-400" size={32} />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Active</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.active}</p>
            </div>
            <Clock className="text-yellow-400" size={32} />
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Completion</p>
              <p className="text-3xl font-bold text-purple-700">{completionPercentage}%</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-purple-400 flex items-center justify-center">
              <span className="text-xs font-bold text-purple-600">{completionPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <AlertCircle size={18} />
            By Priority
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-red-50 rounded">
              <span className="text-sm font-medium text-red-700">High Priority</span>
              <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-sm font-bold">
                {stats.byPriority.high}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
              <span className="text-sm font-medium text-yellow-700">Medium Priority</span>
              <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-bold">
                {stats.byPriority.medium}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
              <span className="text-sm font-medium text-green-700">Low Priority</span>
              <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-sm font-bold">
                {stats.byPriority.low}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <BarChart3 size={18} />
            By Category
          </h3>
          <div className="space-y-2">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-bold">
                  {count}
                </span>
              </div>
            ))}
            {Object.keys(stats.byCategory).length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No tasks yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
