import { combineReducers } from 'redux';
import appData from './app';
import sysData from './system';

export default function createReducer(){
return combineReducers({
    appData , sysData
    });
}