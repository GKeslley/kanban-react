import React from 'react';
import AllTasks from './Status/AllTasks';
import ShowTodo from './ShowTodo';
import { GlobalContext } from '../../Hooks/UseContext';

const ToDo = () => {
  const [showDados, setShowDados] = React.useState('');
  const [isVisible, setVisible] = React.useState(false);
  const targetTask = React.useRef();

  return (
    <>
      <ShowTodo showDados={showDados} targetTask={targetTask} isVisible={isVisible} />
      <GlobalContext.Provider
        value={{ showDados, setShowDados, isVisible, setVisible, targetTask }}
      >
        <AllTasks />
      </GlobalContext.Provider>
    </>
  );
};

export default ToDo;
