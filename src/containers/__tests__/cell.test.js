import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cell from '../../containers/cell';
import configureStore from 'redux-mock-store';

function configure(props = {}, cell = { id: 123 }) {
  const configureMockStore = configureStore();
  const initialState = {
    selectedCells: [],
    flaggedCells: [],
    gameOver: false,
    exploded: [],
    ...props
  };

  const store = configureMockStore(initialState);

  return { cell, store };
}

test('displaying and clicking a flagged cell', async () => {
  const cell = { id: 123 };
  const { store } = configure({
    flaggedCells: [cell]
  });
  const { container } = render(
    <Cell store={store} cell={cell} />
  );

  expect(container.querySelector('div.cell')).toHaveAttribute('data-test-flagged', 'true')

  fireEvent.click(container.querySelector('[data-test-flagged]'))
  expect(store.getActions().length).toEqual(0);

  fireEvent.contextMenu(container.querySelector('[data-test-flagged]'));
  expect(store.getActions()[0].type).toEqual('CLICK_FLAG');
});

test('displaying and clicking a hidden cell', async () => {
  const cell = { id: 123 };
  const { store } = configure();
  const { container } = render(
    <Cell store={store} cell={cell} />
  );

  expect(container.querySelector('div.cell')).toHaveAttribute('data-test-hidden', 'true')

  fireEvent.click(container.querySelector('[data-test-hidden]'))
  expect(store.getActions()[0].type).toEqual('CLICK_CELL');

  fireEvent.contextMenu(container.querySelector('[data-test-hidden]'));
  expect(store.getActions()[1].type).toEqual('CLICK_FLAG');
});

test('displaying and clicking an exploded cell', async () => {
  const cell = {
    id: 123,
    isMine: true,
  };
  const { store } = configure({
    gameOver: true,
    exploded: [cell]
  });
  const { container } = render(
    <Cell store={store} cell={cell} />
  );

  expect(container.querySelector('div.cell')).toHaveAttribute('data-test-detonated', 'true')

  fireEvent.click(container.querySelector('[data-test-detonated]'))
  expect(store.getActions().length).toEqual(0);

  fireEvent.contextMenu(container.querySelector('[data-test-detonated]'));
  expect(store.getActions().length).toEqual(0);
});

test('displaying and clicking a revealed mine', async () => {
  const cell = {
    id: 123,
    isMine: true
  };
  const { store } = configure({
    gameOver: true
  });
  const { container } = render(
    <Cell store={store} cell={cell} />
  );

  expect(container.querySelector('div.cell')).toHaveAttribute('data-test-visible-mine', 'true')

  fireEvent.click(container.querySelector('[data-test-visible-mine]'));
  expect(store.getActions().length).toEqual(0);

  fireEvent.contextMenu(container.querySelector('[data-test-visible-mine]'));
  expect(store.getActions().length).toEqual(0);
});

test('displaying and clicking a revealed number that is clicked', async () => {
  const cell = {
    id: 123,
    number: 3,
    isMine: false
  };
  const { store } = configure({
    selectedCells: [cell]
  });
  const { container } = render(
    <Cell store={store} cell={cell} />
  );

  expect(container.querySelector('div.cell')).toHaveAttribute('data-test-visible', 'true');

  fireEvent.click(container.querySelector('[data-test-visible]'));
  expect(store.getActions().length).toEqual(0);

  fireEvent.contextMenu(container.querySelector('[data-test-visible]'));
  expect(store.getActions().length).toEqual(0);
});

test('displaying and clicking a revealed number after game over', async () => {
  const cell = {
    id: 123,
    number: 3,
    isMine: false
  };
  const { store } = configure({
    gameOver: true
  });
  const { container } = render(
    <Cell store={store} cell={cell} />
  );

  expect(container.querySelector('div.cell')).toHaveAttribute('data-test-visible', 'true');

  fireEvent.click(container.querySelector('[data-test-visible]'));
  expect(store.getActions().length).toEqual(0);

  fireEvent.contextMenu(container.querySelector('[data-test-visible]'));
  expect(store.getActions().length).toEqual(0);
});

test('displaying and clicking a revealed blank when selected', async () => {
  const cell = {
    id: 123,
    number: 0,
    isMine: false
  };
  const { store } = configure({
    selectedCells: [cell]
  });
  const { container } = render(
    <Cell store={store} cell={cell} />
  );

  expect(container.querySelector('div.cell')).toHaveAttribute('data-test-empty', 'true')

  fireEvent.click(container.querySelector('[data-test-empty]'));
  expect(store.getActions().length).toEqual(0);

  fireEvent.contextMenu(container.querySelector('[data-test-empty]'));
  expect(store.getActions().length).toEqual(0);
});

test('displaying and clicking a revealed blank when game over', async () => {
  const cell = {
    id: 123,
    number: 0,
    isMine: false
  };
  const { store } = configure({
    gameOver: true
  });
  const { container } = render(
    <Cell store={store} cell={cell} />
  );

  expect(container.querySelector('div.cell')).toHaveAttribute('data-test-empty', 'true')

  fireEvent.click(container.querySelector('[data-test-empty]'));
  expect(store.getActions().length).toEqual(0);

  fireEvent.contextMenu(container.querySelector('[data-test-empty]'));
  expect(store.getActions().length).toEqual(0);
});
