import React from "react";
import DeliveryNav from "../components/DeliveryNav";
import DeliveryPrincipal from "../components/DeliveryPrincipal";
import styles from "../../styles/deliveryPage.module.css";

const Delivery = () => {
  return (
    <div className={styles["delivery-wrapper"]}>
      <DeliveryNav />
      <DeliveryPrincipal />
    </div>
  );
};

export default Delivery;
