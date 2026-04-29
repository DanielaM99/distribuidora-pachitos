export default function Hero() {
  return (
    <section id="inicio" style={styles.hero}>
      <div className="container">
        <h1 style={styles.title}>
          Distribuidora Pachitos
        </h1>

        <p style={styles.subtitle}>
          Dotaciones, uniformes y ropa personalizada para empresas en Colombia
        </p>

        <a
          href="#catalogo"
          style={styles.button}
        >
          Ver catálogo
        </a>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    textAlign: "center",
    padding: "120px 20px"
  },

  title: {
    fontSize: "42px",
    marginBottom: "10px"
  },

  subtitle: {
    fontSize: "18px",
    color: "#cbd5e1",
    maxWidth: "600px",
    margin: "auto"
  },

  button: {
    display: "inline-block",
    marginTop: "25px",
    background: "#0ea5e9",
    color: "white",
    padding: "14px 20px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600"
  }
};