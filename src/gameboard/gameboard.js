/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import Ship from "../ship/ship";

const Gameboard = function () {
  // generates a (10x10) board where we can create and place ships

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

  const spaceIsAvailable = function (coordinates) {
    for (const coordinate of coordinates) {
      if (this.board[coordinate].shipThere) {
        return false;
      }
    }
    return true;
  };

  const createShip = function (coordinates) {
    // build a ship
    const ship = Ship(coordinates);

    // put ship onto the board
    coordinates.forEach((coordinate) => {
      this.board[coordinate].shipThere = true;
    });
    // put ship into tracking array
    this.ships.push(ship);
  };

  const board = generateBoard();
  const ships = [];

  return { board, ships, createShip, spaceIsAvailable };
};
export default Gameboard;
