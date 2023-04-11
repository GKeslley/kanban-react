import React from 'react';
import styles from './Css/MenuHamburguer.module.css';

const MenuHamburguer = ({ openMenu, openMenuHamburguer }) => {
  console.log(openMenuHamburguer);
  return (
    <div className={`${styles['hamburger-menu']} `} onClick={openMenu}>
      <button className={`${styles['menu-button']} ignore-click-outside`}>
        <span className={`ignore-click-outside ${styles.line}`}></span>
        <span className={`ignore-click-outside ${styles.line}`}></span>
        <span className={`ignore-click-outside ${styles.line}`}></span>
      </button>
    </div>
  );
};

export default MenuHamburguer;
