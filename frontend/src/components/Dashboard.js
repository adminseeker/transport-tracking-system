import React, { useEffect } from "react";
import {connect} from "react-redux";
import LoadingPage from "./LoadingPage";

const Dashboard = ({getRooms,user})=>{
      return (
      user==null ? <LoadingPage/>        
    :(
        <div>
            <h1>Logged in welcome to Dashboard</h1>
        </div>
    )
      )
}

const mapStateToProps = (state)=>({
    user:state.auth.user
})

export default connect(mapStateToProps)(Dashboard);