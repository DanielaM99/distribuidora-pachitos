import { Routes, Route } from "react-router-dom";

// 🧩 COMPONENTES
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalogo from "./components/Catalogo";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ProductPage from "./pages/ProductPage";
import Nosotros from "./components/Nosotros";
import ProtectedRoute from "./components/ProtectedRoute";

// 🔐 ADMIN
import Login from "./pages/Login";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <>
      {/* 🌐 NAVBAR */}
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

        {/* 🔐 LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 ADMIN PROTEGIDO */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* 🌐 FOOTER */}
      <Footer />

      {/* 📲 WHATSAPP */}
      <WhatsAppButton />
    </>
  );
}