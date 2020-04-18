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
    <div id="SynthBar">
      <div className="parameter column a_end">
        <h3>Instrument</h3>
        <select
          value={synthParameters.instrument}
          onChange={(event) => {
            let fullParams = { ...synthParameters };
            fullParams.instrument = event.target.value;
            onSynthEdit(fullParams);
          }}
        >
          {ParametersList.generalParams[0].options.map((option, index) => {
            return (
              <option value={option} key={index}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      {synthParameters.instrument === "membraneSynth" &&
        ParametersList.membraneSynth.map((param, index) => {
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
                  ? synthParameters.membraneSynth[param.param]
                  : synthParameters.membraneSynth[param.parent][param.param]
              }
              onChange={(value) => {
                let fullParams = { ...synthParameters };
                let params = { ...fullParams.membraneSynth };
                if (param.parent === 0) {
                  params[param.param] = value;
                } else {
                  let theParent = { ...params[param.parent] };
                  theParent[param.param] = value;
                  params[param.parent] = theParent;
                }
                fullParams.membraneSynth = params;
                onSynthEdit(fullParams);
              }}
            />
          );
        })}
      {synthParameters.instrument === "fmSynth" && (
        <div id="fmParamsBloc">
          <div style={{ marginBottom: 5 }}>
            <h3>FM params</h3>
          </div>
          <div className="row width align j_space fadersBlock">
            <div className="column align">
              <div>Freq</div>
              <Fader
                name="modFreq"
                value={synthParameters.fmSynth.harmonicity / 4}
                callbackValue={(value) => {
                  let fullParams = { ...synthParameters };
                  let params = { ...fullParams.fmSynth };

                  value = value * 10; //
                  value = Math.round(value);
                  value = value / 10;
                  /* if (value % 1 !== 0) {
                return;
              } */

                  params.harmonicity = value * 4;
                  fullParams.fmSynth = params;
                  onSynthEdit(fullParams);
                }}
              />
            </div>
            <div className="column align">
              <div>Level</div>
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
                  params.modulationIndex = value;
                  fullParams.fmSynth = params;
                  onSynthEdit(fullParams);
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div id="generalParamsBloc">
        {ParametersList.generalParams.map((param, index) => {
          if (index === 0) {
            return null;
          }
          return (
            <div key={index} className="switchContainer column align">
              <h3>{param.label}</h3>
              <Switch
                state={synthParameters[param.param]}
                toggle={() => {
                  let params = { ...synthParameters };
                  params[param.param] = !synthParameters[param.param];
                  onSynthEdit(params);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SynthParams;
