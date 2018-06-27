import { combineReducers } from 'redux';
import TicketsReducer from './tickets';

const rootReducer = combineReducers({
  tickets: TicketsReducer
});

export default rootReducer;
