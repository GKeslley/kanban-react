import React from 'react';
import useLocalStorage from '../../Hooks/useLocalStorage';
import Button from '../Button';
import Input from '../FormComponents/Input';
import Select from '../FormComponents/Select';
import styles from '../Css/CreateCard.module.css';

const CreateCard = ({ setIsVisible, refTask }) => {
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

  const { setStorageItem } = useLocalStorage();

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

  const setGenerateId = (allStatusData) => {
    const randomNumber = () => Math.floor(Math.random() * 1000);
    for (let i = 0; i < allStatusData.length; i++) {
      let id = randomNumber();
      const object = allStatusData[i];
      while (object['id'] === id) {
        id = randomNumber();
      }
      return id;
    }
  };

  const sendTask = (event) => {
    event.preventDefault();
    const storageName = (name) => JSON.parse(localStorage.getItem(name));
    let allStatusData = [
      storageName('todo'),
      storageName('doing'),
      storageName('done'),
    ].filter((element) => element);
    const generateId = setGenerateId(allStatusData);
    const id = allStatusData.length ? generateId : 1;
    const task = { id, dados, ...subtask };

    setStorageItem(task.dados.status, task);
    setIsVisible(false);
  };

  return (
    <>
      <div ref={refTask} className={`${styles.taskForm} modal`}>
        <h3>Add New Task</h3>

        <form action="">
          <div>
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              value={dados.title}
              name="title"
              onChange={handleChange}
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
            {splitSubtasks.length > 0 && (
              <ul className={styles.subtasks}>
                {splitSubtasks.map((obj, i) => {
                  const nameSubtask = Object.keys(obj)[0];

                  return (
                    <li key={nameSubtask}>
                      <Input
                        type="text"
                        value={subtask.subtasks[nameSubtask]['value']}
                        name={nameSubtask}
                        onChange={subtasksChange}
                        placeholder={nameSubtask === 'sub1' ? 'Buy salt' : ''}
                      />

                      <span
                        className={`${styles['cross-1px']} ignore-click-outside`}
                        onClick={deletSubtask}
                      ></span>
                    </li>
                  );
                })}
              </ul>
            )}

            <Button type="button" onClick={addSubtask}>
              +Add new subtask
            </Button>
          </div>

          <div>
            <label htmlFor="status">Status</label>
            <Select
              options={['todo', 'doing', 'done']}
              id="status"
              value={dados.status}
              onChange={handleChange}
              firstOptionDisabled={true}
            />
          </div>

          <Button
            type="button"
            className={styles.btnCreateTask}
            onClick={sendTask}
            disabled={dados.title && dados.status ? false : true}
          >
            Create Task
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateCard;
