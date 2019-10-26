import memoize from './memoize';

// @TODO Ensure first click is a zero
// @TODO Ensure that you cannot have any impossible cells
// @TODO Ensure that you cannot have any 50/50 cells

export default class GameBoard {
  rows = [];

  constructor(height, width, density) {
    this.height = height;
    this.width = width;
    this.density = density;
  }

  get totalCells() {
    return this.height * this.width;
  }

  @memoize
  get totalMines() {
    console.log('calculating total mines');

    return this.rows.reduce((count, row) => count + row.filter(cell => cell.isMine).length, 0)
  }

  // Do not follow a branching recursive strategy, since we want to make sure
  // we are only checking cells one time.
  startChainReaction(todoTop, currentVisible) {
    const cell = todoTop[0];
    const todo = todoTop.slice(1, todoTop.length);

    if (cell.number === 0) {
      // Grab all available items around this one
      const siblings = this.fetchSiblings(cell).
        filter(sibling => {
          return !sibling.isMine &&
            sibling.number >= 0 &&
            currentVisible.indexOf(sibling) === -1;
        })

      const newVisible = [
        ...currentVisible,
        ...siblings
      ];
      const moreTodo = [
        ...todo,
        ...siblings.filter(sibling => sibling.number === 0)
      ];

      return this._stopChainReaction(moreTodo, newVisible);
    }

    return this._stopChainReaction(todo, currentVisible);
  }

  _stopChainReaction(todo, visible) {
    if (todo.length > 0) {
      return this.startChainReaction(todo, visible);
    } else {
      return visible;
    }
  }

  // @TODO Immutable
  fetchSiblings(cell) {
    let results = [];

    for (let y2 = cell.y - 1; y2 <= cell.y + 1; y2++) {
      for (let x2 = cell.x - 1; x2 <= cell.x + 1; x2++) {
        if (!outOfBounds(y2, x2, this.height, this.width) && !(y2 === cell.y && x2 === cell.x)) {
          results.push(this.rows[y2][x2]);
        }
      }
    }

    return results;
  }
}

function outOfBounds(y, x, height, width) {
  return x < 0 ||
         y < 0 ||
         x > width - 1 ||
         y > height - 1;
}
