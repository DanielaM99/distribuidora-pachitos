import { useState } from "react";
import { products } from "../data/products";
import ProductModal from "./ProductModal";

export default function Catalogo() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="catalogo">
      <div className="container">
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Nuestros Productos
        </h2>

        <div style={styles.grid}>
          {products.map((p) => (
            <div
              key={p.id}
              className="card-hover"
              style={styles.card}
              onClick={() => setSelected(p)}
            >
              <img src={p.images?.[0]} style={styles.img} />
              <h3>{p.name}</h3>
              <p style={styles.category}>{p.category}</p>

              <p style={styles.cta}>
                Ver detalles →
              </p>
            </div>
          ))}
        </div>
      </div>

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
  },

  img: {
    width: "100%",
    borderRadius: "10px"
  },

  category: {
    fontSize: "12px",
    color: "#6b7280"
  },

  cta: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#0ea5e9",
    fontWeight: "600"
  }
};