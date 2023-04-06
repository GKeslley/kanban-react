import React from 'react';

const Button = ({ type, className, onClick, children, ...props }) => {
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
