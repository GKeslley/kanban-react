import React from 'react';
import Button from './Button';
import styles from './Css/Close.module.css';

const Close = ({ setIsVisible }) => {
  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <Button
      type="button"
      className={styles.closeTask}
      onClick={handleClick}
      aria-label={'Fechar task'}
    >
      Close
    </Button>
  );
};

export default Close;
