import { useState, useEffect } from "react";
import { products } from "../data/products";

export default function ProductModal({ product, onClose }) {
  const [currentProduct, setCurrentProduct] = useState(product);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setCurrentProduct(product);
  }, [product]);

  useEffect(() => {
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 200);
    return () => clearTimeout(t);
  }, [currentProduct]);

  if (!currentProduct) return null;

  const related = products.filter(
    (p) =>
      p.category === currentProduct.category &&
      p.id !== currentProduct.id
  );

  // 💬 MENSAJE OPTIMIZADO DE VENTA
  const message = `Hola 👋 estoy interesado en el producto ${currentProduct.name} de la categoría ${currentProduct.category}. ¿Me puedes dar precio y disponibilidad por volumen?`;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{
          ...styles.modal,
          transform: animate ? "scale(1.02)" : "scale(1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* TITULO */}
        <h2>{currentProduct.name}</h2>

        {/* GALERÍA */}
        <div style={styles.gallery}>
          {currentProduct.images?.map((img, i) => (
            <img key={i} src={img} style={styles.img} />
          ))}
        </div>

        {/* DESCRIPCIÓN */}
        <p>{currentProduct.description}</p>

        {/* BENEFICIOS */}
        <div style={styles.box}>
          ✔ Personalizable con logo<br />
          ✔ Ideal para empresas<br />
          ✔ Producción por volumen
        </div>

        {/* CTA WHATSAPP (OPTIMIZADO CONVERSIÓN) */}
        <a
          href={`https://wa.me/573197036680?text=${encodeURIComponent(message)}`}
          target="_blank"
          style={styles.btn}
        >
          Cotizar por WhatsApp
        </a>

        <p style={styles.urgency}>
          ⚡ Respuesta rápida en menos de 10 minutos
        </p>

        {/* RELACIONADOS */}
        {related.length > 0 && (
          <>
            <h3 style={{ marginTop: "20px" }}>
              Productos relacionados
            </h3>

            <div style={styles.related}>
              {related.map((p) => (
                <div
                  key={p.id}
                  style={styles.relatedCard}
                  onClick={() => setCurrentProduct(p)}
                >
                  <img src={p.images?.[0]} style={styles.relatedImg} />
                  <p style={{ fontSize: "12px" }}>{p.name}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CERRAR */}
        <button onClick={onClose} style={styles.close}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    animation: "fadeIn 0.2s ease"
  },

  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
    transition: "0.2s ease",
    animation: "zoomIn 0.25s ease"
  },

  gallery: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    margin: "10px 0",
    flexWrap: "wrap"
  },

  img: {
    width: "120px",
    borderRadius: "8px"
  },

  box: {
    background: "#f3f4f6",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "10px"
  },

  btn: {
    display: "inline-block",
    marginTop: "15px",
    background: "#25D366",
    color: "white",
    padding: "14px 18px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)"
  },

  urgency: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#6b7280"
  },

  related: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "10px",
    flexWrap: "wrap"
  },

  relatedCard: {
    width: "120px",
    background: "#f3f4f6",
    padding: "8px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  relatedImg: {
    width: "100%",
    borderRadius: "8px"
  },

  close: {
    marginTop: "10px",
    background: "#e5e7eb",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px"
  }
};