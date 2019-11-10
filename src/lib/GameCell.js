/**
 * @param {GameCell} cell
 * @return {<GameCell>}
 */
export function fetchSiblings({ height: h, width: w, rows }, cell) {
  const { x, y } = cell;

  const top =    y - 1 < 0     ? 0     : y - 1;
  const bottom = y + 1 > h - 1 ? h - 1 : y + 1;
  const left =   x - 1 < 0     ? 0     : x - 1;
  const right =  x + 1 > w - 1 ? w - 1 : x + 1;

  const genCells = (y2, x2, row) => {
    if (x2 > right) {
      return row;
    } else if (x2 === x && y2 === y) {
      return genCells(y2, x2 + 1, row);
    } else {
      return genCells(y2, x2 + 1, [
        ...row,
        rows[y2][x2]
      ]);
    }
  }

  const genRows = (y2, rows) => {
    if (y2 > bottom) {
      return rows;
    } else {
      return genRows(y2 + 1, [
        ...rows,
        genCells(y2, left, [])
      ]);
    }
  }

  return genRows(top, []).flat();

  // @TODO Benchmark
  // const results = []
  // for (let y2 = top; y2 <= bottom; y2++) {
  //   for (let x2 = left; x2 <= right; x2++) {
  //     if (y2 !== y || x2 !== x) {
  //       results.push(rows[y2][x2]);
  //     }
  //   }
  // }

  // return results;
}

export function generateNumbers(rows) {
  const height = rows.length;
  const width = rows[0].length;

  const generateNumber = (cell) => {
    if (cell.isMine) {
      return '!'
    } else {
      const siblings = fetchSiblings({
        height,
        width,
        rows
      }, cell);

      return siblings.filter(sibling => sibling.isMine).length;
    }
  }

  return rows.map(row => row.map(cell => ({
    ...cell,
    number: generateNumber(cell)
  })));
}

export function generateCell(totalCells, width, density, x, y, isMine = generateMine(totalCells, density)) {
  const id = (y * width) + x;

  return {
    id,
    isMine,
    x,
    y
  }
}

function generateMine(cells, density) {
  const count = cells / density;
  const random = Math.floor(Math.random() * count)

  return random === 1;
}
