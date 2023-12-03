import styles from '../../styles/itemList.module.css'

const ItemList = (props) => {
  const { data, handler } = props;
  return <div onClick={handler} className={styles["menu-single-item"]}>{data.nombre}</div>;
};

export default ItemList;
