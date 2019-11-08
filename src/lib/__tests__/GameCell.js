import GameCell from '../GameCell';
import GameBoard from '../GameBoard';
import { rowsIntoRows } from '../../test-helpers';

test('instantiation', () => {
  const board = new GameBoard();
  const subject = new GameCell(board, 'foo', true, 10, 50);

  expect(subject).toBeTruthy();
  expect(subject.board).toEqual(board);
  expect(subject.id).toEqual('foo');
  expect(subject.isMine).toEqual(true);
  expect(subject.x).toEqual(10);
  expect(subject.y).toEqual(50);
});

test('number', () => {
  const board = new GameBoard(5, 10, 1);
  const rows = [
    ' . .      ',
    '  . .. ...',
    ' . . . . .',
    '  . ......',
    '   ..     ',
  ];

  board.rows = rowsIntoRows(board, rows);

  expect(board.rows[4][0].number).toEqual(0);
  expect(board.rows[0][0].number).toEqual(1);
  expect(board.rows[1][0].number).toEqual(2);
  expect(board.rows[0][2].number).toEqual(3);
  expect(board.rows[1][3].number).toEqual(4);
  expect(board.rows[3][3].number).toEqual(5);
  expect(board.rows[2][4].number).toEqual(6);
  expect(board.rows[2][6].number).toEqual(7);
  expect(board.rows[2][8].number).toEqual(8);
});
