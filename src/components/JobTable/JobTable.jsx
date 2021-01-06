import React, { Suspense, useState, } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormGroup,
  FormControlLabel,
  TextField,
  Checkbox,
  Switch,
} from '@material-ui/core';
import { Loader } from '../../components';
import JobRowCreator from './JobRowCreator';

import "./JobTable.scss";

/**
 * Sorts and Filters the jobs to display before rendering the rows for JobTable
 * @category UI Component
 * @subcategory JobTable
 * @class JobTable
 * @param {Array<jobData>} data array of all job data
 * @return {ReactComponent}
 */
const JobTable = ({ data = [] }) => {
  const [displayCheckboxCompleted, setDisplayCheckboxCompleted] = useState(true);
  const [displayCheckboxInCompleted, setDisplayCheckboxInCompleted] = useState(true);
  const [sortDescending, setSortDescending] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const changeSetterHandler = (stateSetter) => (event) => {
    stateSetter(event.target.checked);
  }

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <>
      <div className="job-table__data-control-group">
        <FormGroup row>
          <FormControlLabel
            checked={displayCheckboxInCompleted}
            onChange={changeSetterHandler(setDisplayCheckboxInCompleted)}
            control={<Checkbox color="primary" size="small" name="Show Completed" />}
            label="In Progress"
          />
          <FormControlLabel
            checked={displayCheckboxCompleted}
            onChange={(changeSetterHandler(setDisplayCheckboxCompleted))}
            control={<Checkbox color="primary" size="small" name="Show Incompleted" />}
            label="Completed"
          />
          <FormControlLabel
            control={
              <Switch
                checked={sortDescending}
                name="Show Descending"
                onChange={(changeSetterHandler(setSortDescending))}
                color="primary"
              />}
            label="Date Time Descending"
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            onChange={searchHandler}
            control={<TextField size="small" label="Search for Contractor" variant="outlined" />}
          />
        </FormGroup>
      </div>
      <TableContainer component={Paper} className="app-table">
        <Table aria-label="a dense table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ width: '8em' }} ><span className="app-table__header-cell">Job ID</span></TableCell>
              <TableCell align="left"><span className="app-table__header-cell">Location</span></TableCell>
              <TableCell align="left"><span className="app-table__header-cell">Date Time Started</span></TableCell>
              <TableCell align="left"><span className="app-table__header-cell">Date Time Ended</span></TableCell>
              <TableCell align="left"><span className="app-table__header-cell">Contractor Name</span></TableCell>
              <TableCell align="left"><span className="app-table__header-cell">Company</span></TableCell>
              <TableCell align="left"><span className="app-table__header-cell">Phone</span></TableCell>
              <TableCell align="center"><span className="app-table__header-cell">Status</span></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Suspense fallback={<Loader />}>
              <JobRowCreator
                jobData={data}
                showCompleted={displayCheckboxCompleted}
                showInCompleted={displayCheckboxInCompleted}
                descending={sortDescending}
                searchTerm={searchTerm}
              />
            </Suspense>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
};


export default JobTable;
