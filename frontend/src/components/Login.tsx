import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
      // Send credentials to backend for verification
      const url = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;
      console.log("Login URL:", url);
      const response = await axios.post(url, { email, password });
      const { data } = response;
      localStorage.setItem("token", data.token);

      if (response.status === 200) {
        alert("Login successful");
        navigate("/home");
      } else {
        alert("Incorrect email or password");
      }
    } catch (error) {
      alert("An error occurred during login");
      console.error(error);
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
