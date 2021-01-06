import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import SignIn from './SignIn';

afterEach(cleanup);

describe('SignIn', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignIn />, div);
  });

  // we do not have a prop for this component, so the second test is omitted

  test('matches snapshot', () => {
    const tree = renderer.create(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
