import GameBoard from '../lib/GameBoard';
import { difficulties } from '../lib/difficulties';
import clickCell from './click-cell';
import flagCell from './flag-cell';

const RESET_GAME_ACTIONS = [
  'SET_DIFFICULTY',
  'RESET_GAME'
];

function stateFilter(state, { type, ...action }) {
  const {
    selectedCells,
  } = state;

  if (RESET_GAME_ACTIONS.includes(type)) {
    const difficulty = action.difficulty || state.difficulty;
    const gameParams = difficulties[difficulty];

    if (!difficulty || !gameParams) {
      return state;
    }

    const board = difficulty ? new GameBoard(gameParams.height, gameParams.width, gameParams.density) : null;

    return {
      ...state,
      gameRunning: false,
      gameOver: false,
      gameWon: false,
      selectedCells: [],
      flaggedCells: [],
      exploded: [],
      clickedMine: null,
      difficulty,
      board
    };

  } else if (type === 'CHAIN_REACTION') {
    return {
      ...state,
      exploded: [
        ...state.exploded,
        action.cell
      ]
    };

  } else if (type === 'CLICK_CELL') {
    return clickCell(action.cell, state);

  } else if (type === 'CLICK_FLAG' && !selectedCells.includes(action.cell)) {
    return flagCell(action.cell, state);
  }

  return state;
}

export default (state = {}, action) => {
  const result = stateFilter(state, action);

  return result;
}
