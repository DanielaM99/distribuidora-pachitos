import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Pachito.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 🔒 cerrar menú al cambiar a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "#111",
            fontWeight: "bold",
            fontSize: 20,
            cursor: "pointer",
          }}
          onClick={() => {
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={logo}
            alt="Pachitos"
            style={{ width: 40, height: 40, objectFit: "contain" }}
             onClick={() => navigate("/login")}
          />
          Distri Pachitos
        </div>

        {/* 📱 HAMBURGUESA */}
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ cursor: "pointer", display: "none" }}
          className="menu-toggle"
        >
          ☰
        </div>

        {/* 🧭 LINKS */}
        <div
          className={`nav-links ${menuOpen ? "open" : ""}`}
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          {/* 🏠 INICIO FIX */}
          <a
            href="#top"
            style={linkStyle}
            onClick={() => {
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Inicio
          </a>

          <a
            href="#catalogo"
            style={linkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Catálogo
          </a>

          <a
            href="#nosotros"
            style={linkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Nosotros
          </a>

          {/* 💬 WHATSAPP */}
          <a
            href="https://wa.me/57TU_NUMERO"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#25D366",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: 10,
              textDecoration: "none",
              fontSize: 14,
            }}
            onClick={() => setMenuOpen(false)}
          >
            WhatsApp
          </a>

          {/* 🚪 LOGOUT */}
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

      {/* 📱 CSS RESPONSIVE */}
      <style>{`
        @media (max-width: 768px) {
          .menu-toggle {
            display: block !important;
          }

          .nav-links {
            position: fixed;
            top: 60px;
            right: 0;
            background: white;
            flex-direction: column;
            width: 220px;
            padding: 15px;
            border-left: 1px solid #eee;
            border-bottom: 1px solid #eee;

            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 999;
          }

          .nav-links.open {
            transform: translateX(0);
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