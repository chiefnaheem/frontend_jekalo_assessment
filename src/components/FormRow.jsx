import React from "react";

const FormRow = ({ type, name, value, handleChange, horizontal, placeholder }) => {
  return (
    <div className="form-row">
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormRow;
