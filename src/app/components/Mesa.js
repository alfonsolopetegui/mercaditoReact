import { useContext, useState } from "react";
import Carta from "./Carta";
import SalonContext from "../context/SalonProvider";
import styles from "../../styles/mesa.module.css";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Mesa = (props) => {
  const { data } = props;
  const { setMesaSeleccionada, openMesaGrande, setCartasAbiertas, setOpenMesaGrande, cartasAbiertas } = useContext(SalonContext);

  // Usar un estado local para controlar la carta de esta mesa
  const [openCarta, setOpenCarta] = useState(false);

  const handleMenu = () => {
    setCartasAbiertas((prevCartasAbiertas) => ({
      ...prevCartasAbiertas,
      [data.numeroMesa]: !prevCartasAbiertas[data.numeroMesa],
    }));
  };

  const handleCerrarCarta = () => {
    cerrarCarta(data.numeroMesa);
  }; 

  const handleSeleccion = () => {
    setMesaSeleccionada(data);
    setOpenMesaGrande(!openMesaGrande);
  };

  
  

  return (
    <>
      <div className={styles["mesa-wrapper"]}>
        <div className={styles["mesa"]}>
          <h1 onClick={handleSeleccion} className={styles["mesa-title"]}>
            Mesa N° : {data.numeroMesa}
          </h1>
          <h5 className={styles["nombre-mozo"]}>Mozo: {data.nombreMozo}</h5>
          <div className={styles["mesa-contenido"]}>
            {data.contenido.length > 0 &&
              data.contenido.map((prod, i) => {
                return (
                  <article key={i}>
                    <h6>{prod.nombre}</h6>
                    <h6>x{prod.cantidad}</h6>
                  </article>
                );
              })}
          </div>
          <div className={styles["mesa-btn-container"]}>
            <button onClick={handleMenu} className={styles["mesa-btn"]}>
              <h4>Menú</h4>
              {openCarta ? (
                <FontAwesomeIcon icon={faChevronLeft} />
              ) : (
                <FontAwesomeIcon icon={faChevronRight} />
              )}
            </button>
            {/* <button onClick={handler}>Cerrar</button> */}
          </div>
        </div>
      </div>
      {cartasAbiertas[data.numeroMesa] && <Carta datosMesa={data} />}
    </>
  );
};

export default Mesa;
