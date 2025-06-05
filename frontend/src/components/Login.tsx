import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Send credentials to backend for verification using the configured API service
      console.log("Attempting login with API service");
      console.log(`Login request to: ${api.defaults.baseURL}/auth/login`);
      
      const response = await api.post("/auth/login", { email, password });
      const { data } = response;
      localStorage.setItem("token", data.token);

      alert("Login successful");
      navigate("/home");
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        
        if (error.response.status === 401) {
          alert("Invalid email or password. Please try again.");
        } else if (error.response.data && error.response.data.message) {
          alert(`Login failed: ${error.response.data.message}`);
        } else {
          alert(`Login failed with status code: ${error.response.status}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error request:", error.request);
        alert("No response received from server. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", error.message);
        alert(`Login error: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF4DF] to-[#7A7C56] flex flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#cd8e2e]">
            Login
          </h1>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-[#cd8e2e] font-semibold mb-1">
                email:
              </label>
              <input
                type="text"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              className="w-full bg-[#7A7C56] hover:bg-[#5A5C36] text-white font-bold py-2 px-4 rounded transition-colors duration-200 shadow"
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
