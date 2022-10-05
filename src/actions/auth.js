import axios from 'axios';

import {
    createAction,
    USER__LOGIN
} from './action';
import { HEADERS } from '../config/appHeaders';
import { BASE_URL } from '../config/api';

export const user_login = (data) => {
  const encryptData = ''//base64.encode(data.username + ':' + data.password);
  return createAction({
    type: USER__LOGIN,
    action: () => axios.post(`${BASE_URL}/users/login/`,data , {headers: HEADERS.LOGIN(encryptData) })
  });
}