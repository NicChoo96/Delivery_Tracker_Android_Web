import defaultState from './defaultState';
import { jobActions } from './actionTypes';
import { parseJobData } from '../utils';
import { CustomReduxAction } from '../types';

const jobListReducer = (state = defaultState, action: CustomReduxAction) => {
  switch (action.type) {
    case jobActions.WRITE_NEW_STATE:
      return [...parseJobData(action.value)];
    default:
      return state;
  }
};

export { jobListReducer };
