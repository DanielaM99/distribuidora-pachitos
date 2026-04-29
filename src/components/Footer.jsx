export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2026 Distribuidora Pachitos</p>
      <p>Dotaciones y uniformes en Colombia</p>
    </footer>
  );
}

const styles = {
  footer: {
    padding: "30px",
    textAlign: "center",
    background: "#111827",
    color: "white",
    marginTop: "40px"
  }
};