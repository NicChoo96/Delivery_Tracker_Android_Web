import React, { useState, useRef } from 'react';
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
 * @Class SignUp
 * @param {Firebase} firebase CRUD interface to communiate with firebase backend service
 * @param {function} toggleShowSignIn toggles which to show between SignIn and SignUp
 * @return {ReactComponent}
 */
function SignUp({ firebase, toggleShowSignIn }) {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const handleChange = (event) => {
    event.preventDefault();
    // do nothing
  };

  const backToSignIn = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // change back to signin component
    toggleShowSignIn(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const PasswordMatch = passwordInputRef.current.value === confirmPasswordInputRef.current.value;

    setErrorMessage(PasswordMatch ? null : 'Password Do Not Match');

    // storing data in firebase and email validation
    firebase.signUp(
      usernameInputRef.current.value,
      passwordInputRef.current.value
    ).then(() => {
      // routing away from the signup page when success
      setErrorMessage(null);
    }).catch((exception) => {
      console.error(exception)
      switch (exception.code) {
        case "auth/weak-password":
          setErrorMessage('Password should be at least 6 characters');
          break;
        case "auth/invalid-email":
          setErrorMessage('Invalid Email');
          break;
        case "auth/email-already-in-use":
          setErrorMessage('Email already in used');
          break;
        default:
          setErrorMessage(`${exception.code} : ${exception.message}`);
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
              {`It's quick and easy.`}
            </span>
          </div>

          <form onSubmit={handleSubmit} onChange={handleChange} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="signup_username"
              label="Email"
              name="Email"
              type="email"
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
              id="signup_password"
              inputRef={passwordInputRef}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm password"
              label="Confirm Password"
              type="password"
              id="signup_password_confirmation"
              inputRef={confirmPasswordInputRef}
            />

            <span className="signin__submit-btn-group">
              <Button
                onClick={backToSignIn}
                variant="outlined"
                color="primary"
                className={classes.submit}
              >
                back to Sign In
              </Button>
              <Button
                type="submit"
                variant="contained"
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

export default withFirebase(SignUp);
