# ✅ React Task Tracker (Redux Toolkit)

## 🚀 Project Overview

**React Task Tracker** is a modern, responsive task management application built with **React and Redux Toolkit**. It allows users to efficiently manage their daily tasks with features like task creation, editing, filtering, drag-and-drop reordering, and data persistence.

This project is designed following best practices for component structure, state management, performance optimization, and user experience.

---

## 🎯 Features

### ✅ Core Features

#### 📝 Task Management (CRUD)

* Create new tasks with:

  * Title
  * Description
  * Category (Work, Personal, Study, etc.)
  * Priority (High, Medium, Low)
* Edit existing tasks
* Delete tasks
* View all tasks

#### 🔄 Task Status

* Mark tasks as **Completed / Active**

#### 🔍 Filtering

Filter tasks by:

* All
* Completed
* Active

#### 🔎 Search

* Search tasks by **title or description**

#### 🏷 Categories / Tags

* Assign categories such as:

  * Work
  * Personal
  * Study
  * Others

#### 🚦 Priority Levels

* High → 🔴 Red
* Medium → 🟡 Yellow
* Low → 🟢 Green

#### 🖱 Drag & Drop

* Reorder tasks using drag-and-drop functionality

---

## 🛠 Tech Stack

| Technology                | Purpose                |
| ------------------------- | ---------------------- |
| React.js                  | UI Framework           |
| Redux Toolkit             | State Management       |
| Redux Thunk               | Async Middleware       |
| localStorage              | Data Persistence       |
| React DnD / Beautiful DnD | Drag & Drop            |
| CSS / Tailwind            | Styling (Mobile-first) |

---

## 📁 Project Structure

```
task-tracker/
│── public/
│── src/
│   ├── components/
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskList.jsx
│   │   ├── Filters.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Dashboard.jsx
│   │
│   ├── redux/
│   │   ├── store.js
│   │   ├── taskSlice.js
│   │
│   ├── utils/
│   │   ├── localStorage.js
│   │
│   ├── App.js
│   ├── index.js
│   ├── styles.css
│
│── package.json
│── README.md
```

---

## 🔧 Redux State Structure (`taskSlice.js`)

State includes:

```js
{
  tasks: [],
  filter: "all",
  searchQuery: "",
  history: []
}
```

### Actions Used:

* `addTask`
* `updateTask`
* `deleteTask`
* `toggleTask`
* `setFilter`
* `setSearchQuery`
* `reorderTasks`
* `undo`
* `redo`

---

## 💾 Data Persistence

* Tasks are stored in **localStorage**
* When the page reloads, tasks are restored automatically

---

## 📊 Bonus Features (Implemented)

### 📈 Dashboard

Displays:

* Total Tasks
* Completed Tasks
* Pending Tasks

### ↩️ Undo / Redo

* Undo last action
* Redo undone action

### 📤 Export / Import

* Export tasks as JSON file
* Import tasks from JSON file

---

## 📱 Responsive Design

* Fully responsive (Mobile-first approach)
* Works smoothly on:

  * Mobile
  * Tablet
  * Desktop

---

## ▶️ How to Run the Project

### 1️⃣ Install dependencies

```sh
npm install
```

### 2️⃣ Start development server

```sh
npm start
```

### 3️⃣ Open in browser

```
http://localhost:3000
```

---

## 🧪 Testing (Optional)

You can add tests using:

* Jest
* React Testing Library

Run tests:

```sh
npm test
```

---

## 👨‍💻 Author

Developed as part of a **React Developer Assignment**

---

## ⭐ Future Improvements

* Cloud sync (Firebase / Supabase)
* Multi-user collaboration
* Dark mode support
* Reminders & notifications

---

If you want, I can also:

* generate a **GitHub-ready README with badges**, or
* create a **separate PDF project report**, or
* write a **detailed project documentation file**.
