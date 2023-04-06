import React from 'react';
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import CreateCard from './Componentes/Card/CreateCard';
import Content from './Componentes/Content';
import useOutsideClick from './Hooks/useOutsideClick';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const refTask = React.useRef();
  const refSidebar = React.useRef();

  const handleOutsideClick = () => setIsVisible(false);
  useOutsideClick(refTask, handleOutsideClick);

  return (
    <DndProvider backend={HTML5Backend}>
      <section>
        <Header openTask={setIsVisible} refSidebar={refSidebar} />
        <Content />
      </section>

      <Sidebar refAside={refSidebar} />

      {isVisible && (
        <article className="bg-modal container">
          <CreateCard setIsVisible={setIsVisible} refTask={refTask} />
        </article>
      )}
    </DndProvider>
  );
};

export default App;
