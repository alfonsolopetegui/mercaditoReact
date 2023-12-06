import React, { useContext, useState } from "react";
import ItemList from "./ItemList";

import DataContext from "../context/DataContext";
import styles from "../../styles/carta.module.css";
//Firebase
import firebaseApp from "@/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseApp);

import { DeliveryContext } from "../context/DeliveryContext";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";

const CartaPedidos = ({ datosPedido }) => {
  const {
    pedidos,
    setPedidos,
    recargarPedidos,
    setRecargarPedidos,
    setPedidoSeleccionado,
    cartasAbiertasPedidos,
    setCartasAbiertasPedidos,
    cerrarCartaPedidos,
  } = useContext(DeliveryContext);
  const { data, setRecargar } = useContext(DataContext);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [subMenu, setSubMenu] = useState(false);

  const categoriasUnicas = [
    ...new Set(data.map((producto) => producto.categoria)),
  ];

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
          console.log("recarga mesas desde Carta Pedidos");
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
          setPedidoSeleccionado(pedidoAModificar);
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

  const handleCerrarCartaPedidos = () => {
    cerrarCartaPedidos(datosPedido.numeroPedido);
  };

  return (
    <div className={styles["carta-wrapper"]}>
      <div className={styles["carta-container"]}>
        <div className={styles["carta-header"]}>
          <h5>Pedido {datosPedido.numeroPedido}</h5>
          <FontAwesomeIcon
            className={styles["close-btn"]}
            onClick={handleCerrarCartaPedidos}
            icon={faRectangleXmark}
          />
        </div>

        {categoriasUnicas &&
          categoriasUnicas.map((categoria, i) => {
            return (
              <article
                key={i}
                className={`${styles["carta-btn"]} ${
                  categoriaSeleccionada === categoria ? styles["selected"] : ""
                }`}
                onClick={(e) => handleMenu(e, categoria)}
                style={{ cursor: "pointer" }}
              >
                <h3>{categoria}</h3>
              </article>
            );
          })}
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
