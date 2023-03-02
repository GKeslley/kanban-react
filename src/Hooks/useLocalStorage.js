import React from 'react';

const useLocalStorage = (value) => {
  // const [task, setTask] = React.useState();
  const regex = /[[\]]/g;
  const [storage, setStorage] = React.useState(() => {
    if (value) {
      const key = value.dados.status;
      const keyStorage = localStorage.getItem(key);
      return keyStorage ? JSON.parse(keyStorage) : value;
    }
  });

  const setValue = (newValue) => {
    setStorage(newValue);
    const lastElements = localStorage.getItem(newValue.dados.status);
    const keyValue = newValue.dados.status;
    if (lastElements) {
      localStorage.setItem(
        keyValue,
        `[${JSON.stringify(newValue)}, ${lastElements.replace(regex, '')}]`,
      );
    } else {
      localStorage.setItem(keyValue, `[${JSON.stringify(newValue)}]`);
    }
  };

  return [storage, setValue];
};

export default useLocalStorage;
