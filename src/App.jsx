import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalogo from "./components/Catalogo";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ProductPage from "./pages/ProductPage";
import Nosotros from "./components/Nosotros";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
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

        <Route path="/producto/:id" element={<ProductPage />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
    </>
  );
}