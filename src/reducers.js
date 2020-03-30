import { combineReducers } from "redux";
import {
  ARRAY_MODIFY,
  CELLS_MOVE,
  SET_GRID_SIZE,
  PARAMETERS_CHANGE,
  SYNTH_EDIT,
  CHAOS_MODE,
  PLAY_STOP,
  LIFE_CHANGE
} from "./actions";

const initialStateGrid = {
  array: [],
  cells: [],
  gridSize: { x: 16, y: 16 },
  parameters: {
    scale: "minor",
    octavesRange: 1,
    base: 2,
    tempo: 100,
    chaosMode: false,
    chaosProba: 100,
    life: { canGive: true, canDie: true, lifePoints: 10 }
  },
  isPlaying: false,
  life: { canGive: true, canDie: true, lifePoints: 10 }
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
    case CHAOS_MODE:
      return { ...state, chaosMode: action.isChaos };
    case PLAY_STOP:
      return { ...state, isPlaying: action.isPlaying };
    case LIFE_CHANGE:
      return { ...state, life: action.life };
    default:
      return state;
  }
}

const initialStateSynth = {
  pitchDecay: 0,
  octaves: 2,
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 0.001,
    decay: 0.4,
    sustain: 0.01,
    release: 1.4,
    attackCurve: "exponential"
  },
  synthOn: true,
  drumsOn: true
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
