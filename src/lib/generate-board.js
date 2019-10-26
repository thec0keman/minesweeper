import GameBoard from './GameBoard';
import GameCell from './GameCell';

export default function(height, width, density) {
  const board = new GameBoard(height, width, density);

  generateMines(board);

  return board;
}

// @TODO Immutable
function generateMines(board) {
  for (let y = 0; y < board.height; y++) {
    const column = [];

    for (let x = 0; x < board.width; x++) {
      column.push(generateCell(board, x, y));
    }

    board.rows.push(column);
  }
}

function generateCell(board, x, y) {
  const isMine = generateMine(board.totalCells, board.density);
  const id = (y * board.width) + x;
  const cell = new GameCell(
    board,
    id,
    isMine,
    x,
    y
  )

  return cell;
}

function generateMine(cells, density) {
  const count = cells / density;
  const random = Math.floor(Math.random() * count)

  return random === 1;
}
