import React, { useState } from "react";
import EditTaskModal from "../Model/editTask";
import { paginate, totalPages } from "../utils/pagination";
import DeleteTaskModal from "../Model/deleteTask";
function KanbanBoard({ tasks = [], setTasks }) {

    const [editingTask, setEditingTask] = useState(null);
    const [page, setPage] = useState(1);
    const [deletingTask, setDeletingTask] = useState(null);
    const LIMIT = 4;

    const columns = [
        { title: "Todo", status: "todo" },
        { title: "In Progress", status: "in_progress" },
        { title: "Completed", status: "done" }
    ];

    const maxTasks = Math.max(
        ...columns.map(col => tasks.filter(t => t.status === col.status).length)
    );

    const pages = Math.ceil(maxTasks / LIMIT);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {columns.map((column) => {

                    const columnTasks = tasks.filter(
                        (task) => task.status === column.status
                    );

                    const paginatedTasks = paginate(columnTasks, page, LIMIT);

                    return (
                        <div key={column.status} className="bg-white rounded shadow p-4">

                            <h2 className="text-lg font-semibold mb-4">
                                {column.title}
                            </h2>

                            <div className="space-y-4">

                                {paginatedTasks.map((task) => (

                                    <div key={task._id} className="bg-blue-50 p-4 rounded shadow">

                                        <h3 className="font-bold text-md">
                                            {task.title}
                                        </h3>

                                        <p className="text-sm text-gray-600">
                                            {task.description}
                                        </p>

                                        <div className="mt-2 text-xs text-gray-500 space-y-1">

                                            <p>
                                                <span className="font-semibold">
                                                    Priority:
                                                </span> {task.priority}
                                            </p>

                                            <p>
                                                <span className="font-semibold">
                                                    Assigned:
                                                </span> {task.assignedUser}
                                            </p>

                                            <p>
                                                <span className="font-semibold">
                                                    Due Date:
                                                </span>{" "}
                                                {task.dueDate
                                                    ? new Date(task.dueDate).toLocaleDateString()
                                                    : "Not set"}
                                            </p>

                                        </div>

                                        {task.status !== "done" ? (
                                            <div className="flex gap-2 mt-3">

                                                <button
                                                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
                                                    onClick={() => setEditingTask(task)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="text-sm bg-red-600 text-white px-3 py-1 rounded"
                                                    onClick={() => setDeletingTask(task)}
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        ) : (
                                            <span className="mt-3 inline-block text-xs bg-green-500 text-white px-2 py-1 rounded">
                                                Completed
                                            </span>
                                        )}

                                    </div>

                                ))}

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* Pagination */}

            <div className="flex justify-center gap-4 mt-6">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="font-semibold">
                    Page {page} / {pages || 1}
                </span>

                <button
                    disabled={page === pages}
                    onClick={() => setPage(prev => prev + 1)}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>

            </div>

            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    setEditingTask={setEditingTask}
                    tasks={tasks}
                    setTasks={setTasks}
                />
            )}
            {deletingTask && (
                <DeleteTaskModal
                    task={deletingTask}
                    tasks={tasks}
                    setTasks={setTasks}
                    setDeletingTask={setDeletingTask}
                />
            )}

        </div>
    );
}

export default KanbanBoard;

