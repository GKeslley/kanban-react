import React from 'react';
import Todo from './Todo';

const AllTasks = () => {
  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        justifyItems: 'center',
      }}
      className="container"
    >
      <li className="flexColumn">
        <p>TODO</p>
        <Todo status="todo" />
      </li>

      <li className="flexColumn">
        <p>DOING</p>
        <Todo status="doing" />
      </li>

      <li className="flexColumn">
        <p>DONE</p>
        <Todo status="done" />
      </li>
    </ul>
  );
};

export default AllTasks;
