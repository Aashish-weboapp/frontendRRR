import axios from 'axios';
import { decode as base64_decode, encode as base64_encode } from 'base-64';

import {
    createAction,
    USER__LOGIN
} from './action';
import { HEADERS } from '../config/appHeaders';
import { BASE_URL } from '../config/api';

export const user_login = (data) => {
  const encryptData = base64_encode(data.username + ':' + data.password);
  return createAction({
    type: USER__LOGIN,
    action: () => axios.post(`${BASE_URL}/users/login/`,data , {headers: HEADERS.LOGIN(encryptData) })
  });
}