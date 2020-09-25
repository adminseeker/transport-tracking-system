import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import alertReducer from "../reducers/alert";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store = createStore(
        combineReducers({
          auth: authReducer,
          alert:alertReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
};
