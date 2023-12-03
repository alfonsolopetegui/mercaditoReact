"use client";
import { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../context/DataContext";
import styles from "../../styles/newProduct.module.css";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";

const initialProduct = {
  nombre: "",
  precioBase: "",
  precio: "",
  cantidad: "",
  categoria: "",
};

export const NewProduct = () => {
  const [product, setProduct] = useState(initialProduct);
  const { setShowForm } = useContext(DataContext);

  const form = useRef();
  const {
    crearProducto,
    setRecargar,
    edit,
    setEdit,
    update,
    setUpdate,
    actualizarProducto,
    currentFilter,
    setCurrentFilter,
  } = useContext(DataContext);

  // console.log(product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llama a crearProducto y espera la respuesta del servidor
      const response = await crearProducto(product);
      console.log("producto creado con éxito");
    } catch (error) {
      console.error("Error al crear el producto", error);
      // Maneja cualquier error de solicitud aquí
    } finally {
      form.current.reset();
      setProduct(initialProduct);
      // No es necesario esperar aquí, ya que estamos manejando la respuesta del servidor.
      setRecargar(true);
      setShowForm(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if (currentFilter.length > 0) {
        const response = await actualizarProducto(product);

        setCurrentFilter(product);
        // setTable(true);
        form.current.reset();
        setEdit(false);
        setUpdate(initialProduct);
      } else {
        const response = await actualizarProducto(product);
        // console.log(response);
        form.current.reset();
        setEdit(false);
        setUpdate(initialProduct);
        setCurrentFilter(product);

        setRecargar(true);
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (update) {
      setProduct(update);
      // console.log(product)
    }
  }, [update]);

  //Boton cerrar formulario
  const closeForm = () => {
    setUpdate({
      nombre: "",
      precioBase: "",
      precio: "",
      cantidad: "",
      categoria: "",
    });
    setShowForm(false);
    setEdit(false);
  };

  return (
    <div>
      <form
        ref={form}
        className={styles["form-new-product"]}
        onSubmit={edit ? handleEdit : handleSubmit}
      >
        <div className={styles["close-btn-container"]}>
          <FontAwesomeIcon
            className={styles["close-btn"]}
            onClick={closeForm}
            icon={faRectangleXmark}
          />
        </div>
        <label htmlFor="nombre">nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={product.nombre}
          onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
        ></input>

        <label htmlFor="precioBase">precio base</label>
        <input
          type="number"
          name="precioBase"
          id="precioBase"
          value={product.precioBase}
          onChange={(e) =>
            setProduct({ ...product, precioBase: e.target.value })
          }
        ></input>

        <label htmlFor="precio">precio</label>
        <input
          type="number"
          name="precio"
          id="precio"
          value={product.precio}
          onChange={(e) => setProduct({ ...product, precio: e.target.value })}
        ></input>

        <label htmlFor="cantidad">cantidad</label>
        <input
          type="number"
          name="cantidad"
          id="cantidad"
          value={product.cantidad}
          onChange={(e) => setProduct({ ...product, cantidad: e.target.value })}
        ></input>

        <label htmlFor="categoria">categoría</label>
        <input
          type="text"
          name="categoria"
          id="categoria"
          value={product.categoria}
          onChange={(e) =>
            setProduct({ ...product, categoria: e.target.value })
          }
        ></input>

        {edit ? (
          <button className={styles["formBtn"]}>modificar producto</button>
        ) : (
          <button className={styles["formBtn"]}>crear producto</button>
        )}
      </form>
    </div>
  );
};
