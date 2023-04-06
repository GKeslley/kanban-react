import React from 'react';

const Input = ({ type, value, name, ...props }) => {
  return <input type={type} name={name} id={name} {...props} />;
};

export default Input;
