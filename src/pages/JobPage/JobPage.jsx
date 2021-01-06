import React, { useEffect } from 'react';
import './JobPage.scss';
import { useSelector } from 'react-redux';

import { JobTable } from '../../components';
import { withFirebase } from '../../Firebase';

import { useObjectVal } from 'react-firebase-hooks/database';
import { writeNewState } from '../../redux/actionCreators';
import { store } from '../../redux/store';

/**
 * This page handles the CRUD to firebase service and pass the reactive data to the JobTable Component
 * @category Page
 * @class JobPage
 * @param {Firebase} firebase CRUD interface to communiate with firebase backend service
 * @return {ReactComponent}
 */
const JobPage = ({ firebase }) => {
  const [value, loading] = useObjectVal(firebase.getAllJobs());

  // this is not being triggered for some reason
  useEffect(() => {
    store.dispatch(writeNewState(value));
  }, [value, loading]);

  return (
    <div className="job-page_wrapper">
      <JobTable data={useSelector(state => state)} />
    </div>
  );
};

export default withFirebase(JobPage);
