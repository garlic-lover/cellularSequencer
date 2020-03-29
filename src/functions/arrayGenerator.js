// Function to generate array to display the grid according to width and height

const arrayGenerator = (width, height) => {
  let array = [];
  for (let i = 0; i < width; i++) {
    let arrayBis = [];
    for (let j = 0; j < height; j++) {
      arrayBis.push(i + "-" + j);
    }
    array.push(arrayBis);
  }
  return array;
};

export default arrayGenerator;
