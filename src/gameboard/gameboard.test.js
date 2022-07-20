/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
import Gameboard from "./gameboard";

it("generates board with correct values", () => {
  const gameBoard = Gameboard();
  const mockCallback = jest.fn((x) => x);
  Object.keys(gameBoard.board).forEach((coordinate) => {
    mockCallback(gameBoard.board[coordinate]);
  });
  for (let i = 0; i < Object.keys(gameBoard.board).length; i++) {
    expect(mockCallback.mock.results[i].value).toStrictEqual({
      hasBeenAttacked: false,
      shipThere: false,
      sunkShipThere: false,
    });
  }
});
it("generated board has correct lenght", () => {
  const gameBoard = Gameboard();
  expect(Object.keys(gameBoard.board).length).toBe(100);
});
it("ships are placed correctly oth the board", () => {
  const gameBoard = Gameboard();
  const coordinates = [41, 42];
  gameBoard.createShip(coordinates);
  expect(gameBoard.board[41]).toStrictEqual({
    hasBeenAttacked: false,
    shipThere: 0,
    sunkShipThere: false,
  });
  expect(gameBoard.board[42]).toStrictEqual({
    hasBeenAttacked: false,
    shipThere: 0,
    sunkShipThere: false,
  });
  const mockCallback = jest.fn((x) => x);
  Object.keys(gameBoard.board).forEach((coordinate) => {
    mockCallback(gameBoard.board[coordinate]);
  });
  for (let i = 0; i < Object.keys(gameBoard.board).length; i++) {
    if (coordinates.includes(i)) {
      continue;
    }
    expect(mockCallback.mock.results[i].value).toStrictEqual({
      hasBeenAttacked: false,
      shipThere: false,
      sunkShipThere: false,
    });
  }
});
it("if ships are appended to shipsdata correctly", () => {
  const gameBoard = Gameboard();
  const coordinates = [41, 42, 43];
  gameBoard.createShip([22, 33, 44]);
  gameBoard.createShip(coordinates);
  expect(gameBoard.ships.length).toBe(2);
  expect(gameBoard.ships[1].length).toBe(3);
  expect(gameBoard.ships[1].coordinates).toStrictEqual({
    41: false,
    42: false,
    43: false,
  });
  expect(gameBoard.ships[1].sunk).toBe(false);
});
it("check if space is available in occupied space", () => {
  const gameBoard = Gameboard();
  const coordinates = [41, 42, 43];
  gameBoard.createShip(coordinates);
  expect(gameBoard.spaceIsAvailable(coordinates)).toBe(false);
});

