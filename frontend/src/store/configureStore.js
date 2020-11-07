import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import alertReducer from "../reducers/alert";
import vehiclesReducer from "../reducers/vehicles";
import journeysReducer from "../reducers/journey";
import passengersReducer from "../reducers/passengers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store = createStore(
        combineReducers({
          auth: authReducer,
          alert:alertReducer,
          vehicles:vehiclesReducer,
          journeys:journeysReducer,
          passengers:passengersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
};
