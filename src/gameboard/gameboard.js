/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import Ship from "../ship/ship";

const Gameboard = function () {
  const generateBoard = () => {
    const board = {};
    for (let i = 0; i < 100; i++) {
      const isAttacked = false;
      const shipThere = false;
      const sunkShipThere = false;
      board[i] = { isAttacked, shipThere, sunkShipThere };
    }
    return board;
  };

  const launchShip = function (gameBoard, coordinates) {
    coordinates.forEach((coordinate) => {
      gameBoard[coordinate].shipThere = true;
    });
  };

  const spaceIsAvailable = function (coordinates) {
    for (const coordinate of coordinates) {
      if (this.board[coordinate].shipThere) {
        return false;
      }
    }
    return true;
  };

  const createShip = function (coordinates) {
    launchShip(this.board, coordinates);
    const ship = Ship(coordinates);
    this.ships.push(ship);
  };

  const board = generateBoard();
  const ships = [];

  return { board, ships, createShip, spaceIsAvailable };
};
export default Gameboard;
