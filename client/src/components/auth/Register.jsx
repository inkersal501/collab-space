import { useState } from "react";
import { authService } from "@services/index";
import { toast } from "react-toastify";

const Register = ({ switchTab }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(!username) {
        toast.error("Username is required"); return;
      }else if(!email) {
        toast.error("Email is required"); return;
      }else if(!password) {
        toast.error("Password is required"); return;
      }else if(password.length < 8 ) {
        toast.error("Password is invalid. minimum 8 characters required."); return;
      }
      const register = await authService.register({ email, username, password });
      if (register) {
        setTimeout(() => {
          switchTab();
        }, 1500);
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="space-y-4 mt-6 bg-white max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      {/* Username */}
      <div className="group focus-within:text-indigo-600">
        <label
          htmlFor="username"
          className="block mb-1 text-gray-700 group-focus-within:text-indigo-600"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Email */}
      <div className="group focus-within:text-indigo-600">
        <label
          htmlFor="email"
          className="block mb-1 text-gray-700 group-focus-within:text-indigo-600"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Password */}
      <div className="group focus-within:text-indigo-600">
        <label
          htmlFor="password"
          className="block mb-1 text-gray-700 group-focus-within:text-indigo-600"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full text-white py-2 rounded-lg font-medium transition cursor-pointer ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90"
        }`}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
