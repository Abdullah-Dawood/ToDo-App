import React from "react";

const Select = ({ id, defaultValue, onChange, value, children }) => {
  return (
    <select
      id={id}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default Select;
