# Kanban Task Collaboration System – Frontend

## Project Overview

This project is a **React-based dashboard** for managing tasks in a Kanban board.

Users can:

* create tasks
* update tasks
* move tasks between stages
* filter tasks
* view analytics

The frontend communicates with the backend APIs.

---

# Tech Stack

* React
* Vite
* Axios
* Tailwind CSS
* React Hooks

---

# Implemented Features

## 1 User Authentication UI

Implemented:

* login page
* register page
* JWT token storage
* protected routes

---

# 2 Kanban Board

Implemented Kanban board with three stages:

Todo
In Progress
Done

Each task card displays:

* title
* description
* priority
* assigned user
* due date

Users can:

* create tasks
* edit tasks
* delete tasks
* move tasks between stages

---

# 3 Task CRUD UI

Implemented:

Create Task
Edit Task
Delete Task

Modals are used for editing and deleting tasks.

---

# 4 Task Filters

Implemented task filtering options:

* filter by status
* filter by priority
* search by task title

Pagination is implemented to improve performance.

---

# 5 Analytics Dashboard

Implemented analytics UI showing:

* total tasks
* tasks by status
* tasks by priority
* overdue tasks

Data is fetched from backend endpoint:

GET /analytics/summary

---

# Folder Structure

frontend
components
pages
services
hooks
state

Important components:

KanbanBoard.jsx
EditTaskModal.jsx
DeleteTaskModal.jsx
Navbar.jsx

---

# Setup Instructions

Clone repository

git clone <repository-url>

Install dependencies

npm install

Run development server

npm run dev

Application runs at

http://localhost:5173

---

# Environment Variables

Create `.env`

VITE_API_URL=http://localhost:3000

---

# API Integration

Authentication APIs

POST /auth/register
POST /auth/login

Task APIs

POST /tasks
GET /tasks
PATCH /tasks/:id
DELETE /tasks/:id

Analytics API

GET /analytics/summary
