// This function get indexes of the matching cells and check if they're old enough
// to have a baby

const getIndexes = (tab, coordonates) => {
  const indexes = [];
  let isYoung = false;
  for (let i = 0; i < tab.length; i++) {
    if (tab[i].x === coordonates.x && tab[i].y === coordonates.y) {
      indexes.push(tab[i]);
      if (tab[i].lifePoints > 7) {
        isYoung = true;
      }
    }
  }
  return { tab: indexes, isYoung: isYoung };
};

export default getIndexes;
