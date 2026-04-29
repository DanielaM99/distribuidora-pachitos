const items = [
  "✔ Personalización (bordado y estampado)",
  "✔ Entregas a nivel nacional",
  "✔ Calidad industrial garantizada",
  "✔ Atención a grandes empresas"
];

export default function Beneficios() {
  return (
    <section style={styles.section}>
      <h2>¿Por qué elegirnos?</h2>

      <div style={styles.grid}>
        {items.map((i, index) => (
          <div key={index} style={styles.card}>
            {i}
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "60px 20px",
    textAlign: "center"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginTop: "20px"
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  }
};