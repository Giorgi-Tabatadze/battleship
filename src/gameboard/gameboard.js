/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import Ship from "../ship/ship";

const Gameboard = function () {
  // generates a (10x10) board where we can create and place ships
  const generateBoard = () => {
    const board = {};
    for (let i = 0; i < 100; i++) {
      const hasBeenAttacked = false;
      const shipThere = false;
      const sunkShipThere = false;
      board[i] = { hasBeenAttacked, shipThere, sunkShipThere };
    }
    return board;
  };

  const spaceIsAvailable = function (coordinates) {
    for (const coordinate of coordinates) {
      if (
        this.board[coordinate].shipThere ||
        this.board[coordinate].shipThere === 0
      ) {
        return false;
      }
    }
    return true;
  };

  const createShip = function (coordinates) {
    // build a ship
    const ship = Ship(coordinates);

    // put ship into tracking array
    this.ships.push(ship);

    // put ship onto the board and indicate which ship occupies the space
    coordinates.forEach((coordinate) => {
      this.board[coordinate].shipThere = this.ships.indexOf(ship);
    });
  };

  const spaceAttackedBefore = function (coordinate) {
    return this.board[coordinate].hasBeenAttacked;
  };

  const attack = function (coordinate) {
    this.board[coordinate].hasBeenAttacked = true;
    if (
      this.board[coordinate].shipThere ||
      this.board[coordinate].shipThere === 0
    ) {
      const shipId = this.board[coordinate].shipThere;
      this.ships[shipId].coordinates[coordinate] = true;
      // if ship was hit return ship id
      return shipId;
    }
    // esle return false
    return false;
  };

  const shipSunk = function (shipId) {
    this.ships[shipId].sunk = this.ships[shipId].isSunk();
    // mark sunk ship on the board.
    if (this.ships[shipId].sunk) {
      // eslint-disable-next-line guard-for-in
      for (const coordinate in this.ships[shipId].coordinates) {
        this.board[coordinate].sunkShipThere = true;
      }
    }
    // return that ship was sunk
    return this.ships[shipId].sunk;
  };

  const roundWon = function () {
    for (const ship of this.ships) {
      if (!ship.sunk) {
        return false;
      }
    }
    return true;
  };

  const board = generateBoard();
  const ships = [];

  return {
    board,
    ships,
    createShip,
    spaceIsAvailable,
    spaceAttackedBefore,
    attack,
    shipSunk,
    roundWon,
  };
};
export default Gameboard;
