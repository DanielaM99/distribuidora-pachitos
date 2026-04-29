export default function Nosotros() {
  return (
    <section style={styles.section} id="nosotros">
      <h2>Sobre Distribuidora Pachitos</h2>

      <p>
        Somos una empresa especializada en dotaciones, uniformes y ropa
        personalizada para empresas en Colombia.
      </p>

      <p>
        Trabajamos con industrias, hoteles, empresas de seguridad y
        organizaciones que requieren calidad y cumplimiento.
      </p>
    </section>
  );
}

const styles = {
  section: {
    padding: "60px 20px",
    textAlign: "center",
    background: "#f9fafb"
  }
};