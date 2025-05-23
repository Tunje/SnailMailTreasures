import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5173/api/user/login`);
      setUser(response.data);
      console.log("User data:", response.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUser();
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    } else if (username !== user?.username) {
      alert("Username not found");
      return;
    } else if (password !== user?.password) {
      alert("Incorrect password");
      return;
    } else if (username === user.username && password === user.password) {
      alert("Login successful");
    }
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col mt-96">
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#cd8e2e]">
            Login
          </h1>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-[#cd8e2e] font-semibold mb-1">
                Username:
              </label>
              <input
                type="text"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-[#cd8e2e] font-semibold mb-1">
                Password:
              </label>
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 shadow"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-blue-700">
              Don't have an account?{" "}
              <span
                className="text-blue-900 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
