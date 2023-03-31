import React from 'react';
import useLocalStorage from '../../Hooks/useLocalStorage';
import useOutsideClick from '../../Hooks/useOutsideClick';
import DeleteCard from './DeleteCard';

const ShowCard = ({ showDados, isVisible, setVisible }) => {
  const { id, dados, subtasks } = showDados;
  const [, setInStorage] = useLocalStorage('');

  const [modified, setModified] = React.useState(false);
  const [updateDados, setUpdateDados] = React.useState(null);
  const [updateTask, setUpdateTask] = React.useState({});
  const targetTask = React.useRef();

  const allStatus = ['todo', 'doing', 'done'];

  const handleOutsideClick = () => {
    if (isVisible) {
      setVisible(false);
    }
  };

  useOutsideClick(targetTask, handleOutsideClick);

  const handleSaveDados = (saveTask) => {
    setInStorage(saveTask);
  };

  const selectSubtasks = ({ target }) => {
    if (target.checked) subtasks[target.id].mark = true;
    else subtasks[target.id].mark = false;

    setUpdateTask({ id, dados: updateDados ? updateDados : dados, subtasks });
    setModified(true);
  };

  const changeStatus = (target, { dados }) => {
    const modifiedStatus = { ...dados, status: target.value };
    setUpdateDados(modifiedStatus);

    setUpdateTask({ id, dados: modifiedStatus, subtasks });
    setModified(true);
  };

  const relocateElement = (parseElements, removeElement, dados) => {
    console.log('AQ TBMMM');
    parseElements.splice(removeElement, 1);
    handleSaveDados(updateTask);

    localStorage.removeItem(dados.status);
    if (parseElements.length) {
      localStorage.setItem(dados.status, JSON.stringify(parseElements));
    }
  };

  const editOptions = (parseElements, removeElement) => {
    const allData = { id, dados, subtasks };

    parseElements.splice(removeElement, 1, allData);
    localStorage.setItem(dados.status, JSON.stringify(parseElements));
  };

  if (!isVisible && modified && dados && dados.status) {
    const allElements = localStorage.getItem(dados.status);
    const parseElements = JSON.parse(allElements);

    if (parseElements) {
      const searchElement = parseElements.filter((element) => element.id === id);
      const removeElement = parseElements.indexOf(searchElement[0]);

      if (removeElement >= 0 && updateTask && updateTask.dados.status !== dados.status) {
        relocateElement(parseElements, removeElement, dados);
      } else if (removeElement >= 0) {
        editOptions(parseElements, removeElement);
        console.log('AQQQ');
      }
    }

    setModified(false);
    setUpdateTask({});
    setUpdateDados(null);
  }
  if (subtasks) {
    const valuesSubtasks = Object.values(subtasks);
    const keysSubtasks = Object.keys(subtasks);

    allStatus.splice(allStatus.indexOf(dados.status), 1);

    return (
      <>
        <article>
          {dados && isVisible && (
            <div className="taskBackground">
              <div ref={targetTask} className="taskForm viewTask" id={id}>
                <div className="flex-between">
                  <p>{dados.title}</p>

                  <DeleteCard
                    targetTask={targetTask}
                    setModified={setModified}
                    status={dados.status}
                    setVisible={setVisible}
                  />
                </div>

                <p>{dados.description}</p>

                <form action="">
                  {valuesSubtasks.length
                    ? valuesSubtasks.map(({ value, mark }, i) => (
                        <label key={keysSubtasks[i]}>
                          <input
                            onChange={selectSubtasks}
                            type="checkbox"
                            id={keysSubtasks[i]}
                            value={value}
                            checked={mark}
                          />
                          <span className="styleBox"></span>
                          {value}
                        </label>
                      ))
                    : ''}
                </form>

                <form action="">
                  <select
                    id="taskSelect"
                    onChange={({ target }) => changeStatus(target, { dados })}
                  >
                    <option value={dados.status}>{dados.status}</option>

                    {allStatus.map((status) => (
                      <option key={status} value={status}>
                        {status}
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
export default ShowCard;
