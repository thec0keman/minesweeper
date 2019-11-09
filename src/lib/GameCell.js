import memoize from 'memoize-decorator'

class GameCell {
  /**
   * @param {GameBoard} board
   * @param {Integer} id
   * @param {Boolean} isMine
   * @param {Integer} x
   * @param {Integer} y
   */
  constructor(board, id, isMine, x, y) {
    this.board = board;
    this.id = id;
    this.isMine = isMine;
    this.x = x;
    this.y = y;
  }

  /**
   * @return {Integer}
   */
  @memoize
  get number() {
    if (this.isMine) {
      return '!'
    } else {
      return this.board
        .fetchSiblings(this)
        .filter(sibling => sibling.isMine).length;
    }
  }
}

export default GameCell;
