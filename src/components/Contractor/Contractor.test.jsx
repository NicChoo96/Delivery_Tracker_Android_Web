import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Contractor from './Contractor';

afterEach(cleanup);

describe('Contractor', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Contractor />, div);
  });

  test('test values of component props', () => {
    const testValues = {
      contractorName: 'test name',
      phoneNumber: 'test number',
      companyName: 'test company name',
    };
    const component = (
      <Contractor
        data-testid="contractor__testprops"
        contractorName={testValues.contractorName}
        phoneNumber={testValues.phoneNumber}
        companyName={testValues.companyName}
      />
    );
    Object.keys(component).map((key) => {
      return expect(component.props.key).toBe(testValues.key);
    });
  });

  test('matches snapshot', () => {
    const tree = renderer.create(<Contractor />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
