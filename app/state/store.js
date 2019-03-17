import { createStore } from 'redux';
import rootReducer from './ducks';
import middleware from './middleware';

export const configureStore = () => createStore(rootReducer, middleware);
