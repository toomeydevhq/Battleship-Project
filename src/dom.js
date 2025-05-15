export function renderGameboards(playerBoard, computerBoard) {
  renderBoard('player-board', playerBoard, false);
  renderBoard('computer-board', computerBoard, true);
}

function renderBoard(boardId, board, isClickable) {
  const boardElement = document.getElementById(boardId);
  boardElement.innerHTML = '';

  for (let y = 0; y < board.size; y++) {
    for (let x = 0; x < board.size; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.x = x;
      cell.dataset.y = y;

      // Check if cell has a ship
      const hasShip = board.ships.some(placedShip => {
        const { x: shipX, y: shipY, isHorizontal, ship } = placedShip;
        if (isHorizontal) {
          return y === shipY && x >= shipX && x < shipX + ship.length;
        } else {
          return x === shipX && y >= shipY && y < shipY + ship.length;
        }
      });

      // Check if cell was attacked
      const wasAttacked = board.missedAttacks.some(pos => pos[0] === x && pos[1] === y) || 
        board.ships.some(placedShip => {
          const { x: shipX, y: shipY, isHorizontal, ship } = placedShip;
          if (isHorizontal) {
            return y === shipY && x >= shipX && x < shipX + ship.length && ship.hits > x - shipX;
          } else {
            return x === shipX && y >= shipY && y < shipY + ship.length && ship.hits > y - shipY;
          }
        });

      if (wasAttacked) {
        if (hasShip) {
          cell.classList.add('hit');
        } else {
          cell.classList.add('miss');
        }
      } else if (hasShip && !isClickable) {
        cell.classList.add('ship');
      }

      boardElement.appendChild(cell);
    }
  }
}

export function setupUI(playRound, playerBoard, computerBoard) {
  const computerBoardElement = document.getElementById('computer-board');
  computerBoardElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      const x = parseInt(e.target.dataset.x);
      const y = parseInt(e.target.dataset.y);
      playRound(x, y);
    }
  });
}
