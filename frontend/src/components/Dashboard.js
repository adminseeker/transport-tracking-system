import React from "react";
import {connect} from "react-redux";
import LoadingPage from "./LoadingPage";
import UserDashboard from "./UserDashboard";
import UpdaterDashboard from "./UpdaterDashboard";

const Dashboard = ({user})=>{
    return (
        user==null ? <LoadingPage/>        
    :(
        <div>
            {user.isUpdater===0 &&  <UserDashboard />}
            {user.isUpdater===1 && <UpdaterDashboard />}
        </div>
    )
      )
}

const mapStateToProps = (state)=>({
    user:state.auth.user,
})

export default connect(mapStateToProps)(Dashboard);