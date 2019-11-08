import GameBoard from '../GameBoard';
import { getCoordinates, rowsIntoRows } from '../../test-helpers';

test('totalCells', () => {
  const subject = new GameBoard(10, 15, 2);

  expect(subject.totalCells).toEqual(150);
});

test('totalMines is greater than zero', () => {
  const subject = new GameBoard(30, 30, 5);

  expect(subject.totalMines > 0).toEqual(true);
});

test('density impacts total mines', () => {
  const board1 = new GameBoard(30, 30, 5);
  const board2 = new GameBoard(30, 30, 20);

  // This is susceptible to possible failures due to random nature, but hopefully with high enough density differences it will normally pass
  expect(board1.totalMines < board2.totalMines).toEqual(true);
});

test('fetchSiblings with a middle cell', () => {
  const board = new GameBoard(10, 15, 2);
  const currentCell = board.rows[5][5];

  expect(currentCell.x).toEqual(5);
  expect(currentCell.y).toEqual(5);

  const siblings = board.fetchSiblings(currentCell);

  expect(siblings.length).toEqual(8);

  const coordinates = getCoordinates(siblings);

  expect(coordinates[0]).toEqual([4, 4]);
  expect(coordinates[1]).toEqual([5, 4]);
  expect(coordinates[2]).toEqual([6, 4]);
  expect(coordinates[3]).toEqual([4, 5]);
  expect(coordinates[4]).toEqual([6, 5]);
  expect(coordinates[5]).toEqual([4, 6]);
  expect(coordinates[6]).toEqual([5, 6]);
  expect(coordinates[7]).toEqual([6, 6]);
});

test('fetchSiblings with a top/left', () => {
  const board = new GameBoard(10, 15, 2);
  const currentCell = board.rows[0][0];

  expect(currentCell.x).toEqual(0);
  expect(currentCell.y).toEqual(0);

  const siblings = board.fetchSiblings(currentCell);

  expect(siblings.length).toEqual(3);

  const coordinates = getCoordinates(siblings);

  expect(coordinates[0]).toEqual([1, 0]);
  expect(coordinates[1]).toEqual([0, 1]);
  expect(coordinates[2]).toEqual([1, 1]);
});

test('fetchSiblings with a top/right', () => {
  const board = new GameBoard(10, 15, 2);
  const currentCell = board.rows[0][14];

  expect(currentCell.y).toEqual(0);
  expect(currentCell.x).toEqual(14);

  const siblings = board.fetchSiblings(currentCell);

  expect(siblings.length).toEqual(3);

  const coordinates = getCoordinates(siblings);

  expect(coordinates[0]).toEqual([13, 0]);
  expect(coordinates[1]).toEqual([13, 1]);
  expect(coordinates[2]).toEqual([14, 1]);
});

test('fetchSiblings with a bottom/left', () => {
  const board = new GameBoard(10, 15, 2);
  const currentCell = board.rows[9][0];

  expect(currentCell.y).toEqual(9);
  expect(currentCell.x).toEqual(0);

  const siblings = board.fetchSiblings(currentCell);

  expect(siblings.length).toEqual(3);

  const coordinates = getCoordinates(siblings);

  expect(coordinates[0]).toEqual([0, 8]);
  expect(coordinates[1]).toEqual([1, 8]);
  expect(coordinates[2]).toEqual([1, 9]);
});

test('fetchSiblings with a bottom/right', () => {
  const board = new GameBoard(10, 15, 2);
  const currentCell = board.rows[9][14];

  expect(currentCell.y).toEqual(9);
  expect(currentCell.x).toEqual(14);

  const siblings = board.fetchSiblings(currentCell);

  expect(siblings.length).toEqual(3);

  const coordinates = getCoordinates(siblings);

  expect(coordinates[0]).toEqual([13, 8]);
  expect(coordinates[1]).toEqual([14, 8]);
  expect(coordinates[2]).toEqual([13, 9]);
});

