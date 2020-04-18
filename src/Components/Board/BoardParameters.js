import scales from "../../assets/scales";

let theScales = Object.keys(scales);

const BoardParameters = [
  {
    param: "tempo",
    label: "Tempo",
    type: "number",
    min: 20,
    max: 200,
    step: 5,
  },
  { param: "scale", label: "Scale", type: "select", options: theScales },
  {
    param: "base",
    label: "Base  octave",
    type: "number",
    min: 0,
    max: 7,
    step: 1,
  },
  {
    param: "octavesRange",
    label: "Octave range",
    type: "number",
    min: 1,
    max: 5,
    step: 1,
  },
];

export default BoardParameters;
