import React, { useRef, useState, useEffect, useCallback } from 'react';
import './JobRow.scss';
import {
  Button,
  Tooltip,
  Zoom,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { history, copyToClipboard, approximateAddress, timestampConversion } from '../../utils';

/**
 * Renders one job row with the job data such as datetime, location, etc
 * @category UI Component
 * @subcategory JobTable
 * @class JobRow
 * @param {string} jobID Job ID
 * @param {Array<locationData>} location array coordinate and timestamp of contractor's location history
 * @param {string} company contractor's company
 * @param {number} phone contractor's phone number
 * @param {number} contractorName contractor's name
 * @param {number} dateTimeStart timestamp when the job starts
 * @param {number} dateTimeStart timestamp when the job ends
 * @return {ReactComponent}
 */
function JobRow({ jobID, location, company, phone, status, contractorName, dateTimeStart, dateTimeEnd }) {
  const statusColor = 'job-row__status-' + (status === 'Complete' ? 'completed' : 'inprogress');
  const jobIdRef = useRef();
  const [tooltipText, setTooltipText] = useState(jobID);
  const [locationName, setLocationName] = useState(' - ');

  const memoizedApproximatAddress = useCallback(() => approximateAddress(
    location[location.length - 1].lat,
    location[location.length - 1].lng
  ), [location]);

  useEffect(() => {
    if (location && location.length > 0) {
      memoizedApproximatAddress()
        .then(data => setLocationName(data))
        .catch(error => {
          setLocationName(' - ');
          console.error(error);
        });
    } else {
      setLocationName(' - ')
    }
  }, [memoizedApproximatAddress, location]);


  const copyIdHandler = (inputRef) => (event) => {
    event.preventDefault();
    event.stopPropagation();

    copyToClipboard(inputRef.current.innerHTML);
    setTooltipText('Copied');
    setTimeout(() => setTooltipText(jobID), 1000);
  };

  return (<TableRow key={jobID} className="job-row__row">
    <TableCell align="left">
      <Tooltip
        title={tooltipText || ''}
        TransitionComponent={Zoom}
        placement="right"
        arrow
      >
        <Button
          style={{ textTransform: 'none' }}
          onClick={copyIdHandler(jobIdRef)}
          className="job-row__id_btn"
          variant="text"
        >
          <span ref={jobIdRef} className="job-row__id_string">
            {jobID}
          </span>
        </Button>
      </Tooltip>
    </TableCell>
    <TableCell align="left"><span className="app__text-cursor">{locationName}</span></TableCell>
    <TableCell align="left"><span className="app__text-cursor job-row__cell-no-wrap">{timestampConversion(dateTimeStart)}</span></TableCell>
    <TableCell align="left"><span className="app__text-cursor job-row__cell-no-wrap">{(dateTimeEnd) ? timestampConversion(dateTimeEnd) : `-`}</span></TableCell>
    <TableCell align="left"><span className="app__text-cursor">{contractorName}</span></TableCell>
    <TableCell align="left"><span className="app__text-cursor">{company}</span></TableCell>
    <TableCell align="left"><span className="app__text-cursor job-row__cell-no-wrap">{phone}</span></TableCell>
    <TableCell align="center"><span className={statusColor + " app__text-cursor job-row__cell-no-wrap"}>{status}</span></TableCell>
    <TableCell align="left">
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => history.push('/jobs/' + jobID)}
        disabled={locationName === (location && location.length > 0)}
      >
        View
          </Button>
    </TableCell>
  </TableRow>
  );
}

export default JobRow;
