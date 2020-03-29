//Import of scales
import scales from "../assets/scales";

const crazyNotesStyle = (data, theScale, maxX, maxY, base, octavesRange) => {
  let scale = scales[theScale];
  let x = data.x;
  let y = data.y;
  // Position of the note in the scale
  let notesAmount = 7;
  x = Math.trunc((x / maxX) * notesAmount);
  let theNote = scale[x];
  if (!theNote) {
    return false;
  }
  // Octave of the note
  y = Math.trunc((y / maxY) * octavesRange);
  y = y + base;

  let note = scale[x] + y.toString();
  return note;
};

export default crazyNotesStyle;
