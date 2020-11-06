import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import alertReducer from "../reducers/alert";
import vehiclesReducer from "../reducers/vehicles";
import journeysReducer from "../reducers/journey";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store = createStore(
        combineReducers({
          auth: authReducer,
          alert:alertReducer,
          vehicles:vehiclesReducer,
          journeys:journeysReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
};
