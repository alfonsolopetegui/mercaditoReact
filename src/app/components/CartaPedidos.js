import React, { useContext, useState } from "react";
import ItemList from "./ItemList";

import DataContext from "../context/DataContext";
import styles from "../../styles/carta.module.css";
//Firebase
import firebaseApp from "@/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseApp);

import { DeliveryContext } from "../context/DeliveryContext";

const CartaPedidos = ({ datosPedido }) => {
  const {
    pedidos,
    setPedidos,
    recargarPedidos,
    setRecargarPedidos,
    setPedidoSeleccionado,
  } = useContext(DeliveryContext);
  const { data, setRecargar } = useContext(DataContext);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [subMenu, setSubMenu] = useState(false);

  const handleMenu = (e, categoria) => {
    setCategoriaSeleccionada(categoria);
    setSubMenu(true);
  };

  // Agregar productos a determinada mesa
  const agregarProductoAPedido = async (producto) => {
    const pedidoAModificar = pedidos.find(
      (pedido) => pedido.numeroPedido === datosPedido.numeroPedido
    );

    if (pedidoAModificar) {
      const productoExistente = pedidoAModificar.contenido.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        const updatedPedido = {
          ...pedidoAModificar,
          contenido: pedidoAModificar.contenido.map((item) => {
            if (item.id === producto.id) {
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
          const pedidoDocRef = doc(db, "pedidos", datosPedido.id);

          // Actualizar el documento en Firestore
          await setDoc(pedidoDocRef, updatedPedido);
          console.log("Pedido actualizada con éxito en la base de datos");

          // Actualizar el estado local
          setRecargarPedidos(true);
          // setMesas(updatedMesas);
          setPedidoSeleccionado(updatedPedido);
          setRecargar(true);
          console.log('recarga mesas desde Carta Pedidos')
        } catch (error) {
          console.error(
            "Error al actualizar el pedido en la base de datos",
            error
          );
        }
      } else {
        producto.cantidad = 1;
        pedidoAModificar.contenido.push(producto);

        try {
          const pedidoDocRef = doc(db, "pedidos", datosPedido.id);

          // Actualizar el documento en Firestore
          await setDoc(pedidoDocRef, pedidoAModificar);
          console.log("Pedido actualizada con éxito en la base de datos");
          setPedidoSeleccionado(pedidoAModificar)
          setRecargarPedidos(true);
          setRecargar(true);
        } catch (error) {
          console.error(
            "Error al actualizar el pedido en la base de datos",
            error
          );
        }
      }
    }
  };

  return (
    <div className={styles["carta-wrapper"]}>
      <div className={styles["carta-container"]}>
        <article
          className={`${styles["carta-btn"]} ${
            categoriaSeleccionada === "Pizzas" ? styles["selected"] : ""
          }`}
          onClick={(e) => handleMenu(e, "Pizzas")}
          style={{ cursor: "pointer" }}
        >
          <h3>Pizzas</h3>
        </article>

        <article
          className={`${styles["carta-btn"]} ${
            categoriaSeleccionada === "Empanadas" ? styles["selected"] : ""
          }`}
          onClick={(e) => handleMenu(e, "Empanadas")}
          style={{ cursor: "pointer" }}
        >
          <h3>Empanadas</h3>
        </article>

        <article
          className={`${styles["carta-btn"]} ${
            categoriaSeleccionada === "Sandwiches" ? styles["selected"] : ""
          }`}
          onClick={(e) => handleMenu(e, "Sandwiches")}
          style={{ cursor: "pointer" }}
        >
          <h3>Sandwiches</h3>
        </article>

        <article
          className={`${styles["carta-btn"]} ${
            categoriaSeleccionada === "Papas" ? styles["selected"] : ""
          }`}
          onClick={(e) => handleMenu(e, "Papas")}
          style={{ cursor: "pointer" }}
        >
          <h3>Papas</h3>
        </article>

        <article
          className={`${styles["carta-btn"]} ${
            categoriaSeleccionada === "Postres" ? styles["selected"] : ""
          }`}
          onClick={(e) => handleMenu(e, "Postres")}
          style={{ cursor: "pointer" }}
        >
          <h3>Postres</h3>
        </article>

        <article
          className={`${styles["carta-btn"]} ${
            categoriaSeleccionada === "Bebidas" ? styles["selected"] : ""
          }`}
          onClick={(e) => handleMenu(e, "Bebidas")}
          style={{ cursor: "pointer" }}
        >
          <h3>Bebidas</h3>
        </article>
      </div>
      {subMenu && (
        <div className={styles["single-item-container"]}>
          {data
            .filter((el) => el.categoria === categoriaSeleccionada)
            .map((item, i) => (
              <ItemList
                key={i}
                data={item}
                handler={() => agregarProductoAPedido(item)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default CartaPedidos;
