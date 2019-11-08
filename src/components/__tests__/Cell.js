import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cell from '../cell';

test('displaying a cell with a number = 1', async () => {
  const cell = {
    number: 1
  };

  const { container } = render(
    <Cell isVisible={true} cell={cell} />
  );

  expect(container.querySelector('div')).toHaveTextContent('1');
  expect(container.querySelector('div')).toHaveClass('one');
});

test('displaying a cell with a number = 2', async () => {
  const cell = {
    number: 2
  };

  const { container } = render(
    <Cell isVisible={true} cell={cell} />
  );

  expect(container.querySelector('div')).toHaveTextContent('2');
  expect(container.querySelector('div')).toHaveClass('two');
});

test('displaying a cell with a number = 3', async () => {
  const cell = {
    number: 3
  };

  const { container } = render(
    <Cell isVisible={true} cell={cell} />
  );

  expect(container.querySelector('div')).toHaveTextContent('3');
  expect(container.querySelector('div')).toHaveClass('three');
});

test('displaying a cell with a number = 4', async () => {
  const cell = {
    number: 4
  };

  const { container } = render(
    <Cell isVisible={true} cell={cell} />
  );

  expect(container.querySelector('div')).toHaveTextContent('4');
  expect(container.querySelector('div')).toHaveClass('four');
});

test('displaying a cell with a number = 5', async () => {
  const cell = {
    number: 5
  };

  const { container } = render(
    <Cell isVisible={true} cell={cell} />
  );

  expect(container.querySelector('div')).toHaveTextContent('5');
  expect(container.querySelector('div')).toHaveClass('five');
});

test('displaying a cell with a number = 6', async () => {
  const cell = {
    number: 6
  };

  const { container } = render(
    <Cell isVisible={true} cell={cell} />
  );

  expect(container.querySelector('div')).toHaveTextContent('6');
  expect(container.querySelector('div')).toHaveClass('six');
});

test('displaying a cell with a number = 7', async () => {
  const cell = {
    number: 7
  };

  const { container } = render(
    <Cell isVisible={true} cell={cell} />
  );

  expect(container.querySelector('div')).toHaveTextContent('7');
  expect(container.querySelector('div')).toHaveClass('seven');
});

test('displaying a cell with a number = 8', async () => {
  const cell = {
    number: 8
  };

  const { container } = render(
    <Cell isVisible={true} cell={cell} />
  );

  expect(container.querySelector('div')).toHaveTextContent('8');
  expect(container.querySelector('div')).toHaveClass('eight');
});
