import Gameboard from "../gameboard/gameboard";

const GeneratePlayer = function (name) {
  function placeNewBoard() {
    this.gameBoard = Gameboard();
  }

  const player = {};
  player.name = name;
  player.score = 0;
  player.placeNewBoard();

  return { player, placeNewBoard };
};

export default GeneratePlayer;
