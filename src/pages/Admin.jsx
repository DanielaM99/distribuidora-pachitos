import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Admin() {
  const [productos, setProductos] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    imagen: "",
    descripcion: "",
  });

  const [editId, setEditId] = useState(null);

  const productosRef = collection(db, "productos");

  // 📦 TRAER PRODUCTOS
  const getProductos = async () => {
    const data = await getDocs(productosRef);

    setProductos(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  useEffect(() => {
    getProductos();
  }, []);

  // ➕ CREAR / ✏️ EDITAR
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      // ✏️ EDITAR
      await updateDoc(doc(db, "productos", editId), {
        nombre: form.nombre,
        precio: Number(form.precio),
        categoria: form.categoria,
        imagen: form.imagen,
        descripcion: form.descripcion,
      });

      setEditId(null);
    } else {
      // ➕ CREAR
      await addDoc(productosRef, {
        nombre: form.nombre,
        precio: Number(form.precio),
        categoria: form.categoria,
        imagen: form.imagen,
        descripcion: form.descripcion,
      });
    }

    setForm({
      nombre: "",
      precio: "",
      categoria: "",
      imagen: "",
      descripcion: "",
    });

    getProductos();
  };

  // 🗑️ ELIMINAR
  const eliminar = async (id) => {
    await deleteDoc(doc(db, "productos", id));
    getProductos();
  };

  // ✏️ CARGAR PRODUCTO AL FORMULARIO
  const cargarProducto = (p) => {
    setForm({
      nombre: p.nombre,
      precio: p.precio,
      categoria: p.categoria,
      imagen: p.imagen,
      descripcion: p.descripcion,
    });

    setEditId(p.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel Admin</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />

        <input
          placeholder="Precio"
          type="number"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
        />

        <input
          placeholder="Categoría"
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        />

        <input
          placeholder="Imagen (URL Cloudinary)"
          value={form.imagen}
          onChange={(e) => setForm({ ...form, imagen: e.target.value })}
        />

        <textarea
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />

        <button type="submit">
          {editId ? "Actualizar producto" : "Agregar producto"}
        </button>
      </form>

      {/* LISTA DE PRODUCTOS */}
      <h2>Productos</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {productos.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <img
              src={p.imagen}
              alt={p.nombre}
              style={{ width: "100%", height: "120px", objectFit: "cover" }}
            />

            <h3>{p.nombre}</h3>
            <p>${p.precio}</p>
            <p>{p.categoria}</p>

            <button onClick={() => cargarProducto(p)}>
              Editar
            </button>

            <button onClick={() => eliminar(p.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}