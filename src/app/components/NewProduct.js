"use client";
import { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../context/DataContext";

const initialProduct = {
  item: "",
  nombre: "",
  marca: "",
  descripcion: "",
  categoria: "",
  precio: {
    base: "",
    moneda: "",
  },
  codigo: "",
  color: "",
  cantidad: "",
};

export const NewProduct = () => {
  const [product, setProduct] = useState(initialProduct);
  const { setShowForm } = useContext(DataContext);

  const form = useRef();
  const {
    crearProducto,
    setTable,
    edit,
    setEdit,
    update,
    setUpdate,
    modificarProducto,
    currentFilter,
    setCurrentFilter,
  } = useContext(DataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "base" || name === "cantidad") {
      e.target.value = Number(e.target.value);
    }
    if (name == "base" || name == "moneda") {
      // Manejar campos del objeto anidado "precio"
      setProduct({
        ...product,
        precio: {
          ...product.precio,
          [name]: value,
        },
      });
    } else {
      // Manejar campos fuera del objeto anidado "precio"
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  // console.log(product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llama a crearProducto y espera la respuesta del servidor
      const response = await crearProducto(product);
      if (response.status == 201) {
        console.log(response.data.msg);
      }
    } catch (error) {
      console.error("Error al crear el producto", error);
      // Maneja cualquier error de solicitud aquí
    } finally {
      form.current.reset();
      setProduct(initialProduct);
      // No es necesario esperar aquí, ya que estamos manejando la respuesta del servidor.
      setTable(true);
      setShowForm(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if (currentFilter.length > 0) {
        const response = await modificarProducto(product);
        console.log(response.data.msg);
        setCurrentFilter(product);
        // setTable(true);
        form.current.reset();
        setEdit(false);
        setUpdate(initialProduct);
      } else {
        const response = await modificarProducto(product);
        console.log(response.data.msg);
        form.current.reset();
        setEdit(false);
        setUpdate(initialProduct);
        setCurrentFilter(product);

        setTable(true);
        setShowForm(false);
      }
    } catch (error) {
      console.log(response.data.msg);
    }
  };

  useEffect(() => {
    if (update) {
      setProduct(update);
      // console.log(product)
    }
  }, [update]);

  const closeForm = () => {
    setUpdate({
      item: "",
      nombre: "",
      marca: "",
      descripcion: "",
      categoria: "",
      precio: {
        base: "",
        moneda: "",
      },
      codigo: "",
      color: "",
      cantidad: "",
    })
    setShowForm(false);
  };

  return (
    <div>
      <h3 onClick={closeForm} style={{ cursor: "pointer" }}>
        x
      </h3>
      <form
        ref={form}
        className="form-new-product"
        onSubmit={edit ? handleEdit : handleSubmit}
      >
        <label htmlFor="item">item</label>
        <input
          type="text"
          name="item"
          id="item"
          value={product.item}
          onChange={handleChange}
        ></input>

        <label htmlFor="nombre">nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={product.nombre}
          onChange={handleChange}
        ></input>

        <label htmlFor="marca">marca</label>
        <input
          type="text"
          name="marca"
          id="marca"
          value={product.marca}
          onChange={handleChange}
          minLength={4}
        ></input>

        <label htmlFor="descripcion">descripción</label>
        <input
          type="text"
          name="descripcion"
          id="descripcion"
          value={product.descripcion}
          onChange={handleChange}
        ></input>

        <label htmlFor="categoria">categoria</label>
        <input
          type="text"
          name="categoria"
          id="categoria"
          value={product.categoria}
          onChange={handleChange}
        ></input>

        <label htmlFor="base">precio</label>
        <input
          type="number"
          name="base"
          id="base"
          value={product.precio.base}
          onChange={handleChange}
        ></input>

        <label htmlFor="moneda">moneda</label>
        <input
          type="text"
          name="moneda"
          id="moneda"
          value={product.precio.moneda}
          onChange={handleChange}
        ></input>

        <label htmlFor="codigo">código</label>
        <input
          type="text"
          name="codigo"
          id="codigo"
          value={product.codigo}
          onChange={handleChange}
        ></input>

        <label htmlFor="color">color</label>
        <input
          type="text"
          name="color"
          id="color"
          value={product.color}
          onChange={handleChange}
        ></input>

        <label htmlFor="cantidad">cantidad</label>
        <input
          type="number"
          name="cantidad"
          id="cantidad"
          value={product.cantidad}
          onChange={handleChange}
        ></input>

        {edit ? (
          <button className="formBtn">modificar producto</button>
        ) : (
          <button className="formBtn">crear producto</button>
        )}
      </form>
    </div>
  );
};
