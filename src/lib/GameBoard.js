import { fetchSiblings, generateCell, generateNumbers } from './GameCell';

/**
 * @param [Integer] height
 * @param [Integer] width
 * @param [Integer] density
 */
export function generateBoard(height, width, density, difficulty) {
  const rows = generateCells(height, width, density);
  const mines = rows.flat().filter((cell) => cell.isMine);

  return {
    height,
    width,
    density,
    difficulty,
    rows,
    mines,
    totalCells: height * width,
    totalMines: mines.length
  };
}

/**
 * Do not follow a branching recursive strategy, since we want to make sure
 * we are only checking cells one time.
 *
 * @param {<GameCell>} todoTop
 * @param {<GameCell>} currentVisible
 * @return {<GameCell>}
 */
export function fetchChainedCells(board, todoTop, currentVisible) {
  const [cell, ...todo] = todoTop;

  if (cell.number === 0) {
    // Grab all available items around this one
    const siblings = fetchSiblings(board, cell)
      .filter(sibling => {
        return !sibling.isMine &&
          sibling.number >= 0 &&
          currentVisible.indexOf(sibling) === -1;
      });

    const newVisible = [
      ...currentVisible,
      ...siblings
    ];
    const moreTodo = [
      ...todo,
      ...siblings.filter(sibling => sibling.number === 0)
    ];

    return _doneFetchChainedCells(board, moreTodo, newVisible);
  }

  return _doneFetchChainedCells(board, todo, currentVisible);
}

function _doneFetchChainedCells(board, todo, visible) {
  if (todo.length > 0) {
    return fetchChainedCells(board, todo, visible);
  } else {
    return visible;
  }
}

// @TODO Ensure that you cannot have any impossible cells
// @TODO Ensure that you cannot have any 50/50 cells
// @TODO Immutable
function generateCells(height, width, density) {
  const cells = [];
  const totalCells = width * height;

  for (let y = 0; y < height; y++) {
    const column = [];

    for (let x = 0; x < width; x++) {
      column.push(generateCell(totalCells, width, density, x, y));
    }

    cells.push(column);
  }

  return generateNumbers(cells);
}
