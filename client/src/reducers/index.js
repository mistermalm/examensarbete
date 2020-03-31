import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import flight from './flight';
import weather from './weather';

//this is the root reducer that...
// ...combines all reducers that is put inside the function
export default combineReducers({
  alert,
  auth,
  profile,
  flight,
  weather
});
