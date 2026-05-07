import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Admin() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("bebidas");

  const [productos, setProductos] = useState([]);

  const productosRef = collection(db, "productos");

  // 📦 OBTENER
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

  // ➕ CREAR PRODUCTO
  const crearProducto = async (e) => {
    e.preventDefault();

    await addDoc(productosRef, {
      nombre,
      precio,
      imagen,
      categoria,
    });

    setNombre("");
    setPrecio("");
    setImagen("");

    obtenerProductos();
  };

  // ❌ ELIMINAR
  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
    obtenerProductos();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>

      {/* FORM */}
      <form onSubmit={crearProducto}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <input
          placeholder="Imagen URL"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        {/* 🟡 CATEGORÍA SELECT */}
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="bebidas">Bebidas</option>
          <option value="snacks">Snacks</option>
          <option value="panaderia">Panadería</option>
          <option value="limpieza">Limpieza</option>
          <option value="otros">Otros</option>
        </select>

        <button type="submit">Guardar</button>
      </form>

      {/* LISTA */}
      <div style={{ marginTop: 20 }}>
        {productos.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              marginBottom: 10,
              padding: 10,
            }}
          >
            <h4>{p.nombre}</h4>
            <p>${p.precio}</p>
            <p>{p.categoria}</p>

            <button onClick={() => eliminarProducto(p.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}