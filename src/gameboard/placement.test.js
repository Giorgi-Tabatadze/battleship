import placement from "./placement";
import Gameboard from "./gameboard";
import GeneratePlayer from "../players/players";

it("fits horizontally", () => {
  const shipPlacement = placement();
  expect(shipPlacement.fitsFrame(2, 3, true)).toBe(true);
  expect(shipPlacement.fitsFrame(42, 3, true)).toBe(true);
  expect(shipPlacement.fitsFrame(42, 5, true)).toBe(true);
  expect(shipPlacement.fitsFrame(69, 1, true)).toBe(true);
});
it("does not fit horizontally", () => {
  const shipPlacement = placement();
  expect(shipPlacement.fitsFrame(8, 3, true)).toBe(false);
  expect(shipPlacement.fitsFrame(69, 2, true)).toBe(false);
});
it("fits vertically", () => {
  const shipPlacement = placement();

  expect(shipPlacement.fitsFrame(42, 4, false)).toBe(true);
  expect(shipPlacement.fitsFrame(4, 4, false)).toBe(true);
  expect(shipPlacement.fitsFrame(82, 2, false)).toBe(true);
});
it("does not fit vertically", () => {
  const shipPlacement = placement();
  expect(shipPlacement.fitsFrame(89, 3, false)).toBe(false);
  expect(shipPlacement.fitsFrame(82, 3, false)).toBe(false);
});

it("returns correct horizontal ship", () => {
  const shipPlacement = placement();
  expect(shipPlacement.getTheoreticalShip(2, 3, true)).toStrictEqual([2, 3, 4]);
});
it("returns correct vertical ship", () => {
  const shipPlacement = placement();
  expect(shipPlacement.getTheoreticalShip(2, 3, false)).toStrictEqual([
    2, 12, 22,
  ]);
});
it("ship fits", () => {
  const shipPlacement = placement();
  const player = GeneratePlayer("Ukraine");
  player.placeNewBoard();
  player.gameBoard.createShip([0, 1]);
  player.gameBoard.createShip([30, 31]);
  expect(
    shipPlacement.shipWillFit(14, 3, true, player.gameBoard)
  ).toStrictEqual([14, 15, 16]);
  expect(
    shipPlacement.shipWillFit(14, 3, false, player.gameBoard)
  ).toStrictEqual([14, 24, 34]);
});
it("ship does not fit", () => {
  const shipPlacement = placement();
  const player = GeneratePlayer("Ukraine");
  player.placeNewBoard();
  player.gameBoard.createShip([0, 1]);
  player.gameBoard.createShip([30, 31]);
  expect(shipPlacement.shipWillFit(28, 3, true, player.gameBoard)).toBe(false);
  expect(shipPlacement.shipWillFit(88, 3, false, player.gameBoard)).toBe(false);
  expect(shipPlacement.shipWillFit(31, 3, true, player.gameBoard)).toBe(false);
  expect(shipPlacement.shipWillFit(21, 3, false, player.gameBoard)).toBe(false);
});
