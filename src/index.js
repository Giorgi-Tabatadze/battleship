import GeneratePlayer from "./players/players";
import reDrawBoard from "./domstuff/drawBoard";
import pubsub from "./pubsub";
import "./style.css";

const gameController = (() => {
  const player = GeneratePlayer("Player");
  const computer = GeneratePlayer("Computer");
  let playersTurn = null;

  const startNewGame = () => {
    player.placeNewBoard();
    computer.placeNewBoard();

    playersTurn = true;
    // generate DOM functions
  };

  const placeShips = () => {
    console.log(player);

    player.gameBoard.createShip([0, 1]);
    player.gameBoard.createShip([30, 31]);

    computer.gameBoard.createShip([12, 13]);
    computer.gameBoard.createShip([50, 51]);
  };

  const playerShoots = (coordinate) => {
    player.gameBoard.generateAttack(coordinate);
    reDrawBoard(computer, player, playersTurn);
    playersTurn = false;
    computer.gameBoard.computerAttack();
    playersTurn = true;
    reDrawBoard(computer, player, playersTurn);
  };

  startNewGame();
  placeShips();
  reDrawBoard(computer, player, playersTurn);
  pubsub.subscribe("playerShot", playerShoots);

  return { startNewGame, placeShips, reDrawBoard };
})();
