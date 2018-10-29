import {GET_DATA} from '../action/data.action';

export default function(state = [], action) {
  switch (action.type) {
    case GET_DATA:
      return action.payload;
    default:
      return state;
  }
}