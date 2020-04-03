import React from "react";

//Import of components
import Fader from "./Fader";
import Parameter from "./Parameter";

import ParametersList from "./ParametersList";

const SynthParams = ({ synthParameters, onSynthEdit }) => {
  return (
    <div id="SynthBar" onClick={() => {}}>
      <h3>Sound Params</h3>
      <div className="parameter">
        <h3>Wave type</h3>
        <select
          value={synthParameters.oscillator.type}
          onChange={async event => {
            let params = { ...synthParameters };
            params.oscillator = { type: event.target.value };
            await onSynthEdit(params);
          }}
        >
          <option value="sawtooth">Sawtooth</option>
          <option value="sine">Sine</option>
          <option value="square">Square</option>
        </select>
      </div>
      {ParametersList.map((param, index) => {
        return (
          <Parameter
            key={index}
            type={param.type}
            label={param.label}
            min={param.min}
            step={param.step}
            value={
              param.level === 0
                ? synthParameters[param.param]
                : synthParameters.envelope[param.param]
            }
            onChange={async value => {
              let params = { ...synthParameters };
              if (param.level === 0) {
                params[param.param] = value;
              } else {
                let envelope = { ...params.envelope };
                envelope[param.param] = value;
                params.envelope = envelope;
              }

              await onSynthEdit(params);
            }}
          />
        );
      })}
      <Fader />
    </div>
  );
};

export default SynthParams;
