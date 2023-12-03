import styles from "../../styles/recibo.module.css";

const Recibo = ({ contenido, total }) => {
  return (
    <div className={styles["recibo-wrapper"]}>
      <div className={styles["recibo-logo"]}>
        <h1>Barcito</h1>
        <h3>de la esquina</h3>
      </div>
      <h3 className={styles["resumen"]}>Resumen de la cuenta</h3>
      <table className={styles["tabla-container"]}>
        <tbody>
          <tr className={styles["cabecera-tabla"]}>
            <th>c.</th>
            <th>prod.</th>
            <th>precio u.</th>
            <th>precio t.</th>
          </tr>
          {contenido &&
            contenido.map((item, i) => {
              return (
                <tr key={i} className={styles["contenido"]}>
                  <td style={{ fontSize: "24px" }}>{item.cantidad}</td>
                  <td style={{ fontSize: "24px" }}>{item.nombre}</td>

                  <td style={{ fontSize: "24px" }}>${item.precio}</td>
                  <td style={{ fontSize: "24px" }}>
                    ${item.precio * item.cantidad}
                  </td>
                </tr>
              );
            })}
          <tr className={styles["total"]}>
            <td colSpan={3}>Total</td>
            <td>${total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Recibo;
