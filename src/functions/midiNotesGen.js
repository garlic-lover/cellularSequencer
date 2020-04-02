//Import of scales
import scales from "../assets/scales";

const midiNotesGen = (data, theScale, maxX, maxY, base, octavesRange) => {
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
  let zeroValue = 21 + scales.chromatic.indexOf(theNote);
  // Octave of the note
  y = Math.trunc((y / maxY) * octavesRange);
  if (y > maxY) {
    console.log("Problem", y, maxY);
  }
  let decimal = zeroValue + y * 12 + 12 * base;
  // convert to hex
  const hex = decimal.toString(16);

  return hex;
};

export default midiNotesGen;
