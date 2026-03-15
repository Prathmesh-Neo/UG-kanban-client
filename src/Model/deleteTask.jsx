import axiosInstance from "../api/axiosInstance";

function DeleteTaskModal({ task, tasks, setTasks, setDeletingTask }) {

  const handleDelete = async () => {

    try {

      await axiosInstance.delete(`/tasks/${task._id}`);

      const updatedTasks = tasks.filter(
        (t) => t._id !== task._id
      );

      setTasks(updatedTasks);

      setDeletingTask(null);

    } catch (error) {

      console.error("Delete failed", error);

    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

      <div className="bg-white p-6 rounded w-96">

        <h2 className="text-lg font-bold mb-3">
          Delete Task
        </h2>

        <p className="mb-4">
          Are you sure you want to delete
          <span className="font-semibold"> {task.title}</span> ?
        </p>

        <div className="flex justify-end gap-3">

          <button
            className="px-4 py-1 bg-gray-400 text-white rounded"
            onClick={() => setDeletingTask(null)}
          >
            Cancel
          </button>

          <button
            className="px-4 py-1 bg-red-600 text-white rounded"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteTaskModal;