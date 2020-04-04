const ParametersList = {
  membraneSynth: [
    {
      label: "Wave",
      param: "type",
      type: "select",
      parent: "oscillator",
      options: ["sine", "square", "sawtooth"]
    },
    {
      label: "Pitch Decay",
      param: "pitchDecay",
      parent: 0,
      step: 0.01,
      type: "number"
    },
    /*   { label: "Octaves", param: "octaves", parent: 0, min: 0, step: 1 }, */
    {
      label: "Attack",
      param: "attack",
      parent: "envelope",
      min: 0,
      step: 0.05,
      type: "number"
    },
    {
      label: "Decay",
      param: "decay",
      parent: "envelope",
      min: 0,
      step: 0.05,
      type: "number"
    },
    /*   { label: "Sustain", param: "sustain", parent: 1, min: 0, step: 0.1 },
  { label: "Release", param: "release", parent: 1, min: 0, step: 0.1 } */ {
      label: "Synth On",
      param: "synthOn",
      parent: 0,
      min: 0,
      step: 0.1,
      type: "boolean"
    },
    {
      label: "Drums On",
      param: "drumsOn",
      parent: 0,
      min: 0,
      step: 0.1,
      type: "boolean"
    }
  ]
};

export default ParametersList;
