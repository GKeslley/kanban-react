import React from 'react';

const useMobile = () => {
  const [verifyIsMobile, setMobile] = React.useState();

  React.useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 800);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return verifyIsMobile;
};

export default useMobile;
