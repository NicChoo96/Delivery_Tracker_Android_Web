import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Loader from './Loader';

afterEach(cleanup);

describe('Loader', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loader />, div);
  });

  test('matches snapshot', () => {
    const tree = renderer.create(<Loader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
