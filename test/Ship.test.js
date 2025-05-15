import Ship from '../src/Ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('creates a ship with correct length', () => {
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });

  test('increases hits when hit() is called', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('isSunk() returns true when hits equal length', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('isSunk() returns false when hits are less than length', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});
