import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import rootReducer from '../../redux/reducers';

const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
    initialEntries = ['/'],
    store = createStore(rootReducer, initialState),
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => (
  {
    ...render(
      <Router
        history={ history }
      >
        <Provider
          store={ store }
        >
          {component}
        </Provider>
      </Router>,
    ),
    store,
  });
export default renderWithRouterAndRedux;
