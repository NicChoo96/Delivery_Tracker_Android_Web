import React, { useEffect, useState, Suspense } from 'react';
import { Paper, Tabs, Tab, Button } from '@material-ui/core';
import { withFirebase } from '../../Firebase';
import { history } from '../../utils';
import Loader from '../Loader/Loader';

import './Navbar.scss';

/**
 * Renders a suggested route based on an array of coordinates
 * @category UI Component
 * @subcategory General
 * @class NarBar
 * @param {Firebase} firebase CRUD interface to communiate with firebase backend service
 * @param {number} tabValue position of the page in the tab menu
 * @param {ReactComponent} react component to render
 * @return {ReactComponent}
 */
const NarBar = ({ firebase, tabValue = 0, Page }) => {
  const [disabled, setDisabled] = useState(true);

  const logOutHandler = (event) => {
    event.preventDefault();
    firebase.signOut();
    console.log('user signed out');
    history.push('/signin');
  };

  // woo using currying for the first time in ma life ever
  const redirectHandler = (url) => (event) => {
    event.preventDefault();
    history.push(url);
  };

  useEffect(() => {
    if (firebase === null) return;

    firebase.auth.onAuthStateChanged((userAuth) => {
      setDisabled(userAuth ? false : true);
    });
  });

  return (
    <>
      <Paper square className="navbar__wrapper">
        <span className="navbar__app-label">
          <img
            className="navbar__app-icon"
            alt="trackee icon"
            src={process.env.PUBLIC_URL + '/image/headerLogo.png'}
          />
        </span>
        <Tabs value={tabValue} indicatorColor="primary" textColor="primary">
          <Tab
            disabled={disabled}
            label="Home"
            className="navbar__nav-link"
            onClick={redirectHandler('/jobs')}
          />
          <Tab
            disabled={disabled}
            label="Profile"
            className="navbar__nav-link"
            onClick={redirectHandler('/profile')}
          />
        </Tabs>
        <span className="navbar__signout">
          <Button disabled={disabled} onClick={logOutHandler}>
            Logout
          </Button>
        </span>
      </Paper>
      <Suspense fallback={Loader()}>
        <div>{Page}</div>
      </Suspense>
    </>
  );
};

export default withFirebase(NarBar);
