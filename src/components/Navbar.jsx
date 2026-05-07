import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#fff",
        borderBottom: "1px solid #eee",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
        }}
      >
        {/* 🟣 LOGO */}
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textDecoration: "none",
            color: "#111",
          }}
        >
          🛒 Pachitos
        </Link>

        {/* 📱 MOBILE */}
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ cursor: "pointer", display: "none" }}
          className="menu-toggle"
        >
          ☰
        </div>

        {/* 🧭 LINKS */}
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
          className={`nav-links ${menuOpen ? "open" : ""}`}
        >
          <Link to="/" style={linkStyle}>
            Inicio
          </Link>

          <a href="#catalogo" style={linkStyle}>
            Catálogo
          </a>

          <a href="#nosotros" style={linkStyle}>
            Nosotros
          </a>

          {/* 💬 WHATSAPP */}
          <a
            href="https://wa.me/57TU_NUMERO"
            target="_blank"
            style={{
              background: "#25D366",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: 10,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            WhatsApp
          </a>

          {/* 🔐 ADMIN LINK SOLO SI NO ESTÁS LOGUEADO */}
          {!user && (
            <Link to="/login" style={linkStyle}>
              Admin
            </Link>
          )}

          {/* 🚪 LOGOUT SOLO SI ESTÁS LOGUEADO */}
          {user && (
            <button
              onClick={logout}
              style={{
                background: "#111",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
              }}
            >
              Salir
            </button>
          )}
        </div>
      </nav>

      {/* 📱 MOBILE CSS */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 60px;
            right: 0;
            background: white;
            flex-direction: column;
            width: 200px;
            padding: 10px;
            display: none;
            border-left: 1px solid #eee;
            border-bottom: 1px solid #eee;
          }

          .nav-links.open {
            display: flex;
          }

          .menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontSize: 15,
};