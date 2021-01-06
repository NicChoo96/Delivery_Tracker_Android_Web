import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import './NotFound404.scss';

/**
 * 404 page
 * @category Page
 * @class NotFound404
 * @return {ReactComponent}
 */
const NotFound404 = () => {

  return (
    <div className="not-found-page__wrapper">
      <Alert severity="error">
        <span className="not-found-page__error-code">Error code: 404</span>
        <br />
        Resource not found, the link that got you here might be broken.
        <br />
        <br />
        Click <Link to="/">here</Link> to return to the home page.
      </Alert>
    </div>
  );
};

export default NotFound404;
