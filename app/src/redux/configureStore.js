import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Beverages } from './beverages'
import { Bettendorf } from './bettendorf'
import { Ankeny } from './ankeny'
import { Update } from './update'

export const ConfigureStore = () => {
  return createStore(
    combineReducers({
      beverages: Beverages,
      bettendorfMenu: Bettendorf,
      ankenyMenu: Ankeny,
      update: Update,
    }),
    applyMiddleware(thunk, logger),
  );
};
