import React, { useContext, useState } from "react";
import ItemList from "./ItemList";
import SalonContext from "../context/SalonProvider";
import DataContext from "../context/DataContext";
import styles from "../../styles/carta.module.css";
import firebaseApp from "@/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseApp);

const Carta = ({ datosMesa }) => {
  const { mesas, setMesas, setMesaSeleccionada, setRecargarMesas } =
    useContext(SalonContext);
  const { data, setRecargar } = useContext(DataContext);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [subMenu, setSubMenu] = useState(false);

  const handleMenu = (e, categoria) => {
    setCategoriaSeleccionada(categoria);
    setSubMenu(true);
  };

  // Agregar productos a determinada mesa
  const agregarProductoAMesa = async (producto) => {
    const mesaAModificar = mesas.find(
      (mesa) => mesa.numeroMesa === datosMesa.numeroMesa
    );

    if (mesaAModificar) {
      const productoExistente = mesaAModificar.contenido.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        const updatedMesa = {
          ...mesaAModificar,
          contenido: mesaAModificar.contenido.map((item) => {
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
          const mesaDocRef = doc(db, "mesas", datosMesa.id);

          // Actualizar el documento en Firestore
          await setDoc(mesaDocRef, updatedMesa);
          console.log("Mesa actualizada con éxito en la base de datos");

          // Actualizar el estado local
          setMesaSeleccionada(updatedMesa);
          setRecargarMesas(true);
          setRecargar(true);
          console.log('recarga mesas desde Carta')
        } catch (error) {
          console.error(
            "Error al actualizar la mesa en la base de datos",
            error
          );
        }
      } else {
        producto.cantidad = 1;
        mesaAModificar.contenido.push(producto);

        try {
          const mesaDocRef = doc(db, "mesas", datosMesa.id);

          // Actualizar el documento en Firestore
          await setDoc(mesaDocRef, mesaAModificar);
          console.log("Mesa actualizada con éxito en la base de datos");

          // Actualizar el estado local

          setMesaSeleccionada({ ...mesaAModificar });
          setRecargarMesas(true);
          setRecargar(true);
          console.log('recarga mesas desde Carta')
        } catch (error) {
          console.error(
            "Error al actualizar la mesa en la base de datos",
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
                handler={() => agregarProductoAMesa(item)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Carta;
