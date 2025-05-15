import Gameboard from './Gameboard';
import Player from './Player';
import Ship from './Ship';
import { renderGameboards, setupUI } from './dom';

export default function Game() {
  // Create players and boards
  const playerBoard = new Gameboard();
  const computerBoard = new Gameboard();
  
  const player = new Player('Player', computerBoard);
  const computer = new Player('Computer', playerBoard, true);

  // Place player ships (predefined for now)
  function placeDefaultShips(board) {
    const ships = [
      new Ship(5), // Carrier
      new Ship(4), // Battleship
      new Ship(3), // Destroyer
      new Ship(3), // Submarine
      new Ship(2)  // Patrol Boat
    ];

    try {
      board.placeShip(ships[0], 0, 0, true);
      board.placeShip(ships[1], 2, 1, false);
      board.placeShip(ships[2], 4, 3, true);
      board.placeShip(ships[3], 6, 5, false);
      board.placeShip(ships[4], 8, 7, true);
    } catch (e) {
      console.error('Error placing ships:', e.message);
    }
  }

  placeDefaultShips(playerBoard);
  placeDefaultShips(computerBoard);

  // Game state
  let currentPlayer = player;
  let gameOver = false;

  // Main game loop
  function playRound(x, y) {
    if (gameOver || currentPlayer.isComputer) return;

    try {
      const hit = currentPlayer.attack(x, y);
      renderGameboards(playerBoard, computerBoard);

      if (computerBoard.allShipsSunk()) {
        gameOver = true;
        alert('You win! All enemy ships have been sunk!');
        return;
      }

      // Computer's turn
      currentPlayer = computer;
      setTimeout(() => {
        computer.randomAttack();
        renderGameboards(playerBoard, computerBoard);

        if (playerBoard.allShipsSunk()) {
          gameOver = true;
          alert('You lose! All your ships have been sunk!');
          return;
        }

        currentPlayer = player;
      }, 500);
    } catch (e) {
      console.error(e.message);
    }
  }

  // Initialize UI
  setupUI(playRound, playerBoard, computerBoard);
  renderGameboards(playerBoard, computerBoard);
}

// Start the game
Game();
