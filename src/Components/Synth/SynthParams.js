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
import Switch from "../Sider/Switch";

import ParametersList from "./ParametersList";

const SynthParams = ({ synthParameters, onSynthEdit, synthType }) => {
  return (
    <div id="SynthBar" onClick={() => {}}>
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
        <div className="column align">
          <h3>FM1</h3>
          <Fader
            name="modFreq"
            value={synthParameters.fmSynth.harmonicity / 4}
            callbackValue={(value) => {
              let fullParams = { ...synthParameters };
              let params = { ...fullParams.fmSynth };

              value = value * 40; //
              value = Math.round(value);
              value = value / 10;
              /* if (value % 1 !== 0) {
                return;
              } */

              params.harmonicity = value * 4;
              fullParams.fmSynth = params;
              console.log(fullParams);
              onSynthEdit(fullParams);
            }}
          />
        </div>
        <div className="column align">
          <h3>FM2</h3>
          <Fader
            name="modIndex"
            value={synthParameters.fmSynth.modulationIndex / 25}
            callbackValue={(value) => {
              let fullParams = { ...synthParameters };
              let params = { ...fullParams.fmSynth };
              value = value * 25;

              /* if (value % 1 !== 0) {
                return;
              } */
              console.log(value);
              params.modulationIndex = value;
              fullParams.fmSynth = params;
              console.log(fullParams);
              onSynthEdit(fullParams);
            }}
          />
        </div>
      </div>
      <div className="width column align">
        <h3>Synth</h3>
        <Switch
          state={synthParameters.synthOn}
          toggle={() => {
            let params = { ...synthParameters };
            params.synthOn = !synthParameters.synthOn;
            onSynthEdit(params);
          }}
        />
      </div>
      <div className="width column align">
        <h3>Delay</h3>
        <Switch
          state={synthParameters.delayOn}
          toggle={() => {
            let params = { ...synthParameters };
            params.delayOn = !synthParameters.delayOn;
            onSynthEdit(params);
          }}
        />
      </div>
      <div className="width column align">
        <h3>Drums</h3>
        <Switch
          state={synthParameters.drumsOn}
          toggle={() => {
            let params = { ...synthParameters };
            params.drumsOn = !synthParameters.drumsOn;
            onSynthEdit(params);
          }}
        />
      </div>
    </div>
  );
};

export default SynthParams;
