import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");

  const productosRef = collection(db, "productos");

  const obtenerProductos = async () => {
    const data = await getDocs(productosRef);

    setProductos(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // 📦 obtener categorías únicas
  const categorias = [
    "todos",
    ...new Set(productos.map((p) => p.categoria)),
  ];

  // 🔍 filtrar productos
  const productosFiltrados =
    categoriaActiva === "todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  return (
    <section style={{ padding: "20px" }}>
      <h2>Catálogo</h2>

      {/* 🟡 FILTROS */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            style={{
              padding: "8px 12px",
              borderRadius: 20,
              border: "1px solid #ccc",
              background: categoriaActiva === cat ? "#000" : "#fff",
              color: categoriaActiva === cat ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 📦 PRODUCTOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
        }}
      >
        {productosFiltrados.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              background: "#fff",
            }}
          >
            <img
              src={p.imagen}
              alt={p.nombre}
              style={{
                width: "100%",
                height: "130px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: 10 }}>
              <h4>{p.nombre}</h4>
              <p style={{ margin: 0 }}>${p.precio}</p>
              <small style={{ color: "gray" }}>{p.categoria}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}