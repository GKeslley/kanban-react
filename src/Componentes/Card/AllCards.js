import React from 'react';
import GlobalContext from '../../Hooks/UseContext';
import { produce } from 'immer';
import Card from './Card';

const AllCards = ({ status, listIndex }) => {
  const global = React.useContext(GlobalContext);
  const [list, setList] = React.useState(false);
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
    localStorage.setItem(status, JSON.stringify(list));
    setList(false);
  }

  if (!dados[status]) return null;
  return (
    <>
      {dados[status].length && (
        <div className="tasks-content">
          {dados[status].map(({ id, dados, subtasks }, index) => (
            <Card
              key={id}
              card={{ dados, id, subtasks }}
              index={index}
              listIndex={listIndex}
              global={global}
              move={move}
              status={status}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AllCards;
