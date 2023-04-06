import React from 'react';
import useMobile from '../Hooks/useMobile';
import AllCards from './Card/AllCards';

function renderCards(statusList, selectedStatus) {
  if (!selectedStatus) {
    return statusList.map((status, index) => (
      <li key={status} className="flexColumn">
        <p>{status.toLocaleUpperCase()}</p>
        <AllCards status={status} listIndex={index} />
      </li>
    ));
  } else {
    return (
      <li className="flexColumn">
        <p>{selectedStatus.toLocaleUpperCase()}</p>
        <AllCards status={selectedStatus} listIndex={0} />
      </li>
    );
  }
}

const StatusColumns = () => {
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
    <select id="selectMobile" onChange={({ target }) => setMobileCard(target.value)}>
      {allStatus.map((st) => (
        <option key={st}>{st}</option>
      ))}
    </select>
  );

  return (
    <>
      {isMobile}

      <ul className="columns container">{renderCards(allStatus, mobileCard)}</ul>
    </>
  );
};

export default StatusColumns;
