import React from 'react';
import Todo from './Todo';

const AllTasks = () => {
  const allStatus = ['todo', 'doing', 'done'];

  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        justifyItems: 'center',
      }}
      className="container"
    >
      {allStatus.map((status, index) => (
        <li key={status} className="flexColumn">
          <p>{status.toLocaleUpperCase()}</p>
          <Todo status={status} listIndex={index} />
        </li>
      ))}
    </ul>
  );
};

export default AllTasks;
