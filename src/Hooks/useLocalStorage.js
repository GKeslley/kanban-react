import React from 'react';

const useLocalStorage = () => {
  const [task, setTask] = React.useState();
  React.useEffect(() => {
    const regex = /[[\]]/g;
    console.log(task);
    if (task && task.dados.status) {
      localStorage.setItem(
        task.dados.status,
        localStorage.getItem(task.dados.status)
          ? `[${JSON.stringify(task)}, ${localStorage
              .getItem(task.dados.status)
              .replace(regex, '')}]`
          : `[${JSON.stringify(task)}]`,
      );
    }
  }, [task]);

  return { task, setTask };
};

export default useLocalStorage;
