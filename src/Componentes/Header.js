import React from 'react';
import useOutsideClick from '../Hooks/useOutsideClick';
import Button from './Button';
import styles from './Css/Header.module.css';
import MenuHamburguer from './MenuHamburguer';

const Header = ({ openTask, refSidebar }) => {
  const [openMenuHamburguer, setMenuHamburguer] = React.useState(false);

  const handleClick = () => openTask(true);

  const openMenu = () => setMenuHamburguer((prev) => !prev);
  const closeMenu = () => setMenuHamburguer(false);

  if (refSidebar.current && openMenuHamburguer) {
    refSidebar.current.classList.add('active');
  } else if (refSidebar.current && !openMenuHamburguer) {
    refSidebar.current.classList.remove('active');
  }
  useOutsideClick(refSidebar, closeMenu);

  console.log(openMenuHamburguer);

  return (
    <header className={styles.header}>
      <div className="flex-between container">
        <div className={styles.menu}>
          <MenuHamburguer openMenu={openMenu} openMenuHamburguer={openMenuHamburguer} />
          <h2>Laucher</h2>
        </div>

        <Button
          type="button"
          className={`${styles.addTask} ignore-click-outside`}
          onClick={handleClick}
        >
          +Add new task
        </Button>
      </div>
    </header>
  );
};

export default Header;
