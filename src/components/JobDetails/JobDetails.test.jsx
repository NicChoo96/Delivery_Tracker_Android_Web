import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, wait } from '@testing-library/react';
import renderer from 'react-test-renderer';
import JobDetails from '../../components/JobDetails/JobDetails';

afterEach(cleanup);

describe('JobDetails', () => {
  const jobDetailsTestProps = {
    locationHistory: [],
    startTime: '1602939179290',
    endTime: '1602939179400',
    phoneNo: '69696969',
    name: 'I am a real person',
    company: 'This is a real company',
  };

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<JobDetails />, div);
  });

  test('render value', async () => {
    const { getByTestId } = render(<JobDetails {...jobDetailsTestProps} />);

    await wait();
    expect(getByTestId('job-details__value-starttime').innerHTML).toBe(
      '17 Oct 2020 - 20:52:59 PM'
    );
    expect(getByTestId('job-details__value-endtime').innerHTML).toBe(
      '17 Oct 2020 - 20:52:59 PM'
    );
  });

  test('matches snapshot', () => {
    const tree = renderer
      .create(<JobDetails {...jobDetailsTestProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
