import React from 'react';
import useLocalStorage from '../../Hooks/useLocalStorage';
import styles from '../Css/DeleteCard.module.css';

const DeleteCard = ({ targetTask, setModified, status, setVisible }) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const { updateStorageItem } = useLocalStorage();

  const handleDelet = () => {
    const storage = localStorage.getItem(status);
    setModified(false);

    try {
      if (!storage) {
        localStorage.removeItem(status);
        return null;
      }

      const parseStorage = JSON.parse(storage);
      const idTarget = targetTask.current.id;

      const newElements = parseStorage.filter((obj) => {
        return obj.id !== +idTarget;
      });

      if (newElements.length) {
        updateStorageItem(status, newElements);
      } else {
        localStorage.removeItem(status);
      }
    } catch (error) {
      console.log('Não foi possivel remover seu item');
    } finally {
      setVisible(false);
    }
  };

  return (
    <>
      <div className={styles['dots-bg']} onClick={() => setOpenDropdown(!openDropdown)}>
        <div className={styles.dots}></div>
      </div>

      {openDropdown && (
        <div className={styles.dropdown}>
          <span onClick={handleDelet}>Delet task</span>
        </div>
      )}
    </>
  );
};

export default DeleteCard;
