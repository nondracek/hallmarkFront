import { Platform } from 'react-native';

const API = Platform.OS === 'android'
  ? 'https://merlin-mobile.herokuapp.com' // works for Genymotion
  : 'https://merlin-mobile.herokuapp.com';

export const apiMiddleware = store => next => action => {
  // Pass all actions through by default
  next(action);
  switch (action.type) {
    // In case we receive an action to send an API request
    case 'GET_MEASURE_DATA':

      // Dispatch GET_MEASURE_DATA_LOADING to update loading state
      store.dispatch({type: 'GET_MEASURE_DATA_LOADING'});
      // Make API call and dispatch appropriate actions when done
      fetch(`${API}/data`)
        .then(response => {
            return response.json()
          }
        )
        .then(data => {
          next({
          type: 'GET_MEASURE_DATA_RECEIVED',
          data
        })})
        .catch(error => next({
          type: 'GET_MEASURE_DATA_ERROR',
          error
        }));
      break;
    case 'GET_USER_DATA':

      // Dispatch GET_MEASURE_DATA_LOADING to update loading state
      store.dispatch({type: 'GET_MEASURE_DATA_LOADING'});
      // Make API call and dispatch appropriate actions when done
      fetch(`${API}/pins`)
        .then(response => {
            return response.json()
          }
        )
        .then(data => {
          next({
          type: 'GET_USER_DATA_RECEIVED',
          data
        })})
        .catch(error => next({
          type: 'GET_MEASURE_DATA_ERROR',
          error
        }));
      break;

    // Do nothing if the action does not interest us
    default:
      break;
  }
};

export const reducer = (state = { Data: [], userData: [], loading: true }, action) => {
  switch (action.type) {
    case 'GET_MEASURE_DATA_LOADING':
      return {
        ...state,                   // keep the existing state,
        loading: true,              // but change loading to true
      };
    case 'GET_MEASURE_DATA_RECEIVED':
      return {
        ...state,
        loading: false,             // set loading to false
        Data: action.data,
      };
    case 'GET_USER_DATA_RECEIVED':
      return {
        ...state,
        loading: false,
        userData: action.data.userData,
      };
    default:
      return state;
    }
};
