const ItemList = (props) => {
  const { data, handler } = props;
  return <div onClick={handler} style={{cursor:'pointer'}}>{data.nombre}</div>;
};

export default ItemList;
