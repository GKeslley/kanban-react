import React from 'react';
import StatusColumns from './StatusColumns';
import ShowCard from './Card/ShowCard';
import styles from './Css/Content.module.css';

const Content = () => {
  const [showDados, setShowDados] = React.useState('');
  const [isVisible, setVisible] = React.useState(false);

  return (
    <main className={styles.main}>
      <ShowCard showDados={showDados} isVisible={isVisible} setVisible={setVisible} />
      <StatusColumns setShowDados={setShowDados} setVisible={setVisible} />
    </main>
  );
};

export default Content;