test('fetchChainedCells all blanks', () => {
  const board = new GameBoard(5, 10, 1);
  const rows = [
    '          ',
    '          ',
    '          ',
    '          ',
    '          ',
  ];

  board.rows = rowsIntoRows(board, rows);

  const cell = board.rows[2][4];
  const chain = board.fetchChainedCells([cell], [cell]);

  expect(chain.length).toEqual(50);
});

test('clicking near a mine', () => {
  const board = new GameBoard(5, 10, 1);
  const rows = [
    '          ',
    ' .        ',
    '          ',
    '          ',
    '          ',
  ];

  board.rows = rowsIntoRows(board, rows);

  const cell = board.rows[1][2];
  const chain = board.fetchChainedCells([cell], [cell]);

  expect(chain.length).toEqual(1);
});

test('clicking on a mine', () => {
  const board = new GameBoard(5, 10, 1);
  const rows = [
    '          ',
    ' .        ',
    '          ',
    '          ',
    '          ',
  ];

  board.rows = rowsIntoRows(board, rows);

  const cell = board.rows[1][1];
  const chain = board.fetchChainedCells([cell], [cell]);

  expect(chain.length).toEqual(1);
});

test('fetchChainedCells vertical cluster', () => {
  /**
    '  *202*  *'
    '  *303*  *'
    '  *303*  *'
    '  *303*  *'
    '  *202*  *'
  */

  const board = new GameBoard(5, 10, 1);
  const rows = [
    '  .   .  .',
    '  .   .  .',
    '  .   .  .',
    '  .   .  .',
    '  .   .  .',
  ];

  board.rows = rowsIntoRows(board, rows);

  const cell = board.rows[0][4];
  const chain = board.fetchChainedCells([cell], [cell]);

  expect(chain.length).toEqual(15);
});

test('fetchChainedCells small cluster', () => {
  /**
    '  * * *  *'
    '  *414*  *'
    '  *303*  *'
    '  *414*  *'
    '  * * *  *'
  */

  const board = new GameBoard(5, 10, 1);
  const rows = [
    '  . . .  .',
    '  .   .  .',
    '  .   .  .',
    '  .   .  .',
    '  . . .  .',
  ];

  board.rows = rowsIntoRows(board, rows);

  const cell = board.rows[2][4];
  const chain = board.fetchChainedCells([cell], [cell]);

  expect(chain.length).toEqual(9);
});

test('fetchChainedCells bigger cluster', () => {
  /**
    '    *    *'
    '  *2111* *'
    ' * 2002  *'
    '  *2111* *'
    '    *    *'
  */

  const board = new GameBoard(5, 10, 1);
  const rows = [
    '    .    .',
    '  .    . .',
    ' .       .',
    '  .    . .',
    '    .    .',
  ];

  board.rows = rowsIntoRows(board, rows);

  const cell = board.rows[2][4];
  const chain = board.fetchChainedCells([cell], [cell]);

  expect(chain.length).toEqual(12);
});

test('fetchChainedCells snaking and corners', () => {
  /**
    '*201*101* '
    '*3011101  '
    '*2000011  '
    ' 211002*  '
    '  *1002*  '
  */

  const board = new GameBoard(5, 10, 1);
  const rows = [
    '.   .   . ',
    '.         ',
    '.         ',
    '       .  ',
    '  .    .  ',
  ];

  board.rows = rowsIntoRows(board, rows);

  const cell = board.rows[0][2];
  const chain = board.fetchChainedCells([cell], [cell]);

  expect(chain.length).toEqual(30);
});

test('fetchChainedCells circle', () => {
  /**
    ' *1000001*'
    ' 21011101 '
    '*1001*101 '
    ' 21011101*'
    ' *1000001 '
  */

  const board = new GameBoard(5, 10, 1);
  const rows = [
    ' .       .',
    '          ',
    '.    .    ',
    '         .',
    ' .        ',
  ];

  board.rows = rowsIntoRows(board, rows);

  const cell = board.rows[2][2];
  const chain = board.fetchChainedCells([cell], [cell]);

  expect(chain.length).toEqual(37);
});
