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

const SynthParams = ({ synthParameters, onSynthEdit, synthType }) => {
  return (
    <div id="SynthBar" onClick={() => {}}>
      <h3>Synth</h3>
      {/* {ParametersList[synthType].map((param, index) => {
        return (
          <Parameter
            key={index}
            type={param.type}
            label={param.label}
            min={param.min}
            step={param.step}
            options={param.options}
            value={
              param.parent === 0
                ? synthParameters[synthType][param.param]
                : synthParameters[synthType][param.parent][param.param]
            }
            onChange={value => {
              let fullParams = { ...synthParameters };
              let params = { ...fullParams[synthType] };
              if (param.parent === 0) {
                params[param.param] = value;
              } else {
                let theParent = { ...params[param.parent] };
                theParent[param.param] = value;
                params[param.parent] = theParent;
              }
              fullParams[synthType] = params;
              console.log(fullParams);
              onSynthEdit(fullParams);
            }}
          />
        );
      })} */}
      <div className="row width align j_space">
        <Fader name="modFreq" value="" callbackValue={(value) => {}} />
        <Fader
          name="modIndex"
          value={synthParameters.fmSynth.modulationIndex / 100}
          callbackValue={(value) => {
            let fullParams = { ...synthParameters };
            let params = { ...fullParams.fmSynth };

            value = value * 10; //
            value = Math.round(value);
            value = value / 10;

            params.modulationIndex = value * 100;
            fullParams.fmSynth = params;
            console.log(fullParams);
            onSynthEdit(fullParams);
          }}
        />
      </div>
    </div>
  );
};

export default SynthParams;
