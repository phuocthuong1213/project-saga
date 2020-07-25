import { combineReducers } from 'redux';
import taskReducer from './task';
const rootReducers = combineReducers({
  task: taskReducer,
});

export default rootReducers;
