import React from "react";
import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Упс, ничего не найдено 😕</h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует в интернет-магазине
      </p>
    </div>
  );
};
