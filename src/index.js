import GeneratePlayer from "./players/players";
import reDrawBoard from "./domstuff/drawBoard";
import pubsub from "./pubsub";
import "normalize.css";
import "./style.css";
import takeName from "./domstuff/landing";
import messages from "./domstuff/message";
import delay from "./util/delay";

const gameController = (() => {
  let player = null;
  let computer = null;
  let playersTurn = null;

  const startNewGame = () => {
    player = GeneratePlayer("Ukraine");
    computer = GeneratePlayer("Russia");
    player.placeNewBoard();
    computer.placeNewBoard();

    playersTurn = true;

    messages();
    // eslint-disable-next-line no-use-before-define
    placeShips();
    reDrawBoard(computer, player, playersTurn);
    // generate DOM functions
  };

  const placeShips = () => {
    console.log(player);

    player.gameBoard.createShip([0, 1]);
    player.gameBoard.createShip([30, 31]);

    computer.gameBoard.createShip([12, 13]);
    computer.gameBoard.createShip([50, 51]);
  };

  const playerShoots = async (coordinate) => {
    const AttackReport = player.gameBoard.generateAttack(coordinate);
    console.log(AttackReport);
    playersTurn = false;
    reDrawBoard(computer, player, playersTurn);
    player.gameBoard.reportDamage(AttackReport, player);
    await delay(2000);
    const message = document.querySelector(".messages p");

    pubsub.publish("playerShotCompleted");
  };
  const computerShoots = async () => {
    const AttackReport = computer.gameBoard.computerAttack();
    reDrawBoard(computer, player, playersTurn);

    computer.gameBoard.reportDamage(AttackReport, computer);
    await delay(2000);
    playersTurn = true;
    reDrawBoard(computer, player, playersTurn);
  };
  const gameWon = function (player) {
    pubsub.unsubscribe("playerShot", playerShoots);
    pubsub.unsubscribe("playerShotCompleted", computerShoots);
    pubsub.publish("playAgain", player);
  };
  takeName();
  // startNewGame();
  // placeShips();

  pubsub.subscribe("gameStartRequest", startNewGame);
  pubsub.subscribe("playerShot", playerShoots);
  pubsub.subscribe("playerShotCompleted", computerShoots);
  pubsub.subscribe("roundWon", gameWon);

  return { startNewGame, placeShips, reDrawBoard };
})();
