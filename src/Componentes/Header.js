import React from 'react';
import useOutsideClick from '../Hooks/useOutsideClick';

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
    <header
      style={{
        paddingTop: '1.6em',
        paddingBottom: '1.6em',
      }}
    >
      <div className="flex-between container">
        <div>
          <span className="ignore-click-outside" onClick={openMenu}>
            O
          </span>
          <h2>Laucher</h2>
        </div>
        <button onClick={handleClick} className="AddTask ignore-click-outside">
          +Add new task
        </button>
      </div>
    </header>
  );
};

export default Header;
