import { createStore } from "redux";
import { jobListReducer } from "./reducers";
import defaultState from "./defaultState";

const store = createStore(
  jobListReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace: true})
);

// const stateChangeHandler = () => console.log(store.getState());
// store.subscribe(stateChangeHandler);

export { store };
