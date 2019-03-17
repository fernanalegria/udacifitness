import * as types from './types';

export const receiveEntries = entries => ({
  type: types.RECEIVE_ENTRIES,
  entries
});

export const addEntry = entry => ({
  type: types.ADD_ENTRY,
  entry
});
