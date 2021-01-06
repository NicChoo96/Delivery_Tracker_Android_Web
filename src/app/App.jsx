import React, { useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { Navbar } from '../components';
import { history } from '../utils';

import './App.scss';
import 'sanitize.css';

import {
  NoLazyJobPage as JobPage,
  SignInPage,
  NotFound404Page,
  SpecificJobPage,
  ManagerPage,
} from '../pages';

/**
 * The highest React component in the hierachy tree
 * @category UI Component
 * @subcategory General
 * @class App
 * @param {Firebase} firebase CRUD interface to communiate with firebase backend service
 * @return {ReactComponent}
 */
const App = ({ firebase }) => {
  useEffect(() => {
    firebase.auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        history.push('/signin');
      } else {
        history.push('/jobs');
      }
    });
  }, [firebase.auth]);

  return (
      <Router history={history}>
        <Switch>
          <Route path="/jobs/:jobID">
            <Navbar tabValue={0} Page={SpecificJobPage} />
          </Route>
          <Route path="/jobs">
            <Navbar tabValue={0} Page={JobPage} />
          </Route>
          <Route path="/profile">
            <Navbar tabValue={1} Page={ManagerPage} />
          </Route>
          <Route path="/signin">
            <Navbar tabValue={1} Page={SignInPage} />
          </Route>
          <Route exact path="/">
            <Redirect to="/signin" />
          </Route>
          <Route>
            <Navbar Page={NotFound404Page} />
          </Route>
        </Switch>
      </Router>
  );
};

export default withFirebase(App);
