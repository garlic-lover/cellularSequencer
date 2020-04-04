import { combineReducers } from "redux";
import {
  ARRAY_MODIFY,
  CELLS_MOVE,
  SET_GRID_SIZE,
  PARAMETERS_CHANGE,
  SYNTH_EDIT,
  CHAOS_MODE,
  PLAY_STOP,
  LIFE_CHANGE,
  MIDI_SET,
} from "./actions";

const initialStateGrid = {
  array: [],
  cells: [],
  notes: { previous: [], current: [] },
  gridSize: { x: 16, y: 16 },
  parameters: {
    scale: "mixolydian",
    octavesRange: 3,
    base: 3,
    tempo: 90,
    chaosMode: true,
    chaosProba: 15,
    life: { canGive: true, canDie: true, lifePoints: 10 },
  },
  isPlaying: false,
  life: { canGive: true, canDie: true, lifePoints: 10 },
  midiData: { ready: false },
};

function gridManager(state = initialStateGrid, action) {
  switch (action.type) {
    case ARRAY_MODIFY:
      return { ...state, array: action.array };
    case CELLS_MOVE:
      let notes = { ...state.notes };
      if (action.notes) {
        notes.previous = notes.current;
        notes.current = action.notes;
      }
      return { ...state, cells: action.array, notes: notes };
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
    case MIDI_SET: {
      return { ...state, midiData: action.midi };
    }
    default:
      return state;
  }
}

const initialStateSynth = {
  membraneSynth: {
    pitchDecay: 0.01,
    octaves: 2,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.001,
      decay: 0.0,
      sustain: 0.01,
      release: 1.4,
      attackCurve: "exponential",
    },
  },
  fmSynth: {
    harmonicity: 2,
    modulationIndex: 0,
    detune: 5,
    volume: -15,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.01,
      decay: 0.03,
      sustain: 0.5,
      release: 0.5,
    },
    modulation: {
      type: "square",
    },
    modulationEnvelope: {
      attack: 0.01,
      decay: 0.03,
      sustain: 1,
      release: 0.5,
    },
  },
  synthOn: true,
  drumsOn: false,
  delayOn: true,
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
  synthParameters,
});

export default appReducer;
