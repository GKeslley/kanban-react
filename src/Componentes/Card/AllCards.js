import React from 'react';
import { produce } from 'immer';
import Card from './Card';
import styles from '../Css/AllCards.module.css';
import useLocalStorage from '../../Hooks/useLocalStorage';

const AllCards = ({ status, listIndex, setShowDados, setVisible }) => {
  console.log(setShowDados);
  const [list, setList] = React.useState(false);
  const { updateStorageItem } = useLocalStorage();

  const dados = { [status]: JSON.parse(localStorage.getItem(status)) };

  const move = (from, to, statusTargetMove) => {
    const statusTarget = JSON.parse(localStorage.getItem(statusTargetMove));
    setList(
      produce(statusTarget, (draft) => {
        const dragged = draft[from];
        draft.splice(from, 1);
        draft.splice(to, 0, dragged);
      }),
    );
  };

  if (list) {
    updateStorageItem(status, list);
    setList(false);
  }

  if (!dados[status]) return null;
  return (
    <>
      {dados[status].length && (
        <div className={styles['cards-content']}>
          {dados[status].map(({ id, dados, subtasks }, index) => (
            <Card
              key={id}
              card={{ dados, id, subtasks }}
              index={index}
              listIndex={listIndex}
              setShowDados={setShowDados}
              setVisible={setVisible}
              move={move}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AllCards;
