import React from 'react';

const Header = () => {
  const handleClick = () => {
    //;
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
        <button onClick={handleClick} className="AddTask">
          +Add new task
        </button>
      </div>
    </header>
  );
};

export default Header;
