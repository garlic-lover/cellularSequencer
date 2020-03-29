import React from "react";

const Parameter = ({ label, value, onChange, min, step, type }) => {
  return (
    <div className="parameter">
      <h3>{label}</h3>
      {type === "boolean" ? (
        <div
          onClick={() => {
            onChange(!value);
          }}
        >
          {value === true ? "On" : "Off"}
        </div>
      ) : (
        <input
          type="number"
          min={min}
          value={value}
          step={step}
          onChange={event => {
            onChange(event.target.value);
          }}
        />
      )}
    </div>
  );
};

export default Parameter;
