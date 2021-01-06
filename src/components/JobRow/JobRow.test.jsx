import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import JobRow from './JobRow';

const testValues = {
  jobID: 'test id',
  location: [],
  company: 'imma real company',
  phone: '69696969',
  status: 'completed',
  contractorName: 'imma real contractor',
  dateTimeStart: '69',
  dateTimeEnd: '69',
};

afterEach(cleanup);

describe('JobRow', () => {
  test('renders without crashing', () => {
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    ReactDOM.render(<JobRow />, tableBody);
  });
//jobID, location, company, phone, status, contractorName, dateTimeStart, dateTimeEnd
  test('test values of component props', () => {
    const component = (
      <JobRow
        data-testid="jobrow__testprops"
        {...testValues}
      />
    );
    Object.keys(component).map((key) => {
      return expect(component.props.key).toBe(testValues.key);
    });
  });

  test('matches snapshot', () => {
    const tree = renderer.create(<JobRow {...testValues} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
