import User from './User'
import {combineReducers} from 'redux';
import {persist} from './../persist';
const numberPersistConfig = {
  key: "persistedStore"
};
const allReducers= combineReducers({
  persistedStore: persist(numberPersistConfig,User)
  //notPersistedStore: messageReducer
});
export default allReducers;
