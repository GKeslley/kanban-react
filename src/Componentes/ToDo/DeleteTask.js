import React from 'react';

const DeleteTask = ({ targetTask, setModified, status, setVisible }) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);

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
        localStorage.setItem(status, JSON.stringify(newElements));
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
      <div className="dots-bg" onClick={() => setOpenDropdown(!openDropdown)}>
        <div className="dots"></div>
      </div>

      {openDropdown && (
        <article className="dropdown">
          <span onClick={handleDelet}>Delet task</span>
        </article>
      )}
    </>
  );
};

export default DeleteTask;
