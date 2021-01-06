import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/App.jsx';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './Firebase';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={Firebase}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
