import React from "react";

/* 
Un gros slider accessible sur le côté de la grille ; 
En appuyant sur un bouton on voit les paramètres sans style css pour modifier la 
manière dont le gros slider va agir. Ce dernier est un bouton macro.

En fonction des couleurs des blocs, jouer des instruments différents

Give special properties to some of the cells : they can change the scale or other
parameters depending on their lifepoint

Drum sounds are triggered by wall contact or by a different sequencer ? 
*/

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
          value={synthParameters.membraneSynth.oscillator.type}
          onChange={async event => {
            let fullParams = { ...synthParameters };
            let params = { ...fullParams.membraneSynth };
            params.oscillator = { type: event.target.value };
            fullParams.membraneSynth = params;
            await onSynthEdit(fullParams);
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
                ? synthParameters.membraneSynth[param.param]
                : synthParameters.membraneSynth.envelope[param.param]
            }
            onChange={async value => {
              let fullParams = { ...synthParameters };
              let params = { ...fullParams.membraneSynth };
              if (param.level === 0) {
                params[param.param] = value;
              } else {
                let envelope = { ...params.envelope };
                envelope[param.param] = value;
                params.envelope = envelope;
              }
              fullParams.membraneSynth = params;
              await onSynthEdit(fullParams);
            }}
          />
        );
      })}
      <Fader />
    </div>
  );
};

export default SynthParams;
