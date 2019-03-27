import * as types from './types';
import {
  submitEntry,
  removeEntry,
  fetchCalendarResults
} from '../../../server/api';
import { getDailyReminderValue, timeToString } from 'utils/helpers';

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
    dispatch(
      addEntry(key, key === timeToString() ? getDailyReminderValue() : null )
    );
  });

export const handleReceiveEntries = () => dispatch =>
  fetchCalendarResults().then(results => {
    const key = timeToString();
    if (!results[key]) {
      results[key] = getDailyReminderValue();
    }
    dispatch(receiveEntries(results));
  });
