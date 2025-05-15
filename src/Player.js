export default class Player {
  constructor(name, enemyBoard, isComputer = false) {
    this.name = name;
    this.enemyBoard = enemyBoard;
    this.isComputer = isComputer;
    this.attacks = new Set();
  }

  attack(x, y) {
    if (this.attacks.has(`${x},${y}`)) {
      throw new Error('Already attacked this position');
    }
    this.attacks.add(`${x},${y}`);
    return this.enemyBoard.receiveAttack(x, y);
  }

  randomAttack() {
    if (this.attacks.size >= 100) {
      throw new Error('All positions have been attacked');
    }

    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.attacks.has(`${x},${y}`));

    return this.attack(x, y);
  }
}
