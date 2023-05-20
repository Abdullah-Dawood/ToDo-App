import React from "react";

const Input = ({
  className,
  type,
  onChange,
  placeholder,
  defaultValue,
  Onclick,
  checked,
}) => {
  return (
    <>
      {checked ? (
        <input
          className={className}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          checked
          onClick={Onclick}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          onClick={Onclick}
        />
      )}
    </>
  );
};

export default Input;
