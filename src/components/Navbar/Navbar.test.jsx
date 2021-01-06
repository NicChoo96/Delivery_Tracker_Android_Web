import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';

import {
  cleanup,
  render,
  waitForElement,
  // getByTestId,
  // wait,
} from '@testing-library/react';
import renderer from 'react-test-renderer';

import Navbar from './Navbar';

const MockComponent = lazy(() => import('../LazyComponentMock'));

afterEach(cleanup);

describe('Navbar', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navbar />, div);
  });

  test('render with page', async () => {
    const { getByTestId } = render(
      <Navbar tabValue={0} Page={<MockComponent />} />
    );
    const lazyElement = await waitForElement(() =>
      getByTestId(`navbar__lazy-component`)
    );
    expect(lazyElement).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