it("check if space is available in unoccupied space", () => {
  const gameBoard = Gameboard();
  const coordinates = [41, 42, 43];
  gameBoard.createShip(coordinates);
  expect(gameBoard.spaceIsAvailable([53, 56, 35])).toBe(true);
});
it("verify if coordinate has been shot at before", () => {
  const gameBoard = Gameboard();
  const coordinates = [41, 42, 43];
  gameBoard.createShip(coordinates);
  gameBoard.board[42].hasBeenAttacked = true;
  expect(gameBoard.spaceAttackedBefore(42)).toBe(true);
});
it("verify if coordinate has not been shot at before", () => {
  const gameBoard = Gameboard();
  const coordinates = [41, 42, 43];
  gameBoard.createShip(coordinates);
  gameBoard.board[42].hasBeenAttacked = true;
  expect(gameBoard.spaceAttackedBefore(62)).toBe(false);
});
it("shot registered on the board", () => {
  const gameBoard = Gameboard();
  gameBoard.attack(45);
  expect(gameBoard.board[45].hasBeenAttacked).toBe(true);
  Object.keys(gameBoard.board).forEach((coordinate) => {
    if (coordinate == 45) {
      return;
    }
    expect(gameBoard.board[coordinate].hasBeenAttacked).toBe(false);
  });
});
it("attack registered on the ship", () => {
  const gameBoard = Gameboard();
  const coordinates = [41, 42, 43];
  gameBoard.createShip(coordinates);
  gameBoard.attack(42);
  expect(gameBoard.ships[0].coordinates[41]).toBe(false);
  expect(gameBoard.ships[0].coordinates[42]).toBe(true);
  expect(gameBoard.ships[0].coordinates[43]).toBe(false);
});
it("check if ship was sunk successfuly", () => {
  const gameBoard = Gameboard();
  const coordinates = [41, 42, 43];
  gameBoard.createShip(coordinates);
  const attack40 = gameBoard.attack(40);
  if (attack40 || attack40 === 0) {
    expect(gameBoard.shipSunk(attack40)).toBe(false);
  }
  const attack41 = gameBoard.attack(41);
  if (attack41 || attack41 === 0) {
    expect(gameBoard.shipSunk(attack41)).toBe(false);
  }
  const attack42 = gameBoard.attack(42);
  if (attack42 || attack42 === 0) {
    expect(gameBoard.shipSunk(attack42)).toBe(false);
  }
  const attack43 = gameBoard.attack(43);
  if (attack43 || attack43 === 0) {
    expect(gameBoard.shipSunk(attack43)).toBe(true);
  }
});
it("ship marked sunk on the board", () => {
  const gameBoard = Gameboard();
  const coordinates = [41, 42, 43];
  gameBoard.createShip(coordinates);
  const attack40 = gameBoard.attack(40);
  if (attack40 || attack40 === 0) {
    if (gameBoard.shipSunk(attack40)) {
      expect(gameBoard.board[41].sunkShipThere).toBe(false);
      expect(gameBoard.board[42].sunkShipThere).toBe(false);
      expect(gameBoard.board[43].sunkShipThere).toBe(false);
    }
  }
  const attack41 = gameBoard.attack(41);
  if (attack41 || attack41 === 0) {
    if (gameBoard.shipSunk(attack41)) {
      expect(gameBoard.board[41].sunkShipThere).toBe(false);
      expect(gameBoard.board[42].sunkShipThere).toBe(false);
      expect(gameBoard.board[43].sunkShipThere).toBe(false);
    }
  }
  const attack42 = gameBoard.attack(42);
  if (attack42 || attack42 === 0) {
    if (gameBoard.shipSunk(attack42)) {
      expect(gameBoard.board[41].sunkShipThere).toBe(false);
      expect(gameBoard.board[42].sunkShipThere).toBe(false);
      expect(gameBoard.board[43].sunkShipThere).toBe(false);
    }
  }
  const attack43 = gameBoard.attack(43);
  if (attack43 || attack43 === 0) {
    if (gameBoard.shipSunk(attack43)) {
      expect(gameBoard.board[41].sunkShipThere).toBe(true);
      expect(gameBoard.board[42].sunkShipThere).toBe(true);
      expect(gameBoard.board[43].sunkShipThere).toBe(true);
    }
  }
});
it("check if game has been won", () => {
  const gameBoard = Gameboard();
  const coordinates = [41, 42, 43];
  gameBoard.createShip(coordinates);
  const attack40 = gameBoard.attack(40);
  if (attack40 || attack40 === 0) {
    if (gameBoard.shipSunk(attack40)) {
      expect(gameBoard.roundWon()).toBe(false);
    }
  }
  const attack41 = gameBoard.attack(41);
  if (attack41 || attack41 === 0) {
    if (gameBoard.shipSunk(attack41)) {
      expect(gameBoard.roundWon()).toBe(false);
    }
  }
  const attack42 = gameBoard.attack(42);
  if (attack42 || attack42 === 0) {
    if (gameBoard.shipSunk(attack42)) {
      expect(gameBoard.roundWon()).toBe(false);
    }
  }
  const attack43 = gameBoard.attack(43);
  if (attack43 || attack43 === 0) {
    if (gameBoard.shipSunk(attack43)) {
      expect(gameBoard.roundWon()).toBe(true);
    }
  }
});
