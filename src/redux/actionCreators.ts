import { jobActions } from './actionTypes';
import { CustomReduxAction } from '../types';

const writeNewState = (value: any) : CustomReduxAction => {
  return {
    type: jobActions.WRITE_NEW_STATE,
    value: value,
  };
};

export { writeNewState };
