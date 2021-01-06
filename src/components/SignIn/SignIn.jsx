import React, { useState, useRef, useEffect } from 'react';
import './SignIn.scss';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { withFirebase } from '../../Firebase';
import { history } from '../../utils';
import { loginFailureEasterEgg } from '../../constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


/**
 * This component will render the SignIn component for existing users to input their email and password
 * @category UI Component
 * @subcategory SignIn
 * @Class SignIn
 * @param {Firebase} firebase CRUD interface to communiate with firebase backend service
 * @param {function} toggleShowSignIn toggles which to show between SignIn and SignUp
 * @return {ReactComponent}
 */
function SignIn({ firebase, toggleShowSignIn }) {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const [signinFailureCounter, setSigninFailureCounter] = useState(0);
  const [signinFailureMessages] = useState(loginFailureEasterEgg);
  const [brandingMessage, setBrandingMessage] = useState(
    'Please login or signup for an account.'
  );

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    if (firebase === null) return;

    firebase.auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        history.push('/jobs');
      }
    });
  }, [firebase]);

  const handleChange = (event) => {
    event.preventDefault();
    // do nothing
  };

  const signUpHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // change to signup component
    toggleShowSignIn(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .signIn(usernameInputRef.current.value, passwordInputRef.current.value)
      .then(() => {
        // routing away from the signin page when success
        setErrorMessage(null);
        history.push('/jobs');
      })
      .catch((exception) => {
        console.error(exception);

        // setting easter egs
        setBrandingMessage(
          signinFailureMessages[
          signinFailureCounter % signinFailureMessages.length
          ]
        );
        setSigninFailureCounter((state) => state + 1);

        // displaying error alert based on error received from firebase
        switch (exception.code) {
          case 'auth/invalid-email':
            setErrorMessage('Invalid email');
            break;
          case 'auth/user-not-found':
            setErrorMessage('No such user exist');
            break;
          default:
            setErrorMessage('Invalid username and password combination');
            break;
        }
      });
  };

  return (
    <Container maxWidth="md">
      <Grid container justify="center" alignItems="center">
        <Grid item md={5}>
          <div className="signin__branding">
            <span component="p" className="signin__branding-header">
              Trackee Co.
            </span>
            <span component="p" className="signin__branding-message">
              {brandingMessage}
            </span>
          </div>

          <form onSubmit={handleSubmit} onChange={handleChange} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="signin_username"
              label="Email"
              name="Email"
              autoComplete="email"
              autoFocus
              inputRef={usernameInputRef}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="signin_password"
              autoComplete="current-password"
              inputRef={passwordInputRef}
            />
            <span className="signin__submit-btn-group">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Button
                onClick={signUpHandler}
                variant="outlined"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </span>
            {errorMessage != null ? (
              <Alert severity="error">{errorMessage}</Alert>
            ) : (
                <span></span>
              )}
          </form>
          <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://material-ui.com/">
                CZ3003 - SSP1 - Staizen
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withFirebase(SignIn);
