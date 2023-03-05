import React from 'react';

const useOutsideClick = (refTask, callback) => {
  React.useEffect(() => {
    const outsideClick = ({ target }) => {
      if (target && target.classList.contains('ignore-click-outside')) return null;

      if (refTask && refTask.current && !refTask.current.contains(target)) {
        callback();
      }
    };

    document.documentElement.addEventListener('click', outsideClick);

    return () => {
      document.documentElement.removeEventListener('click', outsideClick);
    };
  }, [refTask, callback]);
};

export default useOutsideClick;
