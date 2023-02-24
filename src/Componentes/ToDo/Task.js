import React from 'react';
import useLocalStorage from '../../Hooks/useLocalStorage';

const Task = () => {
  const [generateSubtask, setGenerateSubtask] = React.useState([]);
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
      sub2: {
        value: '',
        mark: false,
      },
    },
  });

  const { setTask: setTaskInStorage } = useLocalStorage({});

  const addSubtask = (event) => {
    event.preventDefault();
    setId((prev) => prev + 1);
    const propsObj = { value: '', mark: false };
    setGenerateSubtask([...generateSubtask, { [`sub${id}`]: propsObj }]);
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

  const setGenerateId = (fullDados) => {
    const randomNumber = () => Math.floor(Math.random() * 100);
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
    setDados({ ...dados });
    let fullDados = [storageName('todo'), storageName('doing'), storageName('done')];
    fullDados = fullDados.filter((element) => element);
    const generateId = setGenerateId(fullDados);
    const id = fullDados.length ? generateId : 1;
    setTaskInStorage({ id, dados, ...subtask });
  };

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
            placeholder="Ask the teacher about the book"
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
            placeholder="Because the teacher say a book is amazing"
          />
        </div>

        <div>
          <label htmlFor="sub1">Subtasks</label>
          <ul className="subtasks">
            <li>
              <input
                onChange={subtasksChange}
                type="text"
                value={subtask.subtasks.sub1.value}
                id="sub1"
                placeholder="Take the book"
              />
            </li>

            <li>
              <input
                onChange={subtasksChange}
                type="text"
                value={subtask.subtasks.sub2.value}
                id="sub2"
                placeholder="Return the book in 30 days"
              />
            </li>

            {generateSubtask.length
              ? generateSubtask.map((id, i) => (
                  <li key={Object.keys(id)[0]}>
                    <input
                      onChange={subtasksChange}
                      type="text"
                      value={subtask.subtasks[Object.keys(id)[0]]['value']}
                      id={Object.keys(id)[0]}
                    />
                  </li>
                ))
              : ''}
          </ul>

          <button onClick={addSubtask}>+Add new subtask</button>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            onChange={handleChange}
            value={dados.status}
            name="status"
            id="status"
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button
          type="submit"
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
