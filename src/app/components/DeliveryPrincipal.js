"use client";
import { useContext } from "react";
import styles from "../../styles/deliveryPrincipal.module.css";
import { DeliveryContext } from "../context/DeliveryContext";
import Pedido from "./Pedido";
import PedidoGrande from "./PedidoGrande";

const DeliveryPrincipal = () => {
  const { pedidos, openPedidoGrande } = useContext(DeliveryContext);

  // Ordenar los pedidos por número de pedido
  const pedidosOrdenados = [...pedidos].sort(
    (a, b) => a.numeroPedido - b.numeroPedido
  );

  return (
    <>
      <div className={styles["pedidos-container"]}>
        {pedidosOrdenados.length > 0
          ? pedidosOrdenados.map((item, i) => {
              return <Pedido key={i} data={item} id={`pedido${i}`} />;
            })
          : "Aun no hay pedidos cargados"}
      </div>
      {openPedidoGrande && <div className={styles["pedido-grande-container"]}><PedidoGrande /></div>}
    </>
  );
};

export default DeliveryPrincipal;
