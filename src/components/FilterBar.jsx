import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/taskSlice';

const FilterBar = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.tasks.filter);

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex gap-2">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => dispatch(setFilter(filter.value))}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            currentFilter === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
