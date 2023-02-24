import React from 'react';

const useOutsideClick = (refTask, refBtn, callback) => {
  React.useEffect(() => {
    const outsideClick = ({ target }) => {
      if (refBtn.current && refTask.current && target !== refBtn.current) {
        if (refTask.current && !refTask.current.contains(target)) {
          callback();
        }
      } else if (!refBtn.current) {
        if (refTask && refTask.current && !refTask.current.contains(target)) {
          callback();
        }
      }
    };

    document.documentElement.addEventListener('click', outsideClick);

    return () => {
      document.documentElement.removeEventListener('click', outsideClick);
    };
  });
};

export default useOutsideClick;
