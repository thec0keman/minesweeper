export default function flagCell(cell, state) {
  const {
    flaggedCells
  } = state;

  if (flaggedCells.includes(cell)) {
    return {
      ...state,
      flaggedCells: flaggedCells.filter(aCell => aCell.id !== cell.id)
    }
  } else {
    return {
      ...state,
      flaggedCells: [
        ...flaggedCells,
        cell
      ]
    }
  }
}
