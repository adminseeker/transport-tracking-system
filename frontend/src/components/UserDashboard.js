import React, { useEffect } from "react";
import {connect} from "react-redux";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import VehiclesList from "./VehiclesList";
import {getVehicles} from "../actions/vehicles";
import {getPassengerJourneys} from "../actions/journey";
import UserJourneyList from "./UserJourneyList";

const UserDashboard = ({user,vehicles,loading,getVehicles,getPassengerJourneys})=>{
        useEffect(()=>{
            getVehicles();
            getPassengerJourneys();
        },[getVehicles,getPassengerJourneys])
    return (
        loading ? <LoadingPage/>        
    :(
        <div>
            <h1>Logged in welcome to Dashboard</h1>
            {user.isUpdater===1 &&  <Link to="/vehicles/add">Add Vehicle</Link>}
            {user.isUpdater===1 && <h2>Vehicles List</h2>}
            {user.isUpdater===1 && <VehiclesList />}
            {user.isUpdater===0 && <UserJourneyList />}
        </div>
    )
      )
}

const mapStateToProps = (state)=>({
    user:state.auth.user,
    loading:state.auth.loading
    
})

export default connect(mapStateToProps,{getVehicles,getPassengerJourneys})(UserDashboard);
