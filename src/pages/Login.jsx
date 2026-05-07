import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await Login(email, password);
      navigate("/admin");
    } catch (error) {
      alert("Error en login");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
      }}
    >
      <h2>Login Admin</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <button type="submit" style={{ width: "100%" }}>
          Entrar
        </button>
      </form>
    </div>
  );
}