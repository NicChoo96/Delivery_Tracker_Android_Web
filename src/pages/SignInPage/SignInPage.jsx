import React, { useState } from 'react';
import {} from '../../redux/actionCreators';
import './SignInPage.scss';
import { SignIn, SignUp } from '../../components';

/**
 * This component will toggle and render between SignIn or SignUp components
 * @category Page
 * @class SignInPage
 * @return {ReactComponent}
 */
const SignInPage = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div className="signin-page">
      {showSignIn ? (
          <SignIn toggleShowSignIn={setShowSignIn} />
      ) : (
          <SignUp toggleShowSignIn={setShowSignIn} />
      )}
    </div>
  );
};

export default SignInPage;
