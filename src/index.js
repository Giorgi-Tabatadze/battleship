import GeneratePlayer from "./players/players";
import reDrawBoard from "./domstuff/drawBoard";
import pubsub from "./pubsub";
import "normalize.css";
import "./style.css";
import takeName from "./domstuff/landing";

const gameController = (() => {
  let player = null;
  let computer = null;
  let playersTurn = null;

  const startNewGame = (playerName) => {
    player = GeneratePlayer(playerName);
    computer = GeneratePlayer("Computer");
    player.placeNewBoard();
    computer.placeNewBoard();

    playersTurn = true;

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

  const playerShoots = (coordinate) => {
    const AttackReport = player.gameBoard.generateAttack(coordinate);
    console.log(AttackReport);
    reDrawBoard(computer, player, playersTurn);
    playersTurn = false;

    if (AttackReport.shipHit === false) {
      pubsub.publish("shotMissed", player);
    }
    if (AttackReport.shipHit || AttackReport.shipHit === 0) {
      pubsub.publish("shipHit", player);
    }
    if (AttackReport.shipSunk) {
      pubsub.publish("shipSunk", player);
    }
    if (AttackReport.roundWon) {
      pubsub.publish("roundWon", player);
      return;
    }
    // eslint-disable-next-line no-use-before-define
    computerShoots();
  };
  const computerShoots = () => {
    const AttackReport = computer.gameBoard.computerAttack();
    playersTurn = true;
    reDrawBoard(computer, player, playersTurn);

    if (AttackReport.shipHit === false) {
      pubsub.publish("shotMissed", player);
    }
    if (AttackReport.shipHit || AttackReport.shipHit === 0) {
      pubsub.publish("shipHit", player);
    }
    if (AttackReport.shipSunk) {
      pubsub.publish("shipSunk", player);
    }
    if (AttackReport.roundWon) {
      pubsub.publish("roundWon", player);
    }
  };

  takeName();
  // startNewGame();
  // placeShips();

  pubsub.subscribe("namesTaken", startNewGame);
  pubsub.subscribe("playerShot", playerShoots);

  return { startNewGame, placeShips, reDrawBoard };
})();
