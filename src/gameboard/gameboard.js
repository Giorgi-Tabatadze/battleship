/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import Ship from "../ship/ship";
import pubsub from "../pubsub";
import placement from "./placement";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getLastDigit = (number) => {
  const num2 = number;
  const lastDigit2Str = String(num2).slice(-1);
  const lastDigit2Num = Number(lastDigit2Str);
  return lastDigit2Num;
};
const getFirstDigit = (number) => {
  const num2 = number;
  const firstDigitStr = String(num2)[0];
  const lastDigit2Num = Number(firstDigitStr);
  return lastDigit2Num;
};

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
      const lastDigit = getLastDigit(coordinate);
      if (
        this.board[coordinate].shipThere ||
        this.board[coordinate].shipThere === 0
      ) {
        return false;
      }
      if (this.board[coordinate - 10] !== undefined) {
        if (
          this.board[coordinate - 10].shipThere ||
          this.board[coordinate - 10].shipThere === 0
        ) {
          return false;
        }
      }
      if (this.board[coordinate + 10] !== undefined) {
        if (
          this.board[coordinate + 10].shipThere ||
          this.board[coordinate + 10].shipThere === 0
        ) {
          return false;
        }
      }
      if (this.board[coordinate + 1] !== undefined && lastDigit !== 9) {
        if (
          this.board[coordinate + 1].shipThere ||
          this.board[coordinate + 1].shipThere === 0
        ) {
          return false;
        }
      }
      if (this.board[coordinate - 1] !== undefined && lastDigit !== 0) {
        if (
          this.board[coordinate - 1].shipThere ||
          this.board[coordinate - 1].shipThere === 0
        ) {
          return false;
        }
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
      const coordinates = Object.keys(this.ships[shipId].coordinates);
      coordinates.forEach((coordinate) => {
        coordinate = Number(coordinate);
        const lastDigit = getLastDigit(coordinate);
        if (this.board[coordinate - 1] !== undefined && lastDigit !== 0) {
          this.attack(coordinate - 1);
        }
        if (this.board[coordinate + 1] !== undefined && lastDigit !== 9) {
          this.attack(coordinate + 1);
        }
        if (this.board[coordinate - 10] !== undefined) {
          this.attack(coordinate - 10);
        }
        if (this.board[coordinate + 10] !== undefined) {
          this.attack(coordinate + 10);
        }
      });
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

  const generateAttack = function (coordinate) {
    const attackReport = { shipHit: false, shipSunk: false, roundWon: false };
    const attack = this.attack(coordinate);
    if (attack === false) {
      return attackReport;
    }
    attackReport.shipHit = attack;
    attackReport.shipSunk = this.shipSunk(attack);
    if (attackReport.shipSunk) {
      attackReport.roundWon = this.roundWon();
    }
    return attackReport;
  };

  const reportDamage = function (AttackReport, player) {
    if (AttackReport.shipHit === false) {
      pubsub.publish("shotMissed", player);
    }
    if (AttackReport.shipHit || AttackReport.shipHit === 0) {
      pubsub.publish("shipHit", player);
    }
    if (AttackReport.shipSunk) {
      const shipSunkReport = { player };
      shipSunkReport.shipId = AttackReport.shipHit;
      console.log(shipSunkReport);
      pubsub.publish("shipSunk", shipSunkReport);
    }
    if (AttackReport.roundWon) {
      pubsub.publish("roundWon", player);
    }
  };
  const randomShipPlacement = function (longestShip) {
    console.log(this);

    const shipPlacement = placement();
    for (let i = longestShip; i > 0; i = shipPlacement.getSmallerShip(i)) {
      const randomCoordinate = getRandomInt(0, 99);
      // eslint-disable-next-line no-unneeded-ternary
      const randomHorizontal = getRandomInt(0, 1) ? true : false;
      const theoreticalShip = shipPlacement.shipWillFit(
        randomCoordinate,
        i,
        randomHorizontal,
        this
      );
      if (theoreticalShip || theoreticalShip === 0) {
        this.createShip(theoreticalShip);
      } else i++;
    }
  };

  const computerAttack = function () {
    // get random coordinate to attack, if it has been attacked before generate again
    let coordinate = getRandomInt(0, 99);

    while (this.board[coordinate].hasBeenAttacked) {
      coordinate = getRandomInt(0, 99);
    }

    const attackReport = this.generateAttack(coordinate);

    return attackReport;
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
    generateAttack,
    computerAttack,
    reportDamage,
    randomShipPlacement,
  };
};
export default Gameboard;
