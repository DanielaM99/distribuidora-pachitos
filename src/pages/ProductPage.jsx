import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ProductPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const getProducto = async () => {
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProducto(docSnap.data());
      }
    };

    getProducto();
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        style={{ width: "100%", borderRadius: 10 }}
      />

      <h1>{producto.nombre}</h1>
      <h2>${producto.precio}</h2>
      <p>{producto.descripcion}</p>
      <p><b>Categoría:</b> {producto.categoria}</p>

      <a
        href={`https://wa.me/57TU_NUMERO?text=Hola, quiero este producto: ${producto.nombre}`}
        target="_blank"
        style={{
          display: "block",
          marginTop: 20,
          background: "#25D366",
          color: "#fff",
          padding: 12,
          textAlign: "center",
          borderRadius: 10,
          textDecoration: "none",
        }}
      >
        Comprar por WhatsApp
      </a>
    </div>
  );
}