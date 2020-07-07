import { createStore, combineReducers, applyMiddleware } from "redux";
import { Beverages } from "./beverages";
import { Bettendorf } from "./bettendorf";
import { Ankeny } from "./ankeny";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({
          beverages: Beverages,
          bettendorfMenu: Bettendorf,
          ankenyMenu: Ankeny,
      }),
        applyMiddleware(thunk, logger)
      );
    return store;
}
