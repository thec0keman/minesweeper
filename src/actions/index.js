export function clickCell(cell) {
  return {
    type: 'CLICK_CELL',
    cell
  };
}

export function flagCell(cell) {
  return {
    type: 'CLICK_FLAG',
    cell
  };
}

export function resetGame() {
  return {
    type: 'RESET_GAME'
  }
}

export function setDifficulty(difficulty) {
  return {
    type: 'SET_DIFFICULTY',
    difficulty
  };
}

export function chainReaction(cell) {
  return {
    type: 'CHAIN_REACTION',
    cell
  };
}
