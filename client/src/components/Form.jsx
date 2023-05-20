import React from "react";

const Form = ({ handleSubmit, children }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {children}
    </form>
  );
};

export default Form;
