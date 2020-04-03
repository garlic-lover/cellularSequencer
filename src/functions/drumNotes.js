//Import of scales
import scales from "../assets/scales";

const drumNotes = (data, maxX, maxY, base, octavesRange) => {
  let scale = scales.minor;
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
  if (y > maxY) {
    console.log("Problem", y, maxY);
  }
  y = y + base;

  let note = scale[x] + y.toString();
  return note;
};

export default drumNotes;
