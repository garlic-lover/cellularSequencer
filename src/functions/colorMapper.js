const colorMapper = lifePoints => {
  if (lifePoints < 3) {
    return "life4";
  }
  if (lifePoints < 5) {
    return "life3";
  }
  if (lifePoints < 7) {
    return "life2";
  }
  return "life1";
};

export default colorMapper;
