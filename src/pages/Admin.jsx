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
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("Jean");

  const [productos, setProductos] = useState([]);

  // 🧠 para editar
  const [editId, setEditId] = useState(null);

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

  // ➕ CREAR
  const crearProducto = async (e) => {
  e.preventDefault();

  // 🚨 VALIDACIÓN
  if (!nombre || !precio || !imagen || !categoria) {
    alert("⚠️ Completa todos los campos");
    return;
  }

  await addDoc(productosRef, {
    nombre,
    precio,
    imagen,
    categoria,
  });

  limpiarForm();
  obtenerProductos();
};

  // ✏️ EDITAR (cargar datos al form)
  const editarProducto = (producto) => {
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setImagen(producto.imagen);
    setCategoria(producto.categoria);
    setEditId(producto.id);
  };

  // 💾 GUARDAR EDICIÓN
  const actualizarProducto = async (e) => {
  e.preventDefault();

  // 🚨 VALIDACIÓN
  if (!nombre || !precio || !imagen || !categoria) {
    alert("⚠️ Completa todos los campos");
    return;
  }

  const productoRef = doc(db, "productos", editId);

  await updateDoc(productoRef, {
    nombre,
    precio,
    imagen,
    categoria,
  });

  limpiarForm();
  setEditId(null);
  obtenerProductos();
};

  // ❌ ELIMINAR
  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
    obtenerProductos();
  };

  // 🧹 LIMPIAR FORM
  const limpiarForm = () => {
    setNombre("");
    setPrecio("");
    setImagen("");
    setCategoria("Jean");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>

      {/* FORM */}
      <form onSubmit={editId ? actualizarProducto : crearProducto}>
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

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="Jean">Jean</option>
          <option value="Chalecos">Chalecos</option>
          <option value="Anti-fluidos">Anti-fluidos</option>
          <option value="Polo">Polo</option>
        </select>

        <button type="submit">
          {editId ? "Actualizar" : "Guardar"}
        </button>
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

            <button onClick={() => editarProducto(p)}>
              Editar
            </button>

            <button onClick={() => eliminarProducto(p.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}