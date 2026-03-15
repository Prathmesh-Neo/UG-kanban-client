import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import  axiosInstance from '../api/axiosInstance'
function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const res = await axiosInstance.post("/auth/login", formData);

        const data = res.data;

        // save user in context
        login(data.user, data.token);

        navigate("/dashboard");

    } catch (error) {

        console.error(error);

        alert(
            error?.response?.data?.message || "Login failed"
        );
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">

                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Username */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

                <p className="text-sm text-center mt-4">
                    Don't have an account?
                    <Link to="/register" className="text-blue-600 ml-1">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;