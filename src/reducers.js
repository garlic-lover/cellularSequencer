import { combineReducers } from "redux";
import {
  ARRAY_MODIFY,
  CELLS_MOVE,
  SET_GRID_SIZE,
  PARAMETERS_CHANGE,
  SYNTH_EDIT
} from "./actions";

const initialStateGrid = {
  array: [],
  cells: [],
  gridSize: { x: 24, y: 24 },
  parameters: { scale: "major", octavesRange: 3, base: 2, tempo: 60 }
};

function gridManager(state = initialStateGrid, action) {
  switch (action.type) {
    case ARRAY_MODIFY:
      return { ...state, array: action.array };
    case CELLS_MOVE:
      return { ...state, cells: action.array };
    case SET_GRID_SIZE:
      return { ...state, gridSize: action.gridSize };
    case PARAMETERS_CHANGE:
      return { ...state, parameters: action.parameters };
    default:
      return state;
  }
}

const initialStateSynth = {
  pitchDecay: 0.3,
  octaves: 1,
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 0.001,
    decay: 0.4,
    sustain: 0.01,
    release: 1.4,
    attackCurve: "exponential"
  }
};

function synthParameters(state = initialStateSynth, action) {
  switch (action.type) {
    case SYNTH_EDIT:
      console.log(action.parameters);
      return action.parameters;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  gridManager,
  synthParameters
});

export default appReducer;