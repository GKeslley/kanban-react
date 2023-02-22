import React from 'react';

const Sidebar = () => {
  return (
    <article style={{ paddingTop: '1.2em' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem' }}>kanban</h1>
        <ul
          style={{
            padding: '2em 0em',
            display: 'flex',
            flexDirection: 'column',
            gap: '1em 0em',
            fontSize: '1.2rem',
          }}
        >
          <li className="btn">Launcher</li>
          <li className="btn">Registre-se</li>
          <li className="btn">Login</li>
        </ul>
      </div>
    </article>
  );
};

export default Sidebar;
