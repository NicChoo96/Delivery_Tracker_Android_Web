import React, { useEffect, useState, } from 'react';
import {
  TableCell,
  TableRow,
} from '@material-ui/core';
import { LazyJobRow } from '../../components';
import { immutableSort, fuzzySearch } from '../../utils';

/**
 * Sorts and Filters the jobs to display before rendering the rows for JobTable
 * @category UI Component
 * @subcategory JobTable
 * @class JobRowCreator
 * @param {Array<jobInformation>} jobData array of all jobs
 * @param {boolean} showCompleted render completed jobs
 * @param {boolean} showInCompleted render incompleted jobs
 * @param {boolean} descending render jobs in descending date time order
 * @param {string} searchTerm input search term to fuzzy search from contractor name, company and phone number
 * @return {ReactComponent}
 */
const JobRowCreator = ({ jobData, showCompleted, showInCompleted, descending, searchTerm }) => {
  const [sortedData, setSortedData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const sortingOrder = descending ? 1 : -1;

  // put all completed task at the bottom
  // sort tasks ascending with dateTimeStart
  // sort tasks ascending with dateTimeEnd
  useEffect(() => {
    setSortedData(immutableSort(jobData, (a, b) => {

      // completed tasks always comes later
      // only one has dateTimeEnd
      if (a.dateTimeEnd > 0 && b.dateTimeEnd === 0)
        return 1;
      else if (a.dateTimeEnd === 0 && b.dateTimeEnd > 0)
        return -1;

      // sort if datetimeStart are not the same
      if (a.dateTimeStart !== b.dateTimeStart) {
        return (b.dateTimeStart - a.dateTimeStart) * sortingOrder;
      }

      // if datetimeStart are the same, sort by datetimeEnd
      // both WILL have datetimeEnd at this point
      if (a.dateTimeEnd && b.dateTimeEnd)
        return (b.dateTimeEnd - a.dateTimeEnd) * sortingOrder;

      return 1;
    }));
  }, [jobData, sortingOrder]);

  // setting filters
  useEffect(() => {
    setDisplayData(sortedData.filter((data) => {
      const searchTermFound = fuzzySearch(searchTerm, `${data.name} ${data.company} ${data.phoneNo}`);
      if (showCompleted && showInCompleted) return searchTermFound;
      else if (showCompleted) return (data.dateTimeEnd > 0) && searchTermFound;
      else if (showInCompleted) return (data.dateTimeEnd === 0) && searchTermFound;
      return false;
    }));
  }, [showCompleted, showInCompleted, sortedData, searchTerm]);

  return (
    (displayData.length > 0)
      ? (<>{displayData.map((job, index) => (<LazyJobRow
        jobID={job?.jobID ?? '-'}
        location={job.locations}
        dateTimeStart={job.dateTimeStart}
        dateTimeEnd={job.dateTimeEnd}
        company={job.company}
        phone={job.phoneNo}
        contractorName={job.name}
        status={!job.dateTimeEnd ? 'In Progress' : 'Complete'}
        key={index}
      />))}</>)
      : <TableRow key={69}>
        <TableCell align="center" colSpan={8}>
          <span className="app__no-data-message">No data available.</span>
        </TableCell>
      </TableRow>
  )
};

export default JobRowCreator;
