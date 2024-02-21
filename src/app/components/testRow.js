import { useContext } from "react";
import DataContext from "../context/DataContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faTrashCan, faFilePen } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/testRow.module.css'
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

 
  return (
    <tr className={styles["fila-tabla"]}>
      <td>{product.nombre}</td>
      <td>{product.precioBase}</td>
      <td>{product.precio}</td>
      <td>{product.categoria}</td>
      <td>
        <button className={styles["botones"]} onClick={() => handleEdit(product)}>
        <FontAwesomeIcon className={styles["icono"]} icon={faFilePen} />
        </button>
      </td>
      <td>
        <button className={styles["botones"]} onClick={() => onDeleteProduct(product)}>
        <FontAwesomeIcon className={styles["icono"]} icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
};
