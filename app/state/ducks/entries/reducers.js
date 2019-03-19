import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer({})({
  [types.RECEIVE_ENTRIES]: (state, action) => ({
    ...state,
    ...action.entries
  }),
  [types.ADD_ENTRY]: (state, action) => ({
    ...state,
    [action.key]: action.entry
  })
});
