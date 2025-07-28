import { useState } from 'react';
import { login } from '../api/auth';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.data.access);
      onLogin();
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default LoginPage;
