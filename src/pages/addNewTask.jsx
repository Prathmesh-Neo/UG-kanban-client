import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function CreateTask() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    assignedUser: "",
    createdBy: "admin",
    dueDate: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axiosInstance.post("/tasks", form);

      alert("Task created successfully");

      navigate("/dashboard");

    } catch (error) {

      console.error("Error creating task:", error);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-lg"
      >

        <h2 className="text-xl font-bold mb-4">
          Create Task
        </h2>

        <input
          name="title"
          placeholder="Title"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <select
          name="status"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        >
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          name="priority"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          name="assignedUser"
          placeholder="Assigned User"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Create Task
        </button>

      </form>

    </div>
  );
}

export default CreateTask;