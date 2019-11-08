import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

function configure(props = {}) {
  const configureMockStore = configureStore();
  const initialState = {
    selectedCells: [],
    flaggedCells: [],
    gameOver: false,
    exploded: [],
    ...props
  };

  const store = configureMockStore(initialState);

  return { store };
}

test('it renders the app', async () => {
  const { store } = configure();
  const { container } = render(
    <Provider store={store}>
      <App store={store}/>
    </Provider>
  )

  expect(!!container.querySelector('main.app')).toEqual(true);
});
