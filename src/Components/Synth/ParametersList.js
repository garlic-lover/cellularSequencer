const ParametersList = {
  membraneSynth: [
    {
      label: "Wave",
      param: "type",
      type: "select",
      parent: "oscillator",
      options: ["sine", "square", "sawtooth"],
    },
    {
      label: "Pitch Decay",
      param: "pitchDecay",
      parent: 0,
      step: 0.01,
      type: "number",
    },
    /*   { label: "Octaves", param: "octaves", parent: 0, min: 0, step: 1 }, */
    {
      label: "Attack",
      param: "attack",
      parent: "envelope",
      min: 0,
      step: 0.05,
      type: "number",
    },
    {
      label: "Decay",
      param: "decay",
      parent: "envelope",
      min: 0,
      step: 0.05,
      type: "number",
    },
    /*   { label: "Sustain", param: "sustain", parent: 1, min: 0, step: 0.1 },
  { label: "Release", param: "release", parent: 1, min: 0, step: 0.1 } */
  ],
  polySynth: [
    {
      label: "FM1",
      param: "harmonicity",
      parent: 0,
      min: 0,
      multiplicator: 4,
      type: "fader",
    },
    {
      label: "FM2",
      param: "modulationIndx",
      parent: 0,
      min: 0,
      multiplicator: 25,
      type: "fader",
    },
  ],
  generalParams: [
    {
      label: "Instrument",
      param: "instrument",
      type: "select",
      parent: 0,
      options: ["fmSynth", "membraneSynth"],
    },
    {
      label: "Synth",
      param: "synthOn",
      parent: 0,
      type: "boolean",
    },
    {
      label: "Poly",
      param: "polyOn",
      parent: 0,
      type: "boolean",
    },
    {
      label: "Delay",
      param: "delayOn",
      parent: 0,
      type: "boolean",
    },
    {
      label: "Drums",
      param: "drumsOn",
      parent: 0,
      type: "boolean",
    },
  ],
};

export default ParametersList;
