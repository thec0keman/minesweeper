class GameCell {
  constructor(board, id, isMine, x, y) {
    this.board = board;
    this.id = id;
    this.isMine = isMine;
    this.x = x;
    this.y = y;
  }

  get number() {
    if (this._number) {
      return this._number;
    }

    if (!this.isMine) {
      this._number = this.board.
        fetchSiblings(this).
        filter(sibling => sibling.isMine).length;

      return this._number;
    } else {
      return null;
    }
  }
}

export default GameCell;
