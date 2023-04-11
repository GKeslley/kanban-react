import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from '../Css/Card.module.css';

const Card = ({ card, global, index, listIndex, move, list }) => {
  const { id, dados, subtasks } = card;
  const ref = React.useRef();

  const handleClick = ({ id, dados, subtasks }) => {
    global.setShowDados({ id, dados, subtasks });
    setTimeout(() => {
      global.setVisible(true);
    }, 10);
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { id, index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedDrop = item.index;
      const targetIndex = index;

      if (draggedDrop === targetIndex || listIndex !== item.listIndex) return;

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedDrop < targetIndex && draggedTop < targetCenter) return null;
      if (draggedDrop > targetIndex && draggedTop > targetCenter) return null;

      move(draggedDrop, targetIndex, dados.status);
      item.index = targetIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <div
      className={styles['card-item']}
      data-drag={isDragging ? true : false}
      onClick={() => handleClick({ id, dados, subtasks })}
      ref={ref}
    >
      <div className={styles.card} key={id} id={id}>
        <span className={styles.cardTitle}>{dados.title}</span>
        <span>
          {subtasks ? Object.values(subtasks).filter(({ mark }) => mark).length : 0} of{' '}
          {subtasks ? Object.values(subtasks).filter(({ value }) => value).length : 0}{' '}
          subtasks
        </span>
      </div>
    </div>
  );
};

export default Card;
