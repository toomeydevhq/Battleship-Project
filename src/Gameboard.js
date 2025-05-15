import Ship from './Ship';

export default class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.size = 10;
  }

  placeShip(ship, x, y, isHorizontal) {
    // Check if placement is valid
    if (x < 0 || y < 0 || 
        (isHorizontal && x + ship.length > this.size) || 
        (!isHorizontal && y + ship.length > this.size)) {
      throw new Error('Placement out of bounds');
    }

    // Check for overlapping ships
    for (let i = 0; i < ship.length; i++) {
      const checkX = isHorizontal ? x + i : x;
      const checkY = isHorizontal ? y : y + i;
      
      if (this.ships.some(placedShip => {
        for (let j = 0; j < placedShip.ship.length; j++) {
          const placedX = placedShip.isHorizontal ? placedShip.x + j : placedShip.x;
          const placedY = placedShip.isHorizontal ? placedShip.y : placedShip.y + j;
          return placedX === checkX && placedY === checkY;
        }
        return false;
      })) {
        throw new Error('Overlapping ships');
      }
    }

    this.ships.push({ ship, x, y, isHorizontal });
  }

  receiveAttack(x, y) {
    // Check if attack hits any ship
    for (const placedShip of this.ships) {
      const { ship, x: shipX, y: shipY, isHorizontal } = placedShip;
      
      if (isHorizontal) {
        if (y === shipY && x >= shipX && x < shipX + ship.length) {
          ship.hit();
          return true;
        }
      } else {
        if (x === shipX && y >= shipY && y < shipY + ship.length) {
          ship.hit();
          return true;
        }
      }
    }
    
    // Record missed attack
    this.missedAttacks.push([x, y]);
    return false;
  }

  allShipsSunk() {
    return this.ships.every(placedShip => placedShip.ship.isSunk());
  }
}
