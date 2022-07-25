import pubsub from "../pubsub";
import removeAllChildNodes from "../util/removeAllChildNodes";
import ukraineFlag from "./img/ukraineNavy.png";
import russiaFlag from "./img/russiaNavy.png";

const reDrawBoard = (computer, player, playersTurn) => {
  const playArea = document.getElementById("play-area");
  removeAllChildNodes(playArea);
  const boardsCointainer = document.createElement("div");
  boardsCointainer.classList.add("boards-container");
  playArea.appendChild(boardsCointainer);

  const computers = () => {
    const container = document.createElement("div");
    boardsCointainer.appendChild(container);
    container.classList.add("board-container");

    const computerBoard = document.createElement("div");
    container.appendChild(computerBoard);
    computerBoard.classList.add("board");
    computerBoard.classList.add("computer");

    const playerInformation = document.createElement("p");
    container.appendChild(playerInformation);
    playerInformation.innerText = "Ukrainian Friendly Waters";

    const playerFlag = new Image();
    playerFlag.classList.add("seal");
    playerFlag.src = ukraineFlag;
    boardsCointainer.prepend(playerFlag);

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
        const span = document.createElement("span");
        squareDiv.appendChild(span);
        span.innerText = "•";
      }
      if (
        square.hasBeenAttacked === true &&
        (square.shipThere || square.shipThere === 0)
      ) {
        squareDiv.classList.add("ship-hit");
        const span = document.createElement("span");
        squareDiv.appendChild(span);
        span.innerText = "X";
      }
      if (square.sunkShipThere) {
        squareDiv.classList.add("ship-sunk");
      }
    });
  };

  const players = () => {
    const container = document.createElement("div");
    boardsCointainer.appendChild(container);
    container.classList.add("board-container");

    const playerBoard = document.createElement("div");
    container.appendChild(playerBoard);
    playerBoard.classList.add("board");
    playerBoard.classList.add("player");

    const playerInformation = document.createElement("p");
    container.appendChild(playerInformation);
    playerInformation.innerText = "Russian Friendly Waters";

    const playerFlag = new Image();
    playerFlag.classList.add("seal");
    playerFlag.src = russiaFlag;
    boardsCointainer.appendChild(playerFlag);

    // generate board
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
        const span = document.createElement("span");
        squareDiv.appendChild(span);
        span.innerText = "•";
      }
      if (
        square.hasBeenAttacked === true &&
        (square.shipThere || square.shipThere === 0)
      ) {
        squareDiv.classList.add("ship-hit");
        const span = document.createElement("span");
        squareDiv.appendChild(span);
        span.innerText = "X";
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
