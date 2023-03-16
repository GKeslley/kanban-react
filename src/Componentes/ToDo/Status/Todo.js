import React from 'react';
import GlobalContext from '../../../Hooks/UseContext';

const Todo = ({ status }) => {
  const global = React.useContext(GlobalContext);

  const dados = localStorage.getItem(status)
    ? JSON.parse(localStorage.getItem(status))
    : [];

  const handleClick = ({ id, dados, subtasks }) => {
    global.setShowDados({ id, dados, subtasks });
    setTimeout(() => {
      global.setVisible(true);
    }, 10);
  };

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
