import React from "react";

import Switch from "../Sider/Switch";

const Parameter = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  type,
  options,
}) => {
  return (
    <div className="parameter">
      <h3>{label}</h3>
      {type === "boolean" ? (
        <Switch
          state={value}
          toggle={() => {
            onChange(!value);
          }}
        />
      ) : type === "number" ? (
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      ) : (
        type === "select" && (
          <select
            value={value}
            onChange={(event) => {
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
