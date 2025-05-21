import { useState } from "react";
import axios from "axios";

type User = {
  userName: string;
  email: string;
  password: string;
};

const Registration = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newUser, setNewUser] = useState({} as User);

  const createUser = async () => {
    try {
      await axios.post(`http://localhost:3000/api/user`, newUser);
      alert("User registered successfully");
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const storeUser = (e: any) => {
    e.preventDefault();

    if (!username || !email || !password) {
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
    setNewUser({ userName: username, email: email, password: password });
    createUser();
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
