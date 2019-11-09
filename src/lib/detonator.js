// Too low and the browser will choke on harder difficulties
// Too high and detonation will take forever
const MINE_SPEED = 200;

export default class Detonator {
  constructor(mines) {
    this.mines = mines;
  }

  start(mine, callback) {
    this.running = true;
    this.callback = callback;
    this._trigger(this.mines, this.mines.indexOf(mine));
  }

  _trigger(mines, index) {
    const mine = mines[index];
    const remaining = arrWithout(mines, index);

    if (this.callback) {
      this.callback(mine);
    }

    if (remaining.length > 0 && this.running) {
      const nextMineTime = Math.random() * MINE_SPEED;

      setTimeout(() => {
        this._trigger(remaining, Math.floor(Math.random() * remaining.length));
      }, nextMineTime)
    }
  }

  stop() {
    this.running = false;
    this.callback = null;
  }
}

function arrWithout(array, index) {
  let left = [];
  let right = [];

  if (index !== 0) {
    left = array.slice(0, index);
  }
  if (index !== array.length - 1) {
    right = array.slice(index + 1, array.length);
  }

  return [
    ...left,
    ...right
  ];
}
