import { useState } from "react";
import type { FormEvent } from "react";
import "./LoginPage.css";

interface LoginPageProps {
  onLogin: (token: string) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Login failed");
        return;
      }

      if (result.token) {
        onLogin(result.token);
      } else {
        setError("Login succeeded but no token was returned");
      }
    } catch {
      setError("Unable to connect to the server");
    }
  };

  return (
    <div className="login-page">

      {/* Header */}
      <section className="login-header">
        <h1>Login</h1>
        <p>Access your account to manage campus events.</p>
      </section>

      {/* Login Card */}
      <section className="login-card">
        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="primary-button" type="submit">
            Login
          </button>

          {error && <p className="login-error">{error}</p>}
        </form>
      </section>

    </div>
  );
}

export default LoginPage;
