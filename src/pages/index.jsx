import React, { lazy } from 'react';

import PageTemplate from './_PageTemplate/_PageTemplate';
import NoLazyJob from './JobPage/JobPage';

const NoLazyJobPage = <PageTemplate title="Job History" page={NoLazyJob} />;

// lazy loading pages
const SignIn = lazy(() => import('./SignInPage/SignInPage'));
const Job = lazy(() => import('./JobPage/JobPage'));
const NotFound404 = lazy(() => import('./NotFound404/NotFound404'));
const SpecificJob = lazy(() => import('./SpecificJobPage/SpecificJobPage'));
const Manager = lazy(()=> import('./ManagerPage/ManagerPage'));

// wrapping HOC around pages
const SignInPage = <PageTemplate title="Welcome" page={SignIn} />;
const JobPage = <PageTemplate title="Job History" page={Job} />;
const SpecificJobPage = <PageTemplate title="Job Details" page={SpecificJob} backButtonPath='/jobs' />;
const NotFound404Page = <PageTemplate title="Opps" page={NotFound404} backButtonPath='/jobs' />;
const ManagerPage = <PageTemplate title="My Settings" page={Manager} backButtonPath='jobs' />

export {
  SignInPage,
  JobPage,
  NotFound404Page,
  SpecificJobPage,
  NoLazyJobPage,
  ManagerPage,
  PageTemplate,
};

// delay loading of lazy loaded page
// const NotFound404 = lazy(() => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(import("./NotFound404/NotFound404")), 2000);
//   });
// });
