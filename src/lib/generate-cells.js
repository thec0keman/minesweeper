import GameCell from './GameCell';

// @TODO Ensure that you cannot have any impossible cells
// @TODO Ensure that you cannot have any 50/50 cells
// @TODO Immutable
export default function generateCells(board) {
  const mines = [];

  for (let y = 0; y < board.height; y++) {
    const column = [];

    for (let x = 0; x < board.width; x++) {
      column.push(generateCell(board, x, y));
    }

    mines.push(column);
  }

  return mines;
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
