import React from 'react';
const FirebaseContext = React.createContext(null);

/**
 * Higher Order Component to wrap component so it can access the Firebase Interface Object instance
 *
 * @category Firebase
 * @class FirebaseContext
 * @param {ReactComponent} Component Any Component or Page that requires firebase access
 */
export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
