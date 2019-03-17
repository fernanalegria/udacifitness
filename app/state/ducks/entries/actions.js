import * as types from './types';
import {
  submitEntry,
  removeEntry,
  fetchCalendarResults
} from '../../../server/api';
import { helpers } from '../../utils';

const receiveEntries = entries => ({
  type: types.RECEIVE_ENTRIES,
  entries
});

const addEntry = (key, entry) => ({
  type: types.ADD_ENTRY,
  key,
  entry
});

export const handleAddEntry = (key, entry) => dispatch =>
  submitEntry(key, entry).then(() => {
    dispatch(addEntry(key, entry));
  });

export const handleRemoveEntry = key => dispatch =>
  removeEntry(key).then(() => {
    dispatch(addEntry(key, helpers.getDailyReminderValue()));
  });

export const handleReceiveEntries = () => dispatch =>
  fetchCalendarResults().then(results => {
    dispatch(receiveEntries(results));
  });
