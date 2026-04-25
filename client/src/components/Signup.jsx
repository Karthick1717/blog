import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post("/api/auth/register", form);
      alert("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-100 dark:bg-gray-900">
      <form
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-soft"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-2xl font-semibold text-center text-brand-500">
          Signup
        </h2>

        <input
          placeholder="Name"
          className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
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
          Signup
        </button>

        {/* 🔗 Login link */}
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-brand-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;