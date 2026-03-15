import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function EditTaskModal({ task, setEditingTask, tasks, setTasks }) {

  const [form, setForm] = useState(task);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
  try {

    const res = await axiosInstance.patch(`/tasks/${form._id}`, {
      ...form,
      version: form.__v
    });

    const updatedTask = res.data.task;

    const updatedTasks = tasks.map((t) =>
      t._id === updatedTask._id ? updatedTask : t
    );

    setTasks(updatedTasks);
    setEditingTask(null);

  } catch (error) {

    if (error.response?.status === 409) {
      alert("This task was updated by another user. Please refresh.");
    }

    console.error("Update failed", error);
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

      <div className="bg-white p-6 rounded w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          Edit Task
        </h2>

        {/* Title */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          placeholder="Title"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          placeholder="Description"
        />

        {/* Priority */}
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        >
          {form.status === "todo" && (
            <>
              <option value="todo">Todo</option>
              <option value="in_progress">Move to In Progress</option>
            </>
          )}

          {form.status === "in_progress" && (
            <>
              <option value="in_progress">In Progress</option>
              <option value="done">Mark as Completed</option>
            </>
          )}

          {form.status === "completed" && (
            <option value="done">Completed</option>
          )}
        </select>

        <div className="flex justify-end gap-3">

          <button
            onClick={() => setEditingTask(null)}
            className="px-4 py-1 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Update
          </button>

        </div>

      </div>

    </div>
  );
}