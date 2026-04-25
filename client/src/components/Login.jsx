import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Login = ({setIsLoggedIn}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await API.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-soft"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center text-brand-500">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full py-2 text-white transition rounded-md bg-brand-500 hover:bg-brand-400">
          Login
        </button>

        {/* 🔗 Signup Link */}
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-brand-500 hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;