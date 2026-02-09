import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'all',
  searchQuery: '',
  history: {
    past: [],
    future: []
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.history.past.push(JSON.parse(JSON.stringify(state.tasks)));
      state.history.future = [];

      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        category: action.payload.category,
        priority: action.payload.priority,
        completed: false,
        createdAt: new Date().toISOString(),
        order: state.tasks.length
      };
      state.tasks.push(newTask);
    },

    updateTask: (state, action) => {
      state.history.past.push(JSON.parse(JSON.stringify(state.tasks)));
      state.history.future = [];

      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload.updates };
      }
    },

    deleteTask: (state, action) => {
      state.history.past.push(JSON.parse(JSON.stringify(state.tasks)));
      state.history.future = [];

      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    toggleTask: (state, action) => {
      state.history.past.push(JSON.parse(JSON.stringify(state.tasks)));
      state.history.future = [];

      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    reorderTasks: (state, action) => {
      state.history.past.push(JSON.parse(JSON.stringify(state.tasks)));
      state.history.future = [];

      const { dragIndex, hoverIndex } = action.payload;
      const draggedTask = state.tasks[dragIndex];
      state.tasks.splice(dragIndex, 1);
      state.tasks.splice(hoverIndex, 0, draggedTask);

      state.tasks.forEach((task, index) => {
        task.order = index;
      });
    },

    undo: (state) => {
      if (state.history.past.length > 0) {
        const previous = state.history.past[state.history.past.length - 1];
        state.history.past = state.history.past.slice(0, -1);
        state.history.future.unshift(JSON.parse(JSON.stringify(state.tasks)));
        state.tasks = previous;
      }
    },

    redo: (state) => {
      if (state.history.future.length > 0) {
        const next = state.history.future[0];
        state.history.future = state.history.future.slice(1);
        state.history.past.push(JSON.parse(JSON.stringify(state.tasks)));
        state.tasks = next;
      }
    },

    importTasks: (state, action) => {
      state.history.past.push(JSON.parse(JSON.stringify(state.tasks)));
      state.history.future = [];
      state.tasks = action.payload;
    },

    clearAllTasks: (state) => {
      state.history.past.push(JSON.parse(JSON.stringify(state.tasks)));
      state.history.future = [];
      state.tasks = [];
    }
  }
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  setFilter,
  setSearchQuery,
  reorderTasks,
  undo,
  redo,
  importTasks,
  clearAllTasks
} = taskSlice.actions;

export const selectFilteredTasks = (state) => {
  let filtered = state.tasks.tasks;

  if (state.tasks.filter === 'completed') {
    filtered = filtered.filter(task => task.completed);
  } else if (state.tasks.filter === 'active') {
    filtered = filtered.filter(task => !task.completed);
  }

  if (state.tasks.searchQuery) {
    const query = state.tasks.searchQuery.toLowerCase();
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
  }

  return filtered;
};

export const selectTaskStats = (state) => {
  const tasks = state.tasks.tasks;
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;
  const byPriority = {
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length
  };
  const byCategory = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  return { total, completed, active, byPriority, byCategory };
};

export default taskSlice.reducer;
