const values = ["7f", "64", "4b", "32"];

const velocityAssign = lifePoints => {
  let velocity = "";
  if (lifePoints < 3) {
    velocity = values[0];
  }
  if (lifePoints < 5) {
    velocity = values[1];
  }
  if (lifePoints < 7) {
    velocity = values[2];
  } else {
    velocity = values[3];
  }
  return velocity;
};

export default velocityAssign;
