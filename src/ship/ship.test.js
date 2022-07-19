/* eslint-disable no-undef */
import Ship from "./ship";

it("return correct length", () => {
  const coordinates = [41, 42];
  const ship = Ship(coordinates);
  expect(ship.length).toBe(2);
});
it("sets correct coordinates", () => {
  const coordinates = [34, 35];
  const ship = Ship(coordinates);
  expect(ship.coordinates).toStrictEqual({ 34: false, 35: false });
});
it("takes a hit", () => {
  const coordinates = [41, 42];
  const ship = Ship(coordinates);
  const hitCoordinate = 42;
  ship.hit(hitCoordinate);
  expect(ship.coordinates).toStrictEqual({ 41: false, 42: true });
});
it("determines if sunk correctly", () => {
  const coordinates = [41, 42, 43];
  const ship = Ship(coordinates);
  ship.hit(41);
  ship.hit(42);
  ship.hit(43);
  expect(ship.isSunk()).toBe(true);
});
it("determines if not sunk correctly", () => {
  const coordinates = [41, 42, 43];
  const ship = Ship(coordinates);
  ship.hit(41);
  ship.hit(43);
  expect(ship.isSunk()).toBe(false);
});
