import React, { useRef, useEffect, useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useObjectVal } from 'react-firebase-hooks/database';
import { withFirebase } from '../../Firebase';

import "./ManagerSettings.scss";

/**
 * This is a form for the manager to change his settings like name or contract number
 * @category UI Component
 * @subcategory General
 * @class MangerSettings
 * @param {Firebase} firebase CRUD interface to communiate with firebase backend service
 * @return {ReactComponent}
 */
function ManagerSettings({ firebase }) {
  const ALERT_HIDE_TIMINNG = 2_000;

  // DOM references for input
  const managerNameInputRef = useRef(null);
  const managerPhoneInputRef = useRef(null);

  // the referene value will be binded to the state
  const [formManagerName, setFormManagerName] = useState('');
  const [formManagerPhone, setFormManagerPhone] = useState('');

  // Alert message that uses an object {message, status}
  const [alert, setAlert] = useState();

  // reactive current manager details
  const [managerDetailSnapshot, loading] = useObjectVal(firebase.getCurrentManagerDetails());

  // submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase.setCurrentManagerDetails(formManagerName, formManagerPhone)
      .then(() => {
        setAlert({ message: 'Settings Saved', status: 'success' });
        setTimeout(() => setAlert(), ALERT_HIDE_TIMINNG);
      })
      .catch((exception) => setAlert({ message: exception.message, status: 'error' }));
  };

  // update state when input value changed based on input
  const handleChange = (stateSetter) => (inputRef) => (event) => {
    event.preventDefault();
    event.stopPropagation();

    switch (inputRef) {
      case managerPhoneInputRef:
        // only allow number to have up to 8 digits
        // not a very strict check tbh lol
        const numberPattern = /^\d{0,8}$/;
        if (!inputRef.current.value.match(numberPattern))
          return;
        break;
      default:
        break;
    }

    stateSetter(inputRef.current.value);
  }

  // fill form input with firebase
  const resetForm = useCallback((event) => {
    // since this function is not necessarily a handler,
    // we can do some handler specific effects here
    if (event) {
      event.preventDefault();
      event.stopPropagation();

      setAlert({ status: 'info', message: 'Changes discarded' });
      setTimeout(() => setAlert(), ALERT_HIDE_TIMINNG)
    }

    // if the manager snapshot is populated,
    // we can set the values to what we have in the database
    if (managerDetailSnapshot && !loading) {
      const managerDetails = managerDetailSnapshot;
      setFormManagerName(managerDetails.name);
      setFormManagerPhone(managerDetails.phoneNo);
    }
  }, [managerDetailSnapshot, loading]);

  // set form to default values when component first mounts
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  // display a welcome message onMount
  useEffect(() => {
    setAlert({ message: 'Hello, new manager', status: 'info' });
  }, []);

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="Email"
          label="Email"
          id="manager_email"
          value={firebase.auth.currentUser.email}
          disabled={true}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="Name"
          label="Name"
          id="manager_name"
          onChange={handleChange(setFormManagerName)(managerNameInputRef)}
          value={formManagerName}
          inputRef={managerNameInputRef}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="phoneNumber"
          label="Phone Number"
          id="manager_phone_no"
          onChange={handleChange(setFormManagerPhone)(managerPhoneInputRef)}
          value={formManagerPhone}
          inputRef={managerPhoneInputRef}
        />
        <span className="manager-settings__submit-btn-group">
          <Button type="submit" variant="contained" color="primary" >
            Save
          </Button>
          <Button onClick={resetForm} variant="contained" color="secondary" >
            Discard
          </Button>
        </span>


        {alert ? (<>
          <br />
          <Alert severity={alert.status}>{alert.message}</Alert>
        </>) : (
            <span></span>
          )}
      </form>
    </Container>
  );
}

export default withFirebase(ManagerSettings);
