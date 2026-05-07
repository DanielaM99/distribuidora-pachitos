import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

// 🧩 COMPONENTES EXISTENTES
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalogo from "./components/Catalogo";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ProductPage from "./pages/ProductPage";
import Nosotros from "./components/Nosotros";

// 🔐 NUEVO (ADMIN)
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <AuthProvider>
      <>
        {/* 🌐 HEADER GLOBAL */}
        <Navbar />

        {/* 📍 RUTAS */}
        <Routes>
          {/* 🏠 HOME */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Catalogo />
                <Nosotros />
              </>
            }
          />

          {/* 📦 PRODUCTO */}
          <Route path="/producto/:id" element={<ProductPage />} />

          {/* 🔐 ADMIN LOGIN */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* 🔐 PANEL ADMIN */}
          <Route path="/admin" element={<Admin />} />
        </Routes>

        {/* 🌐 FOOTER GLOBAL */}
        <Footer />

        {/* 📲 WHATSAPP FLOAT */}
        <WhatsAppButton />
      </>
    </AuthProvider>
  );
}