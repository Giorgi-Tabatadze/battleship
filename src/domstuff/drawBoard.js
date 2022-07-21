import pubsub from "../pubsub";
import removeAllChildNodes from "../util/removeAllChildNodes";

const reDrawBoard = (computer, player, playersTurn) => {
  const playArea = document.getElementById("play-area");
  removeAllChildNodes(playArea);

  const computers = () => {
    const computerBoard = document.createElement("div");
    playArea.appendChild(computerBoard);
    computerBoard.classList.add("board");
    computerBoard.classList.add("computer");

    const squares = Object.keys(computer.gameBoard.board);
    squares.forEach((squareId) => {
      const square = computer.gameBoard.board[squareId];

      const squareDiv = document.createElement("div");
      computerBoard.appendChild(squareDiv);
      squareDiv.classList.add("square");
      squareDiv.addEventListener("mouseover", () => {
        squareDiv.classList.add("hovered");
      });
      squareDiv.addEventListener("mouseout", () => {
        squareDiv.classList.remove("hovered");
      });
      if (
        square.hasBeenAttacked === false &&
        (square.shipThere || square.shipThere === 0)
      ) {
        squareDiv.classList.add("ship-visible");
      }
      if (square.hasBeenAttacked === true && square.shipThere === false) {
        squareDiv.classList.add("miss-hit");
      }
      if (
        square.hasBeenAttacked === true &&
        (square.shipThere || square.shipThere === 0)
      ) {
        squareDiv.classList.add("ship-hit");
      }
      if (square.sunkShipThere) {
        squareDiv.classList.add("ship-sunk");
      }
    });
  };

  const players = () => {
    const playerBoard = document.createElement("div");
    playArea.appendChild(playerBoard);
    playerBoard.classList.add("board");
    playerBoard.classList.add("player");

    const squares = Object.keys(computer.gameBoard.board);
    squares.forEach((squareId) => {
      const square = player.gameBoard.board[squareId];

      const squareDiv = document.createElement("div");
      playerBoard.appendChild(squareDiv);
      squareDiv.classList.add("square");
      squareDiv.addEventListener("mouseover", () => {
        squareDiv.classList.add("hovered");
      });
      squareDiv.addEventListener("mouseout", () => {
        squareDiv.classList.remove("hovered");
      });
      if (
        square.hasBeenAttacked === false &&
        (square.shipThere || square.shipThere === 0)
      ) {
        squareDiv.classList.add("ship-visible");
      }
      if (square.hasBeenAttacked === true && square.shipThere === false) {
        squareDiv.classList.add("miss-hit");
      }
      if (
        square.hasBeenAttacked === true &&
        (square.shipThere || square.shipThere === 0)
      ) {
        squareDiv.classList.add("ship-hit");
      }
      if (square.sunkShipThere) {
        squareDiv.classList.add("ship-sunk");
      }
      if (square.hasBeenAttacked === false && playersTurn) {
        squareDiv.addEventListener("click", () => {
          pubsub.publish("playerShot", squareId);
        });
      }
    });
  };

  computers();
  players();
};

export default reDrawBoard;
