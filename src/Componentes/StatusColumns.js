import React from 'react';
import useMobile from '../Hooks/useMobile';
import AllCards from './Card/AllCards';
import Select from './FormComponents/Select';
import styles from './Css/StatusColumns.module.css';

function renderCards(statusList, selectedStatus, setShowDados, setVisible) {
  if (!selectedStatus) {
    return statusList.map((status, index) => (
      <li key={status} className="flexColumn">
        <p className={styles[status]}>{status.toLocaleUpperCase()}</p>
        <AllCards
          status={status}
          listIndex={index}
          setShowDados={setShowDados}
          setVisible={setVisible}
        />
      </li>
    ));
  } else {
    return (
      <li className="flexColumn">
        <p className={styles[selectedStatus]}>{selectedStatus.toLocaleUpperCase()}</p>
        <AllCards
          status={selectedStatus}
          listIndex={0}
          setShowDados={setShowDados}
          setVisible={setVisible}
        />
      </li>
    );
  }
}

const StatusColumns = ({ setShowDados, setVisible }) => {
  const allStatus = ['todo', 'doing', 'done'];
  const verifyIsMobile = useMobile();

  const [mobileCard, setMobileCard] = React.useState(() => {
    const mediaQuery = window.matchMedia('(max-width: 800px)');
    if (mediaQuery.matches) {
      return 'todo';
    } else {
      return '';
    }
  });

  React.useEffect(() => {
    if (verifyIsMobile) {
      setMobileCard('todo');
    } else {
      setMobileCard('');
    }
  }, [verifyIsMobile]);

  const isMobile = (
    <Select
      options={allStatus}
      value={mobileCard}
      id="selectMobile"
      className={styles.selectMobile}
      onChange={({ target }) => setMobileCard(target.value)}
    />
  );

  return (
    <>
      {isMobile}

      <ul className={`${styles.columns} container`}>
        {renderCards(allStatus, mobileCard, setShowDados, setVisible)}
      </ul>
    </>
  );
};

export default StatusColumns;
