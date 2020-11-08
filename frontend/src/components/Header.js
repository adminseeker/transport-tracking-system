import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import LoadingPage from "./LoadingPage";

const Header = ({user,isAuthenticated,logout,history}) => {    
    return user==null && isAuthenticated ? <LoadingPage/> : (
            <nav>
                <div>
                {!isAuthenticated && <h1>{<Link to="/">Transport Tracking System</Link>}</h1>}
                {isAuthenticated && <h1>{<Link to="/dashboard">Transport Tracking System</Link>}</h1>}
                <ul>
                    {!isAuthenticated && <li>{<Link to="/login">Login</Link>}</li>}
                    {!isAuthenticated && <li>{<Link to="/Register">Register</Link>}</li>}
                    {isAuthenticated && <li>{<Link to="/dashboard">{user.first_name}</Link>}</li>}
                    {isAuthenticated && <li><button onClick={async(e)=>{await logout(); history.push("/login"); window.location.reload(); }}>Logout</button></li>}
                </ul>
                </div>
            </nav>
    )
}

const mapStateToProps = (state)=>({
    isAuthenticated:state.auth.isAuthenticated,
    user:state.auth.user
})

export default connect(mapStateToProps,{logout})(Header);