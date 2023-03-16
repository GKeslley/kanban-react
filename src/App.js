import React from 'react';
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import Task from './Componentes/ToDo/Task';
import ToDo from './Componentes/ToDo/ToDo';
import useOutsideClick from './Hooks/useOutsideClick';

const App = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const refTask = React.useRef();

  const handleOutsideClick = () => setIsVisible(false);
  useOutsideClick(refTask, handleOutsideClick);

  return (
    <>
      <section style={{ display: 'grid', gridTemplateRows: '0.1fr 1fr' }}>
        <Header openTask={setIsVisible} />

        <main className="todo" style={{ padding: '1.2rem 0' }}>
          <ToDo />
        </main>
      </section>

      <aside className="sidebar">
        <Sidebar />
      </aside>

      {isVisible && (
        <article className="taskBackground">
          <div ref={refTask} className="taskForm">
            <Task setIsVisible={setIsVisible} />
          </div>
        </article>
      )}
    </>
  );
};

export default App;
