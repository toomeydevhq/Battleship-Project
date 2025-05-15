import Gameboard from '../src/Gameboard';
import Ship from '../src/Ship';

describe('Gameboard', () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(3);
  });

  test('places ship at specific coordinates', () => {
    gameboard.placeShip(ship, 2, 3, true);
    expect(gameboard.ships.length).toBe(1);
    expect(gameboard.ships[0].ship).toBe(ship);
  });

  test('records missed attacks', () => {
    gameboard.receiveAttack(5, 5);
    expect(gameboard.missedAttacks).toContainEqual([5, 5]);
  });

  test('sends hit to correct ship', () => {
    gameboard.placeShip(ship, 2, 3, true);
    gameboard.receiveAttack(2, 3);
    expect(ship.hits).toBe(1);
  });

  test('reports all ships sunk', () => {
    gameboard.placeShip(ship, 2, 3, true);
    gameboard.receiveAttack(2, 3);
    gameboard.receiveAttack(3, 3);
    gameboard.receiveAttack(4, 3);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test('prevents overlapping ship placement', () => {
    gameboard.placeShip(ship, 2, 3, true);
    const ship2 = new Ship(2);
    expect(() => gameboard.placeShip(ship2, 2, 3, false)).toThrow('Overlapping ships');
  });
});
