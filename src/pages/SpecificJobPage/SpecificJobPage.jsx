import React from 'react';
import { useParams } from 'react-router-dom';
import { JobDetails } from '../../components';
import { JobLocationReport } from '../../components';
import { useSelector } from 'react-redux';

/**
 * This component will render the full details of the jobs
 * @category Page
 * @class SpecificJobPage
 * @return {ReactComponent}
 */
const SpecificJobPage = () => {

  const params = useParams();
  const filteredJobs = useSelector(state => (state.filter(
    (job) => {
      return (job.jobID === params.jobID);
    }
  )));

  const currentJobs = filteredJobs.length > 0 ? filteredJobs[0] : {};

  // change this to firebase stuff
  const data = {
    jobId: params.jobID,
    startTime: currentJobs.dateTimeStart,
    endTime: currentJobs.dateTimeEnd,
    company: currentJobs.company,
    phoneNo: currentJobs.phoneNo,
    name: currentJobs.name,
    locationHistory: currentJobs.locations,
  };

  return (
    <div className="specific-job-page_wrapper">
      <JobDetails {...data} />
      <JobLocationReport {...data} />
    </div>
  );
};

export default SpecificJobPage;
