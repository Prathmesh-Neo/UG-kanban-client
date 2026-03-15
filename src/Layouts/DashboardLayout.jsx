import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import DashboardNavbar from "../Conponents/DashNav";
import KanbanBoard from "../pages/dashboard";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    assignedUser: "",
    startDate: "",
    endDate: ""
  });

  const fetchTasks = async () => {
    try {

      const res = await axiosInstance.get("/tasks");

      setTasks(res.data.tasks);

    } catch (error) {

      console.error("Error fetching tasks:", error);

    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filtering logic
  const filteredTasks = tasks.filter((task) => {

    if (filters.status && task.status !== filters.status) return false;

    if (filters.priority && task.priority !== filters.priority) return false;

    if (
      filters.assignedUser &&
      !task.assignedUser
        .toLowerCase()
        .includes(filters.assignedUser.toLowerCase())
    )
      return false;

    if (
      filters.search &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;

    if (
      filters.startDate &&
      new Date(task.dueDate) < new Date(filters.startDate)
    )
      return false;

    if (
      filters.endDate &&
      new Date(task.dueDate) > new Date(filters.endDate)
    )
      return false;

    return true;

  });

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar with filters */}
      <DashboardNavbar
        filters={filters}
        setFilters={setFilters}
      />

      {/* Kanban board */}
      <div className="p-6">
        <KanbanBoard tasks={filteredTasks} setTasks={setTasks} />
      </div>

    </div>
  );
}

export default Dashboard;