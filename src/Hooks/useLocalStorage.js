const useLocalStorage = () => {
  const setStorageItem = (status, data) => {
    try {
      const lastElements = localStorage.getItem(status);
      const newData = lastElements ? [...JSON.parse(lastElements), data] : [data];

      localStorage.setItem(status, JSON.stringify(newData));
    } catch (error) {
      console.log('Não foi possivel adicionar o item');
    }
  };

  const updateStorageItem = (status, data) => {
    localStorage.setItem(status, JSON.stringify(data));
  };

  return { setStorageItem, updateStorageItem };
};

export default useLocalStorage;
