import styles from "../../styles/confirm.module.css";

export const Confirm = ({ text, handleCancel, handleConfirm }) => {
  return (
    <div className={styles["confirm-wrapper"]}>
      <div className={styles["confirm-container"]}>
        <h2>{text}</h2>
        <div className={styles["btn-container"]}>
          <button onClick={handleCancel}>cancelar</button>
          <button onClick={handleConfirm}>confirmar</button>
        </div>
      </div>
    </div>
  );
};
