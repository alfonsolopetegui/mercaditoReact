import { useContext, useState } from "react";
import Carta from "./Carta";
import SalonContext from "../context/SalonProvider";
import styles from "../../styles/mesa.module.css";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Mesa = (props) => {
  const { data, handler } = props;
  const [open, setOpen] = useState(false);
  const { setMesaSeleccionada, openMesaGrande, setOpenMesaGrande } =
    useContext(SalonContext);

  const handleMenu = () => {
    setOpen(!open);
  };

  const handleSeleccion = () => {
    setMesaSeleccionada(data);
    setOpenMesaGrande(!openMesaGrande);
  };

  return (
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
            {open ? (
              <FontAwesomeIcon icon={faChevronLeft} />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} />
            )}
          </button>
          {/* <button onClick={handler}>Cerrar</button> */}
        </div>
      </div>
      <div className={styles["carta-wrapper"]}>{open && <Carta datosMesa={data} />}</div>
    </div>
  );
};

export default Mesa;
