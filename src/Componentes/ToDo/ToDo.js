import React from 'react';
import AllTasks from './Status/AllTasks';
import ShowTodo from './ShowTodo';
import { GlobalContext } from '../../Hooks/UseContext';

const ToDo = () => {
  const [showDados, setShowDados] = React.useState('');
  const [isVisible, setVisible] = React.useState(false);

  return (
    <>
      <ShowTodo showDados={showDados} isVisible={isVisible} setVisible={setVisible} />

      <GlobalContext.Provider value={{ showDados, setShowDados, isVisible, setVisible }}>
        <AllTasks />
      </GlobalContext.Provider>
    </>
  );
};

export default ToDo;
