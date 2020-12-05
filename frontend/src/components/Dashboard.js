import React from "react";
import {connect} from "react-redux";
import LoadingPage from "./LoadingPage";
import UserDashboard from "./UserDashboard";
import UpdaterDashboard from "./UpdaterDashboard";
import FacebookCircularProgress from "./FacebookCircularProgress";

const Dashboard = ({user,loading})=>{
    return (
        user==null ? <FacebookCircularProgress />        
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
    loading:state.auth.loading
})

export default connect(mapStateToProps)(Dashboard);