import Player from '../src/Player';
import Gameboard from '../src/Gameboard';
import Ship from '../src/Ship';

describe('Player', () => {
  let player;
  let enemyBoard;
  let ship;

  beforeEach(() => {
    enemyBoard = new Gameboard();
    player = new Player('Player 1', enemyBoard);
    ship = new Ship(3);
    enemyBoard.placeShip(ship, 2, 3, true);
  });

  test('creates a player with name and enemy board', () => {
    expect(player.name).toBe('Player 1');
    expect(player.enemyBoard).toBe(enemyBoard);
  });

  test('can attack enemy board', () => {
    player.attack(2, 3);
    expect(ship.hits).toBe(1);
  });

  test('computer can make random attacks', () => {
    const computer = new Player('Computer', enemyBoard, true);
    computer.randomAttack();
    expect(enemyBoard.missedAttacks.length + ship.hits).toBe(1);
  });

  test('computer does not attack same spot twice', () => {
    const computer = new Player('Computer', enemyBoard, true);
    
    // Fill the board with attacks except one spot
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (x !== 5 || y !== 5) {
          enemyBoard.receiveAttack(x, y);
        }
      }
    }
    
    // Computer should attack the only remaining spot
    computer.randomAttack();
    expect(enemyBoard.missedAttacks).toContainEqual([5, 5]);
  });
});
