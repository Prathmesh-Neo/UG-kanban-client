import './App.css'
import Navbar from './Conponents/Navbar'
import Register from './pages/register'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './Layouts/DashboardLayout'
import Analytics from './pages/Analytics'
import { useAuth } from './providers/authProvider'
import CreateTask from './pages/addNewTask'
function App() {

  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <Routes>

        {/* {!user && ( */}
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        {/* )} */}

        {/* {user && ( */}
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        {/* )} */}

      </Routes>
    </>
  );
}

export default App