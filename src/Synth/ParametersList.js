const ParametersList = [
  { label: "Pitch Decay", param: "pitchDecay", level: 0, step: 0.01 },
  /*   { label: "Octaves", param: "octaves", level: 0, min: 0, step: 1 }, */
  { label: "Attack", param: "attack", level: 1, min: 0, step: 0.05 },
  { label: "Decay", param: "decay", level: 1, min: 0, step: 0.05 },
  /*   { label: "Sustain", param: "sustain", level: 1, min: 0, step: 0.1 },
  { label: "Release", param: "release", level: 1, min: 0, step: 0.1 } */ {
    label: "Synth On",
    param: "synthOn",
    level: 0,
    min: 0,
    step: 0.1,
    type: "boolean"
  },
  {
    label: "Drums On",
    param: "drumsOn",
    level: 0,
    min: 0,
    step: 0.1,
    type: "boolean"
  }
];

export default ParametersList;
