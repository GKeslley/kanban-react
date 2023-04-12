import React from 'react';
import StatusColumns from './StatusColumns';
import ShowCard from './Card/ShowCard';
import { Context } from '../Hooks/UseContext';
import styles from './Css/Content.module.css';

const Content = () => {
  return (
    <main className={styles.main}>
      <Context>
        <ShowCard />
        <StatusColumns />
      </Context>
    </main>
  );
};

export default Content;
