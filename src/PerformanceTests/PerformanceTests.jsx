import React, { Profiler } from 'react';
import { Contractor, JobDetails, JobTable, JobRowCreator, Loader, MapDisplay,Navbar,SignIn ,SignUp, JobLocationReport } from '../components';
import {
  Table,
  TableBody,
} from '@material-ui/core';
import {PageTemplate} from '../pages';

const BlankComponnent = () => (<div></div>);
const PerformanceTests = ({ firebase }) => {

  const fs = require('fs');
  let timeMsg = '';
  let tableHeader =`## Component Performance Test
    \nTest ran on ${new Date()}
    \nComponent|Phase|Total Time (ms)|Base Time (ms)|Start Time (ms)|Commit Time (ms)|
    \n|-|-|-|-|-|-|
    \n`;
  fs.writeFile('PerformanceTests.md', tableHeader, function (err) {
    if (err) return console.log(err);
  });
  const callback = (id, phase, actualTime, baseTime, startTime, commitTime) => {
    timeMsg = `|${id}|${phase}|${actualTime}|${baseTime}|${startTime}|${commitTime}|\n`;
    fs.appendFile('PerformanceTests.md', timeMsg, function (err) {
      if (err) return console.log(err);
    });
  }

  return (
    <>
      <Profiler id="Contractor" onRender={callback}>
        <Contractor />
      </Profiler>
      <Profiler id="JobDetails" onRender={callback}>
        <JobDetails />
      </Profiler>
      <Profiler id="JobLocationReport" onRender={callback}>
        <JobLocationReport />
      </Profiler>
     <Profiler id="JobTable" onRender={callback}>
       <JobTable />
     </Profiler>
     <Profiler id="JobRowCreator" onRender={callback}>
       <Table>
         <TableBody>
         <JobRowCreator />
         </TableBody>
       </Table>
      </Profiler>
      <Profiler id="Loader" onRender={callback}>
        <Loader />
      </Profiler>
      <Profiler id="MapDisplay" onRender={callback}>
        <MapDisplay />
      </Profiler>
      <Profiler id="Navbar" onRender={callback}>
        <Navbar />
      </Profiler>
      <Profiler id="SignIn" onRender={callback}>
        <SignIn />
      </Profiler>
      <Profiler id="SignUp" onRender={callback}>
        <SignUp />
      </Profiler>
      <Profiler id="PageTemplate" onRender={callback}>
          <PageTemplate title="PageTemplate" page={BlankComponnent} />
      </Profiler>
     </>
  );
};

export default PerformanceTests;
