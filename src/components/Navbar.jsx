export default function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>Distribuidora Pachitos</div>

      <nav style={styles.nav}>
        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#nosotros">Nosotros</a>
      </nav>

      <a
        href="https://wa.me/573197036680"
        target="_blank"
        style={styles.button}
      >
        Contacto
      </a>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    borderBottom: "1px solid #e5e7eb"
  },
  logo: {
    fontWeight: "700",
    fontSize: "18px",
    color: "#0f172a"
  },
  nav: {
    display: "flex",
    gap: "20px"
  },
  button: {
    background: "#0ea5e9",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600"
  }
};