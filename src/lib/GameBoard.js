import memoize from 'memoize-decorator'
import generateCells from '../lib/generate-cells';

export default class GameBoard {
  /**
   * @param [Integer] height
   * @param [Integer] width
   * @param [Integer] density
   */
  constructor(height, width, density) {
    this.height = height;
    this.width = width;
    this.density = density;
    this.rows = generateCells(this);
  }

  /**
   * @return [Integer]
   */
  @memoize
  get totalCells() {
    return this.height * this.width;
  }

  /**
   * @return [Integer]
   */
  @memoize
  get totalMines() {
    return this.mines.length;
  }

  @memoize
  get mines() {
    return this.rows.flat().filter((cell) => cell.isMine);
  }

  /**
   * Do not follow a branching recursive strategy, since we want to make sure
   * we are only checking cells one time.
   *
   * @param {<GameCell>} todoTop
   * @param {<GameCell>} currentVisible
   * @return {<GameCell>}
   */
  fetchChainedCells(todoTop, currentVisible) {
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

      return this._doneFetchChainedCells(moreTodo, newVisible);
    }

    return this._doneFetchChainedCells(todo, currentVisible);
  }

  _doneFetchChainedCells(todo, visible) {
    if (todo.length > 0) {
      return this.fetchChainedCells(todo, visible);
    } else {
      return visible;
    }
  }

  // @TODO Immutable
  /**
   * @param {GameCell} cell
   * @return {<GameCell>}
   */
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

/**
 *
 * @param {Integer} y
 * @param {Integer} x
 * @param {Integer} height
 * @param {Integer} width
 * @return {Boolean}
 */
function outOfBounds(y, x, height, width) {
  return x < 0 ||
    y < 0 ||
    x > width - 1 ||
    y > height - 1;
}
