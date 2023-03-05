import React from 'react';
import useLocalStorage from '../../Hooks/useLocalStorage';

const Task = ({ setIsVisible }) => {
  const [id, setId] = React.useState(3);

  const [dados, setDados] = React.useState({
    title: '',
    description: '',
    status: '',
  });

  const [subtask, setSubtask] = React.useState({
    subtasks: {
      sub1: {
        value: '',
        mark: false,
      },
    },
  });

  const allSubtasks = [{ ...subtask.subtasks }];
  const allSubtasksKeys = allSubtasks.map((obj) => Object.keys(obj)).flat(Infinity);

  const splitSubtasks = allSubtasksKeys.map((nameSubtask) => {
    return { [nameSubtask]: subtask.subtasks[nameSubtask] };
  });

  const [, setInStorage] = useLocalStorage('');

  const handleSaveDados = (saveTask) => {
    setInStorage(saveTask);
  };

  const addSubtask = (event) => {
    event.preventDefault();
    setId((prev) => prev + 1);
    const propsObj = { value: '', mark: false };
    setSubtask({ ...subtask }, (subtask['subtasks'][`sub${id}`] = propsObj));
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setDados({ ...dados, [id]: value });
  };

  const subtasksChange = ({ target }) => {
    const { id, value } = target;
    setSubtask({ ...subtask }, (subtask['subtasks'][id]['value'] = value));
  };

  const deletSubtask = ({ target }) => {
    const deletInput = target.previousElementSibling.id;
    setSubtask((prevState) => ({
      ...prevState,
      subtasks: Object.keys(prevState.subtasks)
        .filter((key) => key !== deletInput)
        .reduce((obj, key) => {
          obj[key] = prevState.subtasks[key];
          return obj;
        }, {}),
    }));
  };

  const setGenerateId = (fullDados) => {
    const randomNumber = () => Math.floor(Math.random() * 1000);
    for (let i = 0; i < fullDados.length; i++) {
      let id = randomNumber();
      const object = fullDados[i];
      while (object['id'] === id) {
        id = randomNumber();
      }
      return id;
    }
  };

  const sendTask = (event) => {
    event.preventDefault();
    const storageName = (name) => JSON.parse(localStorage.getItem(name));
    let fullDados = [storageName('todo'), storageName('doing'), storageName('done')];
    fullDados = fullDados.filter((element) => element);
    const generateId = setGenerateId(fullDados);
    const id = fullDados.length ? generateId : 1;
    const task = { id, dados, ...subtask };
    handleSaveDados(task);
    setIsVisible(false);
  };

  console.log(splitSubtasks);

  return (
    <>
      <h3>Add New Task</h3>

      <form action="">
        <div>
          <label htmlFor="title">Title</label>
          <input
            onChange={handleChange}
            type="text"
            id="title"
            value={dados.title}
            placeholder="Buy steaks tomorrow at the market"
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            onChange={handleChange}
            type="text"
            value={dados.description}
            id="description"
            placeholder="Next week my friends will visit me"
          />
        </div>

        <div>
          <label htmlFor="sub1">Subtasks</label>
          <ul className="subtasks">
            {splitSubtasks.length
              ? splitSubtasks.map((obj, i) => {
                  const nameSubtask = Object.keys(obj)[0];

                  return (
                    <li key={nameSubtask}>
                      <input
                        onChange={subtasksChange}
                        type="text"
                        value={subtask.subtasks[nameSubtask]['value']}
                        id={nameSubtask}
                        placeholder={nameSubtask === 'sub1' ? 'Buy salt' : ''}
                      />

                      <span
                        className="cross-1px ignore-click-outside"
                        onClick={deletSubtask}
                      ></span>
                    </li>
                  );
                })
              : ''}
          </ul>

          <button onClick={addSubtask}>+Add new subtask</button>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select onChange={handleChange} value={dados.status} name="status" id="status">
            <option value="" disabled>
              Select
            </option>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button
          type="button"
          disabled={dados.title && dados.status ? false : true}
          onClick={sendTask}
          style={{ background: '#7b4ef7', color: '#fff' }}
        >
          Create Task
        </button>
      </form>
    </>
  );
};

export default Task;
