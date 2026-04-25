import { useState } from "react";
import API from "../services/api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Account created! Please login.");
      window.location.href = "/login";
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-100 dark:bg-gray-900">
      <form className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-soft" onSubmit={handleSubmit}>
        
        <h2 className="mb-6 text-2xl font-semibold text-center text-brand-500">
          Signup
        </h2>

        <input
          placeholder="Name"
          className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full py-2 text-white transition rounded-md bg-brand-500 hover:bg-brand-400">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;