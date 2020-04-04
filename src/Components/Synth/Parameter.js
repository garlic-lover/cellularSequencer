import React from "react";

const Parameter = ({ label, value, onChange, min, step, type, options }) => {
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
      ) : type === "number" ? (
        <input
          type="number"
          min={min}
          value={value}
          step={step}
          onChange={event => {
            onChange(event.target.value);
          }}
        />
      ) : (
        type === "select" && (
          <select
            value={value}
            onChange={event => {
              onChange(event.target.value);
            }}
          >
            {options.map((option, index) => {
              return (
                <option value={option} key={index}>
                  {option}
                </option>
              );
            })}
          </select>
        )
      )}
    </div>
  );
};

export default Parameter;
