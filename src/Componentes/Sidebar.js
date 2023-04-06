import React from 'react';
import styles from './Css/Sidebar.module.css';

const Sidebar = ({ refAside }) => {
  return (
    <aside className={`${styles.sidebar}`} ref={refAside}>
      <article>
        <div className="container">
          <h1>kanban</h1>
          <ul>
            <li>Launcher</li>
            <li>Registre-se</li>
            <li>Login</li>
          </ul>
        </div>
      </article>
    </aside>
  );
};

export default React.memo(Sidebar);
