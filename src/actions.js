export const ARRAY_MODIFY = "ARRAY_MODIFY";
export const CELLS_MOVE = "CELLS_MOVE";
export const SET_GRID_SIZE = "SET_GRID_SIZE";
export const PARAMETERS_CHANGE = "PARAMETERS_CHANGE";
export const SYNTH_EDIT = "SYNTH_EDIT";
export const CHAOS_MODE = "CHAOS_MODE";
export const PLAY_STOP = "PLAY_STOP";
export const LIFE_CHANGE = "LIFE_CHANGE";
export const MIDI_SET = "MIDI_SET";

export function arrayModify(array) {
  return { type: ARRAY_MODIFY, array };
}

export function cellsMove(array, notes) {
  return { type: CELLS_MOVE, array, notes };
}

export function setGridSize(gridSize) {
  return { type: SET_GRID_SIZE, gridSize };
}

export function parametersChange(parameters) {
  return { type: PARAMETERS_CHANGE, parameters };
}

export function synthEdit(parameters) {
  return { type: SYNTH_EDIT, parameters };
}

export function chaosMode(isChaos) {
  return { type: CHAOS_MODE, isChaos };
}

export function playStop(isPlaying) {
  return { type: PLAY_STOP, isPlaying };
}

export function lifeChange(life) {
  return { type: LIFE_CHANGE, life };
}

export function midiSet(midi) {
  return { type: MIDI_SET, midi };
}
