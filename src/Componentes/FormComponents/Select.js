import React from 'react';

const capitalize = (str) => {
  if (typeof str !== 'string') {
    return '';
  }
  return str[0].toUpperCase() + str.slice(1);
};

const Select = ({ options, id, value, onChange, firstOptionDisabled, children }) => {
  console.log('aqq', value);
  return (
    <select id={id} name={id} value={value} onChange={onChange}>
      {firstOptionDisabled && (
        <option value="" disabled>
          Select
        </option>
      )}

      {children && children}

      {options.map((option) => (
        <option value={option} key={option}>
          {capitalize(option)}
        </option>
      ))}
    </select>
  );
};

export default Select;
