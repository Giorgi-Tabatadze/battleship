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
      isAttacked: false,
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
    isAttacked: false,
    shipThere: true,
    sunkShipThere: false,
  });
  expect(gameBoard.board[42]).toStrictEqual({
    isAttacked: false,
    shipThere: true,
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
      isAttacked: false,
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
