import React, { useContext, useState } from "react";
import ItemList from "./ItemList";
import SalonContext from "../context/SalonProvider";

const data = [
  { nombre: "Cerveza Quilmes", categoria: "Bebidas" },
  { nombre: "Cerveza Andes", categoria: "Bebidas" },
  { nombre: "Hamburguesa Cheddar", categoria: "Sandwiches" },
  { nombre: "Lomito", categoria: "Sandwiches" },
];

const Bebidas = data.filter((el) => el.categoria == "Bebidas");

const Carta = () => {
  const { setProductosMesa, productosMesa } = useContext(SalonContext);
  const [subMenu, setSubMenu] = useState(false);

  const handleMenu = () => {
    console.log(Bebidas);
    setSubMenu(!subMenu);
  };

  const agregarProductos = (prod) => {
    console.log(productosMesa);
    setProductosMesa([...productosMesa, { prod }]);
  };

  return (
    <>
      <div>
        <article
          className="carta-btn"
          onClick={handleMenu}
          style={{ cursor: "pointer" }}
        >
          <h3>Bebidas</h3>
        </article>

        <article className="carta-btn">
          <h3>Sandwiches</h3>
        </article>
      </div>
      {subMenu && (
        <div>
          {Bebidas.map((bebida, i) => {
            return (
              <ItemList
                key={i}
                data={bebida}
                handler={(e) => agregarProductos(bebida)}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Carta;
