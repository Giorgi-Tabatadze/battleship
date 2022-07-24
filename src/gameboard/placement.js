/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
const placement = () => {
  const getLastDigit = (number) => {
    const num2 = number;
    const lastDigit2Str = String(num2).slice(-1);
    const lastDigit2Num = Number(lastDigit2Str);
    return lastDigit2Num;
  };
  const getFirstDigit = (number) => {
    const num2 = number;
    const firstDigitStr = String(num2)[0];
    const lastDigit2Num = Number(firstDigitStr);
    return lastDigit2Num;
  };
  // eslint-disable-next-line func-names
  const fitsFrame = function (coordinate, shipLength, horizontal) {
    if (horizontal) {
      if (coordinate < 10) {
        if (coordinate + shipLength - 1 > 9) {
          return false;
        }
        return true;
      }
      if (coordinate >= 10) {
        const lastDigit = getLastDigit(coordinate);
        if (lastDigit + shipLength - 1 > 9) {
          return false;
        }
        return true;
      }
    }
    if (!horizontal) {
      if (String(coordinate).length === 1) {
        return true;
      }
      const firstDigit = getFirstDigit(coordinate);
      if (firstDigit + shipLength - 1 > 9) {
        return false;
      }
      return true;
    }
  };

  // return theoretical ship coordinates. its going to be theoretical because it is not determined if fits yet
  const getTheoreticalShip = function (coordinate, shipLength, horizontal) {
    const coordinates = [];
    if (horizontal) {
      for (let i = 0; i < shipLength; i++) {
        coordinates.push(coordinate + i);
      }
      return coordinates;
    }
    if (!horizontal) {
      for (let i = 0; i < shipLength; i++) {
        coordinates.push(coordinate + 10 * i);
      }
      return coordinates;
    }
  };

  // check if ship will fit in the suggested coordinate, if it does not return false, else return theoretical coordinates

  const shipWillFit = function (coordinate, shipLength, horizontal, gameBoard) {
    coordinate = Number(coordinate);
    if (fitsFrame(coordinate, shipLength, horizontal) === false) {
      return false;
    }
    const theoreticalShip = getTheoreticalShip(
      coordinate,
      shipLength,
      horizontal
    );

    if (gameBoard.spaceIsAvailable(theoreticalShip) === false) {
      return false;
    }
    return theoreticalShip;
  };

  return { fitsFrame, getTheoreticalShip, shipWillFit };
};

export default placement;
