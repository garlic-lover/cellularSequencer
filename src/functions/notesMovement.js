import crazyNotesStyle from "./crazyNotesStyle";
import getIndexes from "./getIndexes";

const notesMovement = async (cells, scale, gridSize, base, octavesRange) => {
  let alreadyPlayed = [];
  let notesTab = [];
  for (let i = 0; i < cells.length; i++) {
    let indexes = await getIndexes(cells, { x: cells[i].x, y: cells[i].y });
    let isAlready = await getIndexes(alreadyPlayed, {
      x: cells[i].x,
      y: cells[i].y
    });
    if (
      alreadyPlayed.length < 5 &&
      indexes.tab.length > 1 &&
      isAlready.tab.length === 0
    ) {
      if (indexes.tab[0]) {
        let note = crazyNotesStyle(
          indexes.tab[0],
          scale,
          gridSize.y,
          gridSize.x,
          base,
          octavesRange
        );
        //play a middle 'C' for the duration of an 8th note
        if (note === false) {
          return;
        }
        alreadyPlayed.push(cells[i]);
        notesTab.push(note);
      } else {
        console.log("Strange", indexes.tab, i, indexes.tab[i]);
        console.log(indexes.tab);
      }
    }
  }
  return notesTab;
};

export default notesMovement;
