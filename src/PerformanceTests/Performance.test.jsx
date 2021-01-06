import React from 'react';
import ReactDOM from 'react-dom';
import PerformanceTest from './PerformanceTests';

describe('Performance Testing for Pages, Write to File', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PerformanceTest />, div);
  });
});
