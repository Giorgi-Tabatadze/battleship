import Gameboard from "../gameboard/gameboard";

const GeneratePlayer = function (playerName) {
  const name = playerName;
  const score = 0;
  const placeNewBoard = function () {
    this.gameBoard = Gameboard();
  };

  return { name, score, placeNewBoard };
};

export default GeneratePlayer;
