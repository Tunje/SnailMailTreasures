import { useState } from "react";
import { createUser } from "../services/userService";

const Registration = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const storeUser = async (e: any) => {
    e.preventDefault();

    if (!username || !email) {
      alert("Please fill in all fields");
      return;
    } else if (username.length < 6) {
      alert("Username must be at least 6 characters long");
      return;
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    } else if (email.indexOf("@") === -1) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      await createUser({ username, email });
      alert("User registered successfully");
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={(e) => storeUser(e)}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
