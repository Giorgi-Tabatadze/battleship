/* eslint-disable no-restricted-syntax */
import placement from "../gameboard/placement";
import pubsub from "../pubsub";
import removeAllChildNodes from "../util/removeAllChildNodes";

const drawShipPlacement = function (player) {
  const shipPlacement = placement();
  const playArea = document.getElementById("play-area");
  removeAllChildNodes(playArea);
  const shipPlacementBoard = document.createElement("div");
  shipPlacementBoard.classList.add("placement-container");
  playArea.appendChild(shipPlacementBoard);
  let shipLength = 4;
  let horizontal = true;

  const p = document.createElement("p");
  p.innerText = "PLACE YOUR SHIPS TO START THE GAME!";
  p.classList.add("message");
  p.style.marginBottom = "40px";

  const changeDirectionBtn = document.createElement("button");
  playArea.prepend(changeDirectionBtn);
  playArea.prepend(p);

  changeDirectionBtn.classList.add("direction");
  changeDirectionBtn.innerText = horizontal ? "HORIZONTAL" : "VERTICAL";
  changeDirectionBtn.addEventListener("click", () => {
    if (horizontal) {
      horizontal = false;
    } else horizontal = true;
    changeDirectionBtn.innerText = horizontal ? "HORIZONTAL" : "VERTICAL";
    drawBoard();
  });

  function drawBoard() {
    if (shipLength === 0) {
      pubsub.publish("shipsPlaced");
    }
    removeAllChildNodes(shipPlacementBoard);

    const placementBoard = document.createElement("div");
    shipPlacementBoard.appendChild(placementBoard);
    placementBoard.classList.add("board");
    placementBoard.classList.add("placement");
    const squares = Object.keys(player.gameBoard.board);
    squares.forEach((squareId) => {
      const square = player.gameBoard.board[squareId];
      const squareDiv = document.createElement("div");
      placementBoard.appendChild(squareDiv);
      squareDiv.classList.add("square");
      squareDiv.dataset.id = squareId;

      const theoreticalShip = shipPlacement.shipWillFit(
        squareId,
        shipLength,
        horizontal,
        player.gameBoard
      );
      if (
        square.hasBeenAttacked === false &&
        (square.shipThere || square.shipThere === 0)
      ) {
        squareDiv.classList.add("ship-visible");
      }
      if (theoreticalShip === false) {
        squareDiv.addEventListener("mouseover", () => {
          squareDiv.classList.add("no-fit");
        });
        squareDiv.addEventListener("mouseout", () => {
          squareDiv.classList.remove("no-fit");
        });
      }
      if (theoreticalShip || theoreticalShip === 0) {
        squareDiv.addEventListener("mouseover", () => {
          for (const coordinate of theoreticalShip) {
            const squareToColor = document.querySelector(
              `[data-id="${coordinate}"]`
            );
            squareToColor.classList.add("hovered");
          }
        });
        squareDiv.addEventListener("mouseout", () => {
          for (const coordinate of theoreticalShip) {
            const squareToColor = document.querySelector(
              `[data-id="${coordinate}"]`
            );
            squareToColor.classList.remove("hovered");
          }
        });
        squareDiv.addEventListener("click", () => {
          player.gameBoard.createShip(theoreticalShip);
          shipLength = shipPlacement.getSmallerShip(shipLength);
          drawBoard();
        });
      }
    });
  }
  drawBoard();
};

export default drawShipPlacement;
