import React from "react";

const Parameter = ({ label, value, onChange, min, step }) => {
  return (
    <div className="parameter">
      <h3>{label}</h3>
      <input
        type="number"
        min={min}
        value={value}
        step={step}
        onChange={event => {
          onChange(event.target.value);
        }}
      />
    </div>
  );
};

export default Parameter;
