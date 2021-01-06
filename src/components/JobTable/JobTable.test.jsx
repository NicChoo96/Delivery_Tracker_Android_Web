import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';

import { cleanup, wait } from '@testing-library/react';
import renderer from 'react-test-renderer';

import JobTable from './JobTable';

const mockData = [{ "name": "MalcomNew", "phoneNo": "69696969", "jobID": "-MJlA929nYBnioQAFsKp", "company": "MalcomCompany", "dateTimeEnd": 1602847819736, "dateTimeStart": 1602847809736, "locations": [] }, { "name": "MalcomNew", "phoneNo": "69696969", "jobID": "-MJlBeqaRX_7vLPeBU1m", "company": "MalcomCompany", "dateTimeEnd": 1602848216244, "dateTimeStart": 1602848206244, "locations": [] }, { "name": "MalcomNew", "phoneNo": "69696969", "jobID": "-MJlBrCGts_sRNdGfsZY", "company": "MalcomCompany", "dateTimeEnd": 1602848263811, "dateTimeStart": 1602848253811, "locations": [] }, { "name": "MalcomNew", "phoneNo": "69696969", "jobID": "-MJlLvAViWToCDvNQiUh", "company": "MalcomCompany", "dateTimeEnd": 1602850904558, "dateTimeStart": 1602850894558, "locations": [{ "dateTimeStamp": 1602851280074, "lat": 1.3, "lon": 1.2 }, { "dateTimeStamp": 1602851285192, "lat": 1.3, "lon": 1.2 }, { "dateTimeStamp": 1602851285965, "lat": 1.3, "lon": 1.2 }] }, { "name": "MalcomNew", "phoneNo": "69696969", "jobID": "-MJlO6j_fdnc4Bg5AXZL", "company": "MalcomCompany", "dateTimeEnd": 1602851480308, "dateTimeStart": 1602851470308, "locations": [{ "dateTimeStamp": 1602851470308, "lat": 1.69, "lon": 1.69 }, { "dateTimeStamp": 1602851470308, "lat": 1.69, "lon": 1.69 }] }, { "name": "Elon Musk", "phoneNo": "95123456", "jobID": "-MJqbgKIt7NWc7tWcZmu", "company": "MacroHard1", "dateTimeEnd": 0, "dateTimeStart": 1602939177220, "locations": [{ "dateTime": 1602939179290, "lat": 1.3482950000002, "lon": 103.683134 }, { "dateTime": 1602939181159, "lat": 2.3482950000002, "lon": 103.683134 }, { "dateTime": 1602939182328, "lat": 3.3482950000002, "lon": 103.683134 }, { "dateTime": 1602939183204, "lat": 4.3482950000002, "lon": 103.683134 }, { "dateTime": 1602939184106, "lat": 5.3482950000002, "lon": 103.683134 }] }, { "name": "Elon Musk", "phoneNo": "95123456", "jobID": "-MJqEZOEODr3OLokpCAw", "company": "MacroHard1", "dateTimeEnd": 0, "dateTimeStart": 1602932853205, "locations": [] }, { "name": "Elon Musk", "phoneNo": "95123456", "jobID": "-MJkxYjAhOAi8Rwol9H_", "company": "MacroHard1", "dateTimeEnd": 0, "dateTimeStart": 1602844244871, "locations": [] }, { "name": "Elon Musk", "phoneNo": "95123456", "jobID": "-MJm2HHKueP_7PEt5imA", "company": "MacroHard1", "dateTimeEnd": 0, "dateTimeStart": 1602862523652, "locations": [] }]

afterEach(cleanup);

describe('JobTable', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<JobTable />, div);
  });

  test('comparing generated rows with file count', async () => {
    const component = (
      <JobTable data-testid="jobtable__testcount" data={mockData} />
    );
    await wait();
    const jowRowCount = component.props.data.length;
    const fileCount = mockData.length;
    expect(jowRowCount).toEqual(fileCount);
  });

  test('matches snapshot', () => {
    const tree = renderer.create(<JobTable />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
