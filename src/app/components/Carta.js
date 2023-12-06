import React, { useContext, useState } from "react";
import ItemList from "./ItemList";
import SalonContext from "../context/SalonProvider";
import DataContext from "../context/DataContext";
import styles from "../../styles/carta.module.css";
import firebaseApp from "@/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseApp);

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";

const Carta = ({ datosMesa }) => {
  const {
    mesas,
    setMesas,
    setMesaSeleccionada,
    setRecargarMesas,
    setCartasAbiertas,
    cartasAbiertas,
    cerrarCarta,
  } = useContext(SalonContext);

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
          console.log("recarga mesas desde Carta");
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
          console.log("recarga mesas desde Carta");
        } catch (error) {
          console.error(
            "Error al actualizar la mesa en la base de datos",
            error
          );
        }
      }
    }
  };

  const handleCerrarCarta = () => {
    cerrarCarta(datosMesa.numeroMesa);
  };

  return (
    <div className={styles["carta-wrapper"]}>
      <div className={styles["carta-container"]}>
        <div className={styles["carta-header"]}>
          <h5>Mesa {datosMesa.numeroMesa}</h5>
          <FontAwesomeIcon
            className={styles["close-btn"]}
            onClick={handleCerrarCarta}
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
                handler={() => agregarProductoAMesa(item)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Carta;
