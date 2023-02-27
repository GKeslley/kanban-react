import React from 'react';
// import useLocalStorage from '../../Hooks/useLocalStorage';

const ShowTodo = ({ showDados, targetTask, isVisible }) => {
  const { id, dados, subtasks } = showDados;

  const allStatus = ['todo', 'doing', 'done'];

  if (subtasks) {
    const valuesSubtasks = Object.values(subtasks);
    const keysSubtasks = Object.keys(subtasks);

    allStatus.splice(allStatus.indexOf(dados.status), 1);

    return (
      <>
        <article>
          {dados && isVisible && (
            <div className="taskBackground">
              <div ref={targetTask} className="taskForm viewTask">
                <p>{dados.title}</p>
                <p>{dados.description}</p>
                <form action="">
                  {valuesSubtasks.length &&
                    valuesSubtasks.map(({ value, mark }, i) => (
                      <label key={value + i} htmlFor="">
                        <input type="checkbox" id={keysSubtasks[i]} value={value} />
                        <span className="styleBox"></span>
                        {value}
                      </label>
                    ))}
                </form>
                <form action="">
                  <select id="taskSelect">
                    <option value={dados.status}>{dados.status}</option>
                    {allStatus.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </div>
          )}
        </article>
      </>
    );
  }
};

export default ShowTodo;
