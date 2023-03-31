import React from 'react';
import AllCards from './Card/AllCards';

const StatusColumns = () => {
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
          <AllCards status={status} listIndex={index} />
        </li>
      ))}
    </ul>
  );
};

export default StatusColumns;
