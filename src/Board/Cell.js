class Cell {
  constructor(x, y, dir, lifePoints) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
    this.direction = dir ? dir : { x: 1, y: 1 };
    this.lifePoints = lifePoints ? lifePoints : 10;
  }
}

export default Cell;
