import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  const productosRef = collection(db, "productos");

  // 📦 OBTENER PRODUCTOS
  const obtenerProductos = async () => {
    setLoading(true);

    const data = await getDocs(productosRef);

    setProductos(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );

    setLoading(false);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // 🧠 CATEGORÍAS
  const categorias = [
    "todos",
    ...new Set(productos.map((p) => p.categoria)),
  ];

  // 🔍 FILTRO COMBINADO
  const productosFiltrados = productos
    .filter((p) =>
      categoriaActiva === "todos"
        ? true
        : p.categoria === categoriaActiva
    )
    .filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <section
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ marginBottom: 15 }}>Catálogo</h2>

      {/* 🔍 BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: 15,
          borderRadius: 10,
          border: "1px solid #ccc",
        }}
      />

      {/* 🟡 CATEGORÍAS */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            style={{
              padding: "8px 14px",
              borderRadius: 20,
              border: "none",
              background:
                categoriaActiva === cat ? "#111" : "#eee",
              color: categoriaActiva === cat ? "#fff" : "#333",
              cursor: "pointer",
              transition: "0.2s",
              fontSize: 14,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ⏳ LOADING */}
      {loading && <p>Cargando productos...</p>}

      {/* 🚫 EMPTY STATE */}
      {!loading && productosFiltrados.length === 0 && (
        <p>No se encontraron productos 😕</p>
      )}

      {/* 📦 PRODUCTOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "20px",
        }}
      >
        {productosFiltrados.map((p) => (
          <div
            key={p.id}
            style={{
              borderRadius: 16,
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "transform 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            {/* 🖼️ IMAGEN */}
            <img
              src={p.imagen}
              alt={p.nombre}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
              }}
            />

            {/* 📄 INFO */}
            <div style={{ padding: 12 }}>
              <h4 style={{ margin: "0 0 5px" }}>
                {p.nombre}
              </h4>

              <p style={{ margin: 0, fontWeight: "bold" }}>
                ${p.precio}
              </p>

              <small style={{ color: "gray" }}>
                {p.categoria}
              </small>

              {/* 📲 WHATSAPP */}
              <a
                href={`https://wa.me/57TU_NUMERO?text=Hola, quiero pedir: ${p.nombre}`}
                target="_blank"
                style={{
                  display: "block",
                  marginTop: 10,
                  textAlign: "center",
                  background: "#25D366",
                  color: "#fff",
                  padding: "8px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                }}
              >
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}