import {
  generateCell,
  generateNumbers,
  fetchSiblings
} from '../GameCell';
import { generateBoard } from '../GameBoard';
import { getCoordinates, rowsIntoRows } from '../../test-helpers';

test('instantiation', () => {
  const subject = generateCell(500, 50, 2, 10, 50);

  expect(subject).toBeTruthy();
  expect(subject.id).toEqual(2510);
  expect([true, false].includes(subject.isMine)).toEqual(true);
  expect(subject.x).toEqual(10);
  expect(subject.y).toEqual(50);
});

test('generateNumber', () => {
  const rowPattern = [
    ' . .      ',
    '  . .. ...',
    ' . . . . .',
    '  . ......',
    '   ..     ',
  ];
  const rows = rowsIntoRows(rowPattern);
  const rowsWithNumbers = generateNumbers(rows)

  expect(rowsWithNumbers[4][0].number).toEqual(0);
  expect(rowsWithNumbers[0][0].number).toEqual(1);
  expect(rowsWithNumbers[1][0].number).toEqual(2);
  expect(rowsWithNumbers[0][2].number).toEqual(3);
  expect(rowsWithNumbers[1][3].number).toEqual(4);
  expect(rowsWithNumbers[3][3].number).toEqual(5);
  expect(rowsWithNumbers[2][4].number).toEqual(6);
  expect(rowsWithNumbers[2][6].number).toEqual(7);
  expect(rowsWithNumbers[2][8].number).toEqual(8);
});

test('fetchSiblings with a middle cell', () => {
  const board = generateBoard(10, 15, 2);
  const currentCell = board.rows[5][5];

  expect(currentCell.x).toEqual(5);
  expect(currentCell.y).toEqual(5);

  const siblings = fetchSiblings(board, currentCell);

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
  const board = generateBoard(10, 15, 2);
  const currentCell = board.rows[0][0];

  expect(currentCell.x).toEqual(0);
  expect(currentCell.y).toEqual(0);

  const siblings = fetchSiblings(board, currentCell);

  expect(siblings.length).toEqual(3);

  const coordinates = getCoordinates(siblings);

  expect(coordinates[0]).toEqual([1, 0]);
  expect(coordinates[1]).toEqual([0, 1]);
  expect(coordinates[2]).toEqual([1, 1]);
});

test('fetchSiblings with a top/right', () => {
  const board = generateBoard(10, 15, 2);
  const currentCell = board.rows[0][14];

  expect(currentCell.y).toEqual(0);
  expect(currentCell.x).toEqual(14);

  const siblings = fetchSiblings(board, currentCell);

  expect(siblings.length).toEqual(3);

  const coordinates = getCoordinates(siblings);

  expect(coordinates[0]).toEqual([13, 0]);
  expect(coordinates[1]).toEqual([13, 1]);
  expect(coordinates[2]).toEqual([14, 1]);
});

test('fetchSiblings with a bottom/left', () => {
  const board = generateBoard(10, 15, 2);
  const currentCell = board.rows[9][0];

  expect(currentCell.y).toEqual(9);
  expect(currentCell.x).toEqual(0);

  const siblings = fetchSiblings(board, currentCell);

  expect(siblings.length).toEqual(3);

  const coordinates = getCoordinates(siblings);

  expect(coordinates[0]).toEqual([0, 8]);
  expect(coordinates[1]).toEqual([1, 8]);
  expect(coordinates[2]).toEqual([1, 9]);
});

test('fetchSiblings with a bottom/right', () => {
  const board = generateBoard(10, 15, 2);
  const currentCell = board.rows[9][14];

  expect(currentCell.y).toEqual(9);
  expect(currentCell.x).toEqual(14);

  const siblings = fetchSiblings(board, currentCell);

  expect(siblings.length).toEqual(3);

  const coordinates = getCoordinates(siblings);

  expect(coordinates[0]).toEqual([13, 8]);
  expect(coordinates[1]).toEqual([14, 8]);
  expect(coordinates[2]).toEqual([13, 9]);
});
