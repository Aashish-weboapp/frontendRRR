import axios from 'axios';

import {
    createAction,
    GET__LOOKUP,
    GET__MENU,GET__MENU__LISTS,
    GET__LISTS,GET__LIST__DATA,
    GET__COLUMNS,
    GET__FORMS,GET__FORM__DATA,
    GET__FIELDS,
    GET__COUNTRIES,
    GET__COUNTRY__DATA,
    POST__COUNTRY__DATA

} from './action';
import { HEADERS } from '../config/appHeaders';
import { BASE_URL } from '../config/api';

//get all lookup list
export const getLookups = (url,filters) => {
  return createAction({
    type: GET__LOOKUP,
    action: async () => await axios.get(`${BASE_URL}/${url}/${filters}`,{ data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get all menus list
export const getMenus = (filters) => {
  return createAction({
    type: GET__MENU,
    action: async () => await axios.get(`${BASE_URL}/menus${filters}`,{ data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get all lists list
export const getMenuLists = (filters) => {
  return createAction({
    type: GET__MENU__LISTS,
    action: async () => await axios.get(`${BASE_URL}/lists${filters}`,{ data: {}, headers: HEADERS.AUTHENTIC() })
  });
}


//get all columns list
export const getListColumns = (list_id) => {
  return createAction({
    type: GET__COLUMNS,
    action: () => axios.get(`${BASE_URL}/lists/${list_id}/columns/`,{ data: {}, headers: HEADERS.AUTHENTIC() }) 
  });
}

//get all columns list
export const getColumns = (filters) => {
  return createAction({
    type: GET__COLUMNS,
    action: () => axios.get(`${BASE_URL}/columns${filters}`,{ data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get all form list
export const getForms = (filters) => {
  return createAction({
    type: GET__FORMS,
    action: async () => await axios.get(`${BASE_URL}/forms${filters}`,{ data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get all form list
export const getFormData = (form_id) => {
  return createAction({
    type: GET__FORM__DATA,
    action: async () => await axios.get(`${BASE_URL}/forms/${form_id}`,{ data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get all fields list
export const getFields = (filters) => {
  return createAction({
    type: GET__FIELDS,
    action: () => axios.get(`${BASE_URL}/fields${filters}`,{ data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get all countries list
export const getCountries = (filters) => {
  return createAction({
    type: GET__COUNTRIES,
    action: () => axios.get(`${BASE_URL}/countries${filters}`,{ data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get country data
export const createCountry = (country) => {
  return createAction({
    type: POST__COUNTRY__DATA,
    action: () => axios.post(`${BASE_URL}/countries/`,country,{ headers: HEADERS.AUTHENTIC() })
  });
}

//get country data
export const getCountryData = (countryID) => {
  return createAction({
    type: GET__COUNTRY__DATA,
    action: () => axios.get(`${BASE_URL}/countries/${countryID}/`,{ data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get all lists list
export const getLists = (filters) => {
  return createAction({
    type: GET__LISTS,
    action: async () => await axios.get(`${BASE_URL}/lists${filters}`,{ data: {}, headers: HEADERS.AUTHENTIC() })
  });
}

//get all lists data
export const getListData = (list_id) => {
  return createAction({
    type: GET__LIST__DATA,
    action: async () => await axios.get(`${BASE_URL}/lists/${list_id}`,{ data: {}, headers: HEADERS.AUTHENTIC() })
  });
}