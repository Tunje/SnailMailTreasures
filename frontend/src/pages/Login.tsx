import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    console.log('Logging in with:', { email, password });

    // TODO: Replace with real login logic
  };

  return (
    <div className="flex items-center justify-center bg-[#FDF4DF] px-4 m-[150px] pt-[80px] max-w-[500px] mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-6xl text-center text-[#7A7C56] mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 text-center text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 ">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mb-[10px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7A7C56] p-[8px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 mt-[15px]">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mb-[14px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm  focus:outline-none focus:ring-2 focus:ring-[#7A7C56] p-[8px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className=" ml-[50%] bg-[#7A7C56] text-white font-semibold py-2.5 rounded-full hover:bg-[#CB8427] transition duration-200 p-[8px] w-[200px] text-center transform -translate-x-1/2 mt-[10px]"
            onClick={() => {
              alert('Submitted');
            }}
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-[#CB8427] hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
