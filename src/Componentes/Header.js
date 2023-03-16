import React from 'react';

const Header = ({ openTask }) => {
  const handleClick = () => {
    openTask(true);
  };

  return (
    <header
      style={{
        paddingTop: '1.6em',
        paddingBottom: '1.6em',
      }}
    >
      <div className="flex-between container">
        <h2>Laucher</h2>
        <button onClick={handleClick} className="AddTask ignore-click-outside">
          +Add new task
        </button>
      </div>
    </header>
  );
};

export default Header;
