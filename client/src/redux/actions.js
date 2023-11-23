import axios from "axios";

export const BUSCA_DRIVERS = 'BUSCA_DRIVERS';
export const GET_DRIVERS = 'GET_DRIVERS';
export const FILTER_ORIGIN = 'FILTER_ORIGIN';
export const RESET_ALL = 'RESET_ALL';
export const SET_ERROR = 'SET_ERROR';
export const GET_TEAMS = 'GET_TEAMS';
export const ORDER = 'ORDER';
export const FILTER_BY_TEAMS = 'FILTER_BY_TEAMS';

export const getDrivers = () => async (dispatch) => {
  try {
    const response = await axios("http://localhost:3001/drivers");
    return dispatch({
      type: 'GET_DRIVERS',
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const orderDrivers = (orderType) => ({
  type: ORDER,
  payload: orderType,
});

export const getTeams = () => async (dispatch) => {
  try {
    const response = await axios("http://localhost:3001/teams");
    return dispatch({
      type: GET_TEAMS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const filterTeams = (team) => ({
  type: FILTER_BY_TEAMS,
  payload: team,
});

export const reset = () => ({
  type: RESET_ALL,
});

export const filterOrigin = (origin) => ({
  type: FILTER_ORIGIN,
  payload: origin
});



export const searchDrivers = (name, buscados) => ({
  type: BUSCA_DRIVERS,
  payload: { name, buscados },
});

export const setError = (errorMessage) => ({
  type: 'SET_ERROR',
  payload: errorMessage,
});
