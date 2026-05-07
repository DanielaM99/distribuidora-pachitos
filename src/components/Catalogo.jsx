import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const productosRef = collection(db, "productos");

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

  // 🧠 categorías dinámicas
  const categorias = [
    "todos",
    ...new Set(productos.map((p) => p.categoria)),
  ];

  // 🔍 filtro combinado
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
    <section style={{ padding: 20, maxWidth: 1200, margin: "auto" }}>
      <h2>Catálogo</h2>

      {/* 🔍 BUSCADOR */}
      <input
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 15 }}
      />

      {/* 🟡 CATEGORÍAS */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            style={{
              padding: "8px 12px",
              borderRadius: 20,
              border: "none",
              background:
                categoriaActiva === cat ? "#111" : "#eee",
              color:
                categoriaActiva === cat ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ⏳ LOADING */}
      {loading && <p>Cargando...</p>}

      {/* 📦 PRODUCTOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {productosFiltrados.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/producto/${p.id}`)}
            style={{
              background: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
          >
            <img
              src={p.imagen}
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover",
              }}
            />

            <div style={{ padding: 10 }}>
              <h4>{p.nombre}</h4>
              <p>${p.precio}</p>
              <small>{p.categoria}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}