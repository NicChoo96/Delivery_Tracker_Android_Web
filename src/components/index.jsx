import { lazy } from 'react';
import Loader from './Loader/Loader';
import Navbar from './Navbar/Navbar';
import JobRow from './JobRow/JobRow';
import JobTable from './JobTable/JobTable';
import JobRowCreator from './JobTable/JobRowCreator';
import JobDetails from './JobDetails/JobDetails';
import SignIn from './SignIn/SignIn';
import SignUp from './SignIn/SignUp';
import Contractor from './Contractor/Contractor';
import Manager from './ManagerSettings/ManagerSettings';
import MapDisplay from './MapDisplay/MapDisplay';
import JobLocationReport from './JobDetails/JobLocationReport'
import CompanyReport from './CompanyReport/CompanyReport';

const LazyMapDisplay = lazy(()=>import('./MapDisplay/MapDisplay'));
const LazyJobRow = lazy(() => import('./JobRow/JobRow'));

export {
  Navbar,
  JobRow, LazyJobRow,
  JobTable,
  JobRowCreator,
  SignIn,
  JobDetails,
  Loader,
  SignUp,
  Contractor,
  Manager,
  MapDisplay, LazyMapDisplay,
  JobLocationReport,
  CompanyReport,
};

// const LazyJobRow = lazy(() => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(import("./JobRow/JobRow")), 5000);
//   });
// });
