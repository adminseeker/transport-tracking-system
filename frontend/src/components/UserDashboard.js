import React from "react";
import {connect} from "react-redux";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import VehiclesList from "./VehiclesList";
import {getVehicles} from "../actions/vehicles";
import {getPassengerJourneys} from "../actions/journey";
import UserJourneyList from "./UserJourneyList";
import useSWR from "swr";

const UserDashboard = ({user,vehicles,getVehicles,getPassengerJourneys})=>{
        useSWR("/dashboard",()=>{

      
                getPassengerJourneys();
     
        });
    return (
        user==null ? <LoadingPage/>        
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
    
})

export default connect(mapStateToProps,{getVehicles,getPassengerJourneys})(UserDashboard);
