import axios from 'axios';

export const GET_DATA = 'GET_DATA';

const API_URL = process.env.REACT_APP_API_URL;

function getDataCreator(response) {
  return {
    type: GET_DATA,
    payload: response
  }
}

export function getData() {
  return dispatch => {
    axios.get(`${API_URL}/data`)
      .then(res => {
        dispatch(getDataCreator(res.data));
      });
  };
}