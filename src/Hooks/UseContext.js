import React from 'react';

export const GlobalContext = React.createContext();

export const Context = ({ children }) => {
  const [showDados, setShowDados] = React.useState('');
  const [isVisible, setVisible] = React.useState(false);

  return (
    <GlobalContext.Provider value={{ showDados, setShowDados, isVisible, setVisible }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
