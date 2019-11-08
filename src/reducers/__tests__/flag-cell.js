import flagCell from '../flag-cell.js';

test('calling it when a cell is not flagged', () => {
  const cell = { id: 123 };
  const result = flagCell(cell, {
    flaggedCells: [
      { id: 234 }
    ],
    otherState: true
  });

  expect(result.flaggedCells.includes(cell)).toEqual(true);
  expect(result.flaggedCells.length).toEqual(2);
  expect(result.otherState).toEqual(true);
});

test('calling it when a cell is flagged', () => {
  const cell = { id: 123 };
  const result = flagCell(cell, {
    flaggedCells: [cell, { id: 234 }],
    otherState: true
  });

  expect(result.flaggedCells.includes(cell)).toEqual(false);
  expect(result.flaggedCells.length).toEqual(1);
  expect(result.otherState).toEqual(true);
});
