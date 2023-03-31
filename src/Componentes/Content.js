import React from 'react';
import StatusColumns from './StatusColumns';
import ShowCard from './Card/ShowCard';
import { GlobalContext } from '../Hooks/UseContext';

const Content = () => {
  const [showDados, setShowDados] = React.useState('');
  const [isVisible, setVisible] = React.useState(false);

  return (
    <>
      <ShowCard showDados={showDados} isVisible={isVisible} setVisible={setVisible} />

      <GlobalContext.Provider value={{ showDados, setShowDados, isVisible, setVisible }}>
        <StatusColumns />
      </GlobalContext.Provider>
    </>
  );
};

export default Content;
