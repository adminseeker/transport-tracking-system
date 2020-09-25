import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import createHistory from "history/createBrowserHistory"
import Landing from "../components/Landing";
import Register from "../components/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import Login from "../components/Login";

const history = createHistory();

const AppRouter = ()=>{
    return(
        <Router history={history}>
            <Header history={history}/>
            <Switch>
                <Route path="/" component={Landing} exact={true}/>
                <Route path="/login" component={Login} exact={true} />
                <Route path="/register" component={Register} exact={true} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
        </Router>
    )
}

export default AppRouter;