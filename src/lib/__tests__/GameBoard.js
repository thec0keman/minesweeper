import { generateBoard, fetchChainedCells } from '../GameBoard';
import { generateNumbers } from '../GameCell';
import { getCoordinates, rowsIntoRows } from '../../test-helpers';

test('totalCells', () => {
  const subject = generateBoard(10, 15, 2);

  expect(subject.totalCells).toEqual(150);
});

test('totalMines is greater than zero', () => {
  const subject = generateBoard(30, 30, 5);

  expect(subject.totalMines > 0).toEqual(true);
});

test('density impacts total mines', () => {
  const board1 = generateBoard(30, 30, 5);
  const board2 = generateBoard(30, 30, 20);

  // This is susceptible to possible failures due to random nature, but hopefully with high enough density differences it will normally pass
  expect(board1.totalMines < board2.totalMines).toEqual(true);
});

test('fetchChainedCells all blanks', () => {
  const board = generateBoard(5, 10, 1);
  const rows = [
    '          ',
    '          ',
    '          ',
    '          ',
    '          ',
  ];

  board.rows = generateNumbers(rowsIntoRows(rows))

  const cell = board.rows[2][4];
  const chain = fetchChainedCells(board, [cell], [cell]);

  expect(chain.length).toEqual(50);
});

test('clicking near a mine', () => {
  const board = generateBoard(5, 10, 1);
  const rows = [
    '          ',
    ' .        ',
    '          ',
    '          ',
    '          ',
  ];

  board.rows = generateNumbers(rowsIntoRows(rows))

  const cell = board.rows[1][2];
  const chain = fetchChainedCells(board, [cell], [cell]);

  expect(chain.length).toEqual(1);
});

test('clicking on a mine', () => {
  const board = generateBoard(5, 10, 1);
  const rows = [
    '          ',
    ' .        ',
    '          ',
    '          ',
    '          ',
  ];

  board.rows = generateNumbers(rowsIntoRows(rows))

  const cell = board.rows[1][1];
  const chain = fetchChainedCells(board, [cell], [cell]);

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

  const board = generateBoard(5, 10, 1);
  const rows = [
    '  .   .  .',
    '  .   .  .',
    '  .   .  .',
    '  .   .  .',
    '  .   .  .',
  ];

  board.rows = generateNumbers(rowsIntoRows(rows))

  const cell = board.rows[0][4];
  const chain = fetchChainedCells(board, [cell], [cell]);

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

  const board = generateBoard(5, 10, 1);
  const rows = [
    '  . . .  .',
    '  .   .  .',
    '  .   .  .',
    '  .   .  .',
    '  . . .  .',
  ];

  board.rows = generateNumbers(rowsIntoRows(rows))

  const cell = board.rows[2][4];
  const chain = fetchChainedCells(board, [cell], [cell]);

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

  const board = generateBoard(5, 10, 1);
  const rows = [
    '    .    .',
    '  .    . .',
    ' .       .',
    '  .    . .',
    '    .    .',
  ];

  board.rows = generateNumbers(rowsIntoRows(rows))

  const cell = board.rows[2][4];
  const chain = fetchChainedCells(board, [cell], [cell]);

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

  const board = generateBoard(5, 10, 1);
  const rows = [
    '.   .   . ',
    '.         ',
    '.         ',
    '       .  ',
    '  .    .  ',
  ];

  board.rows = generateNumbers(rowsIntoRows(rows))

  const cell = board.rows[0][2];
  const chain = fetchChainedCells(board, [cell], [cell]);

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

  const board = generateBoard(5, 10, 1);
  const rows = [
    ' .       .',
    '          ',
    '.    .    ',
    '         .',
    ' .        ',
  ];

  board.rows = generateNumbers(rowsIntoRows(rows))

  const cell = board.rows[2][2];
  const chain = fetchChainedCells(board, [cell], [cell]);

  expect(chain.length).toEqual(37);
});
