import { createStore, combineReducers, applyMiddleware } from "redux";
import { Beverages } from "./beverages";
import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({
          beverages: Beverages,
          promotions: Promotions,
          leaders: Leaders,
      }),
        applyMiddleware(thunk, logger)
      );
    return store;
}
