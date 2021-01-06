import React, { useState, useEffect, useCallback } from 'react';
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
  Switch,
} from '@material-ui/core';

import {
  timestampConversion,
  approximateAddress,
  immutableSort,
  flatternObjectToArray,
} from '../../utils';

/**
 * Renders a list of all the locations the contractors has been to and the accompanying time
 * @category UI Component
 * @subcategory JobDetails
 * @class JobLocationReport
 * @param {Array<{locationData}>} locationHistory array of all job history information
 * @return {ReactComponent}
 */
function JobLocationReport({ locationHistory }) {
  const [parsedLocations, setParsedLocations] = useState({});
  const [preSortedLocations, setPreSortedLocations] = useState([]);
  const [displayLocations, setDisplayLocations] = useState([]);
  const [sortDescending, setSortDescending] = useState(true);

  const memoizedApproximatAddress = useCallback(approximateAddress, []);

  const descendingHandler = (event) => {
    setSortDescending(event.target.checked);
  }

  useEffect(() => {
    locationHistory.filter(({ lat, lng, dateTime }) => {
      memoizedApproximatAddress(lat, lng)
        .then(response => {
          setParsedLocations((state) => {
            const newState = { ...state };
            newState[dateTime] = { approximateLocation: response, dateTime: timestampConversion(dateTime, true, true) };
            return newState;
          });
        });
      return false;
    });
  }, [memoizedApproximatAddress, locationHistory]);

  useEffect(() => {
    const locationEntries = flatternObjectToArray(parsedLocations, true).map(data => {
      return { timeStamp: data.__objectKey__, approximateLocation: data.approximateLocation, dateTime: data.dateTime };
    })
    setPreSortedLocations(locationEntries);
  }, [parsedLocations]);

  useEffect(() => {
    setDisplayLocations(immutableSort(preSortedLocations, (a, b) => {
      return (b.timeStamp - a.timeStamp) * ((sortDescending) ? 1 : -1);
    }));

    return () => setDisplayLocations([]);
  }, [preSortedLocations, sortDescending]);

  return (
    <>
      <h2>Location Report</h2>

      <FormGroup row className="job-location__data-control-group">
        <FormControlLabel
          disabled={!(displayLocations && displayLocations.length > 1)}
          control={
            <Switch
              checked={sortDescending}
              name="Show Descending"
              onChange={descendingHandler}
              color="primary"
            />}
          label="Date Time Descending"
        />
      </FormGroup>
      <TableContainer component={Paper} className="app-table">
        <Table aria-label="a location history table" size="small" >
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <span className="app-table__header-cell">
                  Date Time Started
                  </span>
              </TableCell>
              <TableCell align="left">
                <span className="app-table__header-cell">
                  Location
                  </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(displayLocations.length > 0) ? displayLocations.map(data => (
              <TableRow key={data.timeStamp} className="app-table__row">
                <TableCell component="th" scope="data">
                  <span className="app__text-cursor">
                    {data.dateTime}
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="app__text-cursor">
                    {data.approximateLocation}
                  </span>
                </TableCell>
              </TableRow>
            ))
              : <TableRow key={69}>
                <TableCell align="center" colSpan={8}>
                  <span className="app__no-data-message job-location__no-data-message">No data available.</span>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default JobLocationReport;
