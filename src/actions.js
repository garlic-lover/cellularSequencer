export const ARRAY_MODIFY = "ARRAY_MODIFY";
export const CELLS_MOVE = "CELLS_MOVE";
export const SET_GRID_SIZE = "SET_GRID_SIZE";
export const PARAMETERS_CHANGE = "PARAMETERS_CHANGE";
export const SYNTH_EDIT = "SYNTH_EDIT";

export function arrayModify(array) {
  return { type: ARRAY_MODIFY, array };
}

export function cellsMove(array) {
  return { type: CELLS_MOVE, array };
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
