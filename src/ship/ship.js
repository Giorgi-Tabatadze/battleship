const Ship = (coordinatesArray) => {
  const setCoordinates = (coordinatesPassed) => {
    const coordinateObject = {};
    coordinatesPassed.forEach((coordinate) => {
      coordinateObject[coordinate] = false;
    });
    return coordinateObject;
  };

  function hit(coordinate) {
    this.coordinates[coordinate] = true;
  }
  function isSunk() {
    // eslint-disable-next-line no-restricted-syntax
    for (const isHit of Object.values(this.coordinates)) {
      if (!isHit) {
        return false;
      }
    }
    return true;
  }

  // eslint-disable-next-line prefer-destructuring
  const length = coordinatesArray.length;
  const coordinates = setCoordinates(coordinatesArray);
  const sunk = false;

  return { length, coordinates, sunk, hit, isSunk };
};
export default Ship;
