import { useParams } from "react-router-dom";
import { products } from "../data/products";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id == id);

  if (!product) return <p>No encontrado</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{product.name}</h1>

      {product.images.map((img, i) => (
        <img key={i} src={img} style={{ width: "200px" }} />
      ))}

      <p>{product.description}</p>

      <a
        href={`https://wa.me/573197036680?text=Quiero cotizar ${product.name}`}
      >
        Cotizar
      </a>
    </div>
  );
}