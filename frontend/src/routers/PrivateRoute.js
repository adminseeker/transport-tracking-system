import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component:Component, isAuthenticated,loading,...rest}) => {
    return (
        <Route {...rest} render={(props)=>(
                (!isAuthenticated && !loading) ? ( 
                    <Redirect to="/login"/> 
                    ) : (
                        <Component  {...props}/>
                    )
                
        )} />
    )
}

const mapStateToProps = (state)=>({
    isAuthenticated:state.auth.isAuthenticated,
    loading:state.loading
})

export default connect(mapStateToProps)(PrivateRoute);