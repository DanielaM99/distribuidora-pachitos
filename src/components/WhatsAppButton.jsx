export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573197036680"
      target="_blank"
      style={styles.button}
    >
      💬
    </a>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    background: "#25D366",
    color: "white",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "26px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textDecoration: "none"
  }
};