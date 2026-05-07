import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 seguridad: evita crash si el context aún no carga
  if (!auth) {
    return <p style={{ textAlign: "center" }}>Cargando...</p>;
  }

  const { login } = auth;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (error) {
      console.log("🔥 ERROR LOGIN:", error.code);

      let msg = "Error en login";

      switch (error.code) {
        case "auth/user-not-found":
          msg = "Usuario no existe";
          break;
        case "auth/wrong-password":
          msg = "Contraseña incorrecta";
          break;
        case "auth/invalid-email":
          msg = "Email inválido";
          break;
        case "auth/too-many-requests":
          msg = "Demasiados intentos, espera un momento";
          break;
        default:
          msg = error.code || "Error desconocido";
      }

      alert(msg);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2>🔐 Login Admin</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

// 🎨 estilos simples
const inputStyle = {
  width: "100%",
  padding: 10,
  margin: "10px 0",
  borderRadius: 8,
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: 10,
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};