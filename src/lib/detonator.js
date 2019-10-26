// Too low and the browser will choke on harder difficulties
// Too high and detonation will take forever
const MINE_SPEED = 200;

export default class Detonator {
  constructor(mines) {
    this.mines = mines;
  }

  start(callback) {
    this.running = true;
    this.callback = callback;
    this._explode(this.mines);
  }

  _explode(mines) {
    const index = Math.floor(Math.random() * mines.length);
    const time = Math.random() * MINE_SPEED;
    const mine = mines[index];
    const remaining = arrWithout(mines, index);

    if (this.callback) {
      this.callback(mine);
    }

    if (remaining.length > 0 && this.running) {
      setTimeout(() => {
        this._explode(remaining);
      }, time)
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
