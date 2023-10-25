import { useContext } from "react";
import DataContext from "../context/DataContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faTrashCan, faFilePen } from "@fortawesome/free-solid-svg-icons";
// import { faFaceRelieved } from '@fortawesome/free-solid-svg-icons'

export const TestRow = (props) => {
  const {
    borrarProducto,
    setTable,
    setEdit,
    update,
    setUpdate,
    setVisibleSelected,
    pagination,
    setPagination,
    setShowForm
  } = useContext(DataContext);

  const { product, onDeleteProduct, index } = props;

  const handleEdit = (product) => {
    setEdit(true);
    setUpdate(product);
    setShowForm(true)
    // console.log(product);
  };

  // const handleDelete = async (e) => {
  //   try {
  //     const response = await borrarProducto(product);
  //     if (response.status === 200) {
  //       console.log(response.product.msg);
  //     }
  //   } catch (error) {
  //     console.error("Error al borrar el producto");
  //   } finally {
  //     setVisibleSelected(false);
  //     setPagination({
  //       currentPage: 0,
  //     });
  //     setTable(true);
  //   }
  // };

  return (
    <tr className="fila-tabla">
      <td>{product.nombre}</td>
      <td>{product.marca}</td>
      <td>{product.categoria}</td>
      <td>{product.precio.base}</td>
      <td>{product.codigo}</td>
      <td>
        <button className="botones" onClick={() => handleEdit(product)}>
        <FontAwesomeIcon className="icono" icon={faFilePen} />
        </button>
      </td>
      <td>
        <button className="botones" onClick={() => onDeleteProduct(product)}>
        <FontAwesomeIcon className="icono" icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
};
