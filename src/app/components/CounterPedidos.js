"use client";
import { useContext, useState } from "react";
import styles from "../../styles/counter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import firebaseApp from "@/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseApp);

import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { DeliveryContext } from "../context/DeliveryContext";
import DataContext from "../context/DataContext";

const CounterPedidos = ({ dataPedido, dataItem }) => {
  const { setRecargar } = useContext(DataContext);
  const { pedidos, setPedidos, setRecargarPedidos, setPedidoSeleccionado } =
    useContext(DeliveryContext);
  const [counter, setCounter] = useState(dataItem.cantidad);

  const handleAdd = async () => {
    const pedidoAModificar = pedidos.find(
      (pedido) => pedido.numeroPedido === dataPedido.numeroPedido
    );
    if (pedidoAModificar) {
      // Clona la mesa encontrada y actualiza la cantidad del ítem específico
      const updatedPedido = {
        ...pedidoAModificar,
        contenido: pedidoAModificar.contenido.map((item) => {
          if (item.id === dataItem.id) {
            return {
              ...item,
              cantidad: item.cantidad + 1,
            };
          }
          return item;
        }),
      };

      try {
        // Obtener la referencia del documento con el ID correcto
        const pedidoDocRef = doc(db, "pedidos", dataPedido.id);

        // Actualizar el documento en Firestore
        await setDoc(pedidoDocRef, updatedPedido);
        console.log("Pedido actualizado con éxito en la base de datos");

        // Actualizar el estado local
        setRecargarPedidos(true);
        setRecargar(true);
        setPedidoSeleccionado(updatedPedido);
      } catch (error) {
        console.error(
          "Error al actualizar el pedido en la base de datos",
          error
        );
      }
      // Clona el array de mesas y actualiza la mesa modificada
      const updatedPedidos = pedidos.map((pedido) =>
        pedido.numeroPedido === dataPedido.numeroPedido ? updatedPedido : pedido
      );

      // Actualiza el estado mesas con el nuevo array

      // setMesas(updatedMesas);
      //   setMesaSeleccionada(updatedMesa);
    }
  };

  const handleSubtract = async () => {
    const pedidoAModificar = pedidos.find(
      (pedido) => pedido.numeroPedido === dataPedido.numeroPedido
    );

    if (pedidoAModificar) {
      // Clona la mesa encontrada y actualiza la cantidad del ítem específico restando 1
      const updatedPedido = {
        ...pedidoAModificar,
        contenido: pedidoAModificar.contenido
          .map((item) => {
            if (item.id === dataItem.id) {
              return {
                ...item,
                cantidad: item.cantidad - 1,
              };
            }
            return item;
          })
          .filter((item) => item.cantidad > 0),
      };

      try {
        // Obtener la referencia del documento con el ID correcto
        const pedidoDocRef = doc(db, "pedidos", dataPedido.id);

        // Actualizar el documento en Firestore
        await setDoc(pedidoDocRef, updatedPedido);
        console.log("Pedido actualizado con éxito en la base de datos");

        // Actualizar el estado local
        setRecargarPedidos(true);
        setRecargar(true);
        setPedidoSeleccionado(updatedPedido);
      } catch (error) {
        console.error(
          "Error al actualizar el pedido en la base de datos",
          error
        );
      }

      // Clona el array de mesas y actualiza la mesa modificada
      const updatedPedidos = pedidos.map((pedido) =>
        pedido.numeroPedido === dataPedido.numeroPedido ? updatedPedido : pedido
      );

      // Actualiza el estado mesas con el nuevo array
      setPedidos(updatedPedidos);
      //   setMesaSeleccionada(updatedMesa);
    }
  };

  //   console.log(data)
  return (
    <div className={styles["counter-container"]}>
      <button className={styles["btn-counter"]}>
        <FontAwesomeIcon
          className={styles["icono-counter"]}
          onClick={handleAdd}
          icon={faSquarePlus}
        />
      </button>
      x{dataItem.cantidad}
      <button className={styles["btn-counter"]}>
        <FontAwesomeIcon
          onClick={handleSubtract}
          className={styles["icono-counter"]}
          icon={faSquareMinus}
        />
      </button>
    </div>
  );
};

export default CounterPedidos;
