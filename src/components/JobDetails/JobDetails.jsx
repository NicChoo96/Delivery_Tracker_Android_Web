import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Card,
  CardContent,
} from '@material-ui/core';
import './JobDetails.scss';

import { Contractor, MapDisplay } from '../index';
import {
  timestampConversion,
  approximateAddress,
  immutableSort,
  flatternObjectToArray,
} from '../../utils';

/**
 * This component will render the job details
 * @category UI Component
 * @subcategory JobDetails
 * @class JobDetails
 * @param {number} startTime Timestamp when the job starts
 * @param {number} endTime Timestamp when the job ends
 * @param {number} phoneNo Phone number of contractor
 * @param {string} name Name of Contractor
 * @param {Array<{locationData}>} locationHistory array of all job history information
 * @return {ReactComponent}
 */
function JobDetails({ startTime = 0, endTime = 0, phoneNo, name, company, locationHistory }) {
  const labelSize = 4;
  const textSize = 8;

  const [parsedLocations, setParsedLocations] = useState({});
  const [displayLocation, setDisplayLocation] = useState([]);

  const memoizedApproximatAddress = useCallback(approximateAddress, []);

  // fetches approximate addresses from google
  // then asynchronously update the state of parsedLocation
  useEffect(() => {
    // iterating through the entire locationHistory prop
    // to get every lat long and write to the parseLocataions
    // state individually for each location
    if (locationHistory && locationHistory.length && locationHistory.length > 0) {
      locationHistory.filter(({ lat, lng, dateTime }) => {
        memoizedApproximatAddress(lat, lng)
          .then(response => {
            setParsedLocations((state) => {
              const newState = { ...state };
              newState[dateTime] = { approximateLocation: response, dateTime: timestampConversion(dateTime) };
              return newState;
            });
          });
          return false;
      });
    }
  }, [memoizedApproximatAddress, locationHistory]);

  // fetches approximate addresses from google
  // convert the parsedLocation object into a sorted
  // displayable array with descending timestamp
  useEffect(() => {
    const locationEntries = flatternObjectToArray(parsedLocations, true).map(data => {
      return { timeStamp: data.__objectKey__, approximateLocation: data.approximateLocation, dateTime: data.dateTime };
    })
    setDisplayLocation(immutableSort(locationEntries, (a, b) => {
      return b.timeStamp - a.timeStamp;
    }));
  }, [parsedLocations]);

  return (
    <>
      <Card>
        <CardContent>
          <Grid container direction="row" spacing={5} justify="center">
            <Grid item md={7} sm={5} container>

              <Grid item xs={labelSize}>
                <h3 className="job-details__label">Last Location:</h3>
              </Grid>
              <Grid item xs={textSize}>
                <p
                  data-testid="job-details__value-location"
                  className="app__text-cursor"
                >
                  {(displayLocation.length > 0) ? displayLocation[displayLocation.length - 1].approximateLocation : 'No location'}
                </p>
              </Grid>

              <Grid item xs={labelSize}>
                <h3 className="job-details__label">Start Time:</h3>
              </Grid>
              <Grid item xs={textSize}>
                <p
                  data-testid="job-details__value-starttime"
                  className="app__text-cursor"
                >
                  {timestampConversion(startTime, true, true)}
                </p>
              </Grid>

              <Grid item xs={labelSize}>
                <h3 className="job-details__label">End Time:</h3>
              </Grid>
              <Grid item xs={textSize}>
                <p
                  data-testid="job-details__value-endtime"
                  className="app__text-cursor"
                >
                  {endTime ? timestampConversion(endTime, true, true) : 'Job In Progress'}
                </p>
              </Grid>
              <Grid item xs={textSize + labelSize}>
                <h3 className="job-details__label">Contractor Information:</h3>
                <Contractor companyName={company} phoneNumber={phoneNo} contractorName={name} />
              </Grid>
            </Grid>

            <Grid item md={5} sm={7}>
              <Card className="job-details__full-length-height">
                <div className="job-details__mapholder">

                  {
                    (!(locationHistory && locationHistory.length && locationHistory.length > 0))
                      ? <p className="job-location__no-data-message app__no-data-message">No Location Data Available</p>
                      : (
                        <MapDisplay places={locationHistory} />
                      )
                  }
                </div>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />
    </>
  );
}

export default JobDetails;
