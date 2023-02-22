import React from 'react';
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';

const App = () => {
  return (
    <>
      <section style={{ display: 'grid', gridTemplateRows: '0.1fr 1fr' }}>
        <Header />
      </section>

      <aside className="sidebar">
        <Sidebar />
      </aside>
    </>
  );
};

export default App;
