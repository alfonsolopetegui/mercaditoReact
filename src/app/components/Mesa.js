import { useContext, useState } from "react";
import Carta from "./Carta";
import SalonContext from "../context/SalonProvider";

const Mesa = (props) => {
  const { data, handler } = props;
  const [open, setOpen] = useState(false);
  const { productosMesa, setProductosMesa, mesas, setMesaSeleccionada } =
    useContext(SalonContext);
  // const [datosMesa, setDatosMesa] = useState({});

  // setDatosMesa(data)

  const handleMenu = () => {
    setOpen(!open);
  };

  const handleSeleccion = ()=> {
    setMesaSeleccionada(data)
  }

  return (
    <>
      <div className="mesa">
        <h1 onClick={handleSeleccion} style={{cursor:'pointer'}}>Mesa N° : {data.numeroMesa}</h1>
        <h6>Mozo: {data.nombreMozo}</h6>
        <div className="mesa-contenido">
          {productosMesa.length > 0 &&
            productosMesa.map((prod, i) => {
              return <h6 key={i}>{prod.prod.nombre}</h6>;
            })}
        </div>
        <button onClick={handleMenu}>Menú</button>
        <button onClick={handler}>Cerrar</button>
      </div>
      {open && <Carta />}
    </>
  );
};

export default Mesa;
