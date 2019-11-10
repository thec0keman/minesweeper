export function getCoordinates(siblings) {
  return  siblings.map(sibling => [sibling.x, sibling.y]);
}

export function rowsIntoRows(rows) {
  return rows.map((row, y) => {
    return Array.from(row).map((value, x) => {
      return {
        x,
        y,
        isMine: value === '.'
      };
    });
  });
}

export function debugBoard(board, selected, { showNumber }) {
  const debug = board.rows.map(row => {
    return row.map(cell => {
      if (cell.isMine) {
        return '*';
      }
      if (selected.includes(cell) || showNumber) {
        return cell.number;
      }
      return ' ';
    }).join('');
  });

  console.log(debug);
}
