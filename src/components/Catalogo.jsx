import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [search, setSearch] = useState("");

  // 📦 Obtener productos
  useEffect(() => {
    const obtenerProductos = async () => {
      const data = await getDocs(collection(db, "productos"));

      setProductos(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    obtenerProductos();
  }, []);

  // 🧠 Categorías únicas
  const categorias = [
    "Todos",
    ...new Set(productos.map((p) => p.categoria)),
  ];

  // 🔎 Filtrado
  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria =
      categoriaActiva === "Todos" ||
      p.categoria === categoriaActiva;

    const coincideBusqueda = p.nombre
      .toLowerCase()
      .includes(search.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <section
      id="catalogo"
      style={{
        padding: "60px 20px",
      }}
    >
      {/* 🔥 HEADER PRO */}
      <div className="catalog-header">
        <h2 className="catalog-title">Catálogo</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 🟣 CATEGORÍAS */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              background:
                categoriaActiva === cat
                  ? "#111"
                  : "#f1f1f1",
              color:
                categoriaActiva === cat
                  ? "#fff"
                  : "#333",
              transition: "0.3s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 📦 GRID PRODUCTOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
        }}
      >
        {productosFiltrados.map((producto) => (
          <Link
            key={producto.id}
            to={`/producto/${producto.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow:
                  "0 6px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
              }}
            >
              {/* 🖼️ IMAGEN */}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{
                  width: "100%",
                  height: 260,
                  objectFit: "cover",
                }}
              />

              {/* 📄 INFO */}
              <div style={{ padding: 16 }}>
                <p
                  style={{
                    color: "#888",
                    fontSize: 13,
                    marginBottom: 6,
                  }}
                >
                  {producto.categoria}
                </p>

                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    color: "#111",
                  }}
                >
                  {producto.nombre}
                </h3>

                <p
                  style={{
                    marginTop: 10,
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "#ff4d6d",
                  }}
                >
                  ${producto.precio}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}