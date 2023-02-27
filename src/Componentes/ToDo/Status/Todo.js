import React from 'react';
import useOutsideClick from '../../../Hooks/useOutsideClick';
// import useLocalStorage from '../useLocalStorage';
import GlobalContext from '../../../Hooks/UseContext';

const Todo = ({ status }) => {
  const global = React.useContext(GlobalContext);

  const objs = localStorage.getItem(status) ? localStorage.getItem(status) : [];
  const dados = objs.length ? JSON.parse(objs) : [];

  const handleClick = ({ id, dados, subtasks }) => {
    global.setShowDados({ id, dados, subtasks });
    setTimeout(() => {
      global.setVisible(true);
    }, 10);
  };

  const handleOutsideClick = () => {
    if (global.isVisible) {
      global.setVisible(false);
    }
  };

  useOutsideClick(global.targetTask, false, handleOutsideClick);
  if (!dados.length) return null;
  return (
    <>
      {dados.length && (
        <div className="tasks-content">
          {dados.map(({ id, dados, subtasks }, i) => (
            <div
              className="task"
              onClick={() => handleClick({ id, dados, subtasks })}
              key={i}
            >
              <span>{dados.title}</span>
              <span>
                {subtasks ? Object.values(subtasks).filter(({ mark }) => mark).length : 0}{' '}
                of {subtasks ? Object.keys(subtasks).length : 0} subtasks
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Todo;
