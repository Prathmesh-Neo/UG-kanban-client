import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Analytics() {

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAnalytics = async () => {
    try {
      const response = await axiosInstance.get("/analytics/summary");
      setAnalytics(response.data);
    } catch (error) {
      console.error("Analytics fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Task Analytics Dashboard
      </h1>

      {/* Top Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-3xl font-bold">{analytics.totalTasks}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500">Overdue Tasks</h2>
          <p className="text-3xl font-bold text-red-500">
            {analytics.overdueTasks}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500">Completion Rate</h2>
          <p className="text-3xl font-bold text-green-600">
            {analytics.completionRate}
          </p>
        </div>

      </div>


      {/* Status & Priority */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Status */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Tasks By Status
          </h2>

          {analytics.tasksByStatus.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b py-2"
            >
              <span className="capitalize">
                {item._id.replace("_", " ")}
              </span>
              <span className="font-semibold">
                {item.count}
              </span>
            </div>
          ))}
        </div>


        {/* Priority */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Tasks By Priority
          </h2>

          {analytics.tasksByPriority.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b py-2"
            >
              <span className="capitalize">{item._id}</span>
              <span className="font-semibold">{item.count}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Analytics;