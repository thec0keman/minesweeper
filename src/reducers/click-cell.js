import { fetchChainedCells } from '../lib/GameBoard';

function clearCell(board, selectedCells, cell) {
  const newVisible = [
    ...selectedCells,
    cell
  ];

  return fetchChainedCells(board, [cell], newVisible);
}

export default function clickCell(cell, state) {
  const { board, selectedCells } = state;

  if (cell.isMine) {
    return {
      ...state,
      gameRunning: false,
      gameOver: true,
      gameWon: false,
      clickedMine: cell // Flag this cell as about to detonate.  The `Game` component will handle the animation
    };

  } else if (!selectedCells.includes(cell)) {
    const newCells = clearCell(board, selectedCells, cell);

    if (newCells.length + board.totalMines === board.totalCells) {
      return {
        ...state,
        selectedCells: newCells,
        gameRunning: false,
        gameOver: true,
        gameWon: true
      }

    } else {
      return {
        ...state,
        gameRunning: true,
        selectedCells: newCells
      };
    }
  }
}
