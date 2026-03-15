import { useNavigate } from "react-router-dom";

function DashboardNavbar({ filters, setFilters }) {

  const navigate = useNavigate();

  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });

  };

  return (

    <div className="bg-white shadow p-4 flex flex-wrap gap-3 items-center">

      {/* Search */}
      <input
        name="search"
        placeholder="Search title..."
        className="border p-2 rounded"
        onChange={handleChange}
      />

      {/* Status */}
      <select
        name="status"
        className="border p-2 rounded"
        onChange={handleChange}
      >
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      {/* Priority */}
      <select
        name="priority"
        className="border p-2 rounded"
        onChange={handleChange}
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Assigned User */}
      <input
        name="assignedUser"
        placeholder="Assigned User"
        className="border p-2 rounded"
        onChange={handleChange}
      />

      {/* Date Range */}
      <input
        type="date"
        name="startDate"
        className="border p-2 rounded"
        onChange={handleChange}
      />

      <input
        type="date"
        name="endDate"
        className="border p-2 rounded"
        onChange={handleChange}
      />

      {/* Add Task */}
      <button
        onClick={() => navigate("/create-task")}
        className="ml-auto bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add Task
      </button>

    </div>

  );
}

export default DashboardNavbar;