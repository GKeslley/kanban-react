import React from 'react';
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import Task from './Componentes/ToDo/Task';
import useOutsideClick from './Hooks/useOutsideClick';

const App = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const refTask = React.useRef();
  const refBtn = React.useRef();

  const handleOutsideClick = () => setIsVisible(false);
  useOutsideClick(refTask, refBtn, handleOutsideClick);

  return (
    <>
      <section style={{ display: 'grid', gridTemplateRows: '0.1fr 1fr' }}>
        <Header openTask={setIsVisible} refBtn={refBtn} />
      </section>

      <aside className="sidebar">
        <Sidebar />
      </aside>
    </>
  );
};

export default App;
