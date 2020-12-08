import React from "react";
import {connect} from "react-redux";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import VehiclesList from "./VehiclesList";
import {getVehicles} from "../actions/vehicles";
import {getPassengerJourneys} from "../actions/journey";
import UserJourneyList from "./UserJourneyList";
import useSWR from "swr";
import FacebookCircularProgress from "./FacebookCircularProgress";

const UpdaterDashboard = ({user,vehicles,getVehicles,getPassengerJourneys,loading})=>{
        useSWR("/dashboard",()=>{
          
                getVehicles();
          
        });
    return (
        loading ? <FacebookCircularProgress />       
    :(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            {user.isUpdater===1 && <h2>Vehicles</h2>}
            {user.isUpdater===1 && <VehiclesList />}
            {user.isUpdater===0 && <UserJourneyList />}
        </div>
    )
      )
}

const mapStateToProps = (state)=>({
    user:state.auth.user,
    vehicles:state.vehicles,
    loading:state.auth.loading
})

export default connect(mapStateToProps,{getVehicles,getPassengerJourneys})(UpdaterDashboard);

