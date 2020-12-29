import React, { useEffect } from "react";
import {connect} from "react-redux";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import VehiclesList from "./VehiclesList";
import {getVehicles} from "../actions/vehicles";
import {getPassengerJourneys} from "../actions/journey";
import UserJourneyList from "./UserJourneyList";
import FacebookCircularProgress from "./FacebookCircularProgress";
import { Typography } from "@material-ui/core";
import PassengerJoin from "./PassengerJoin";

const UserDashboard = ({user,vehicles,loading,getVehicles,getPassengerJourneys})=>{
        useEffect(()=>{
            getVehicles();
            getPassengerJourneys();
        },[getVehicles,getPassengerJourneys])
    return (
        loading ? <FacebookCircularProgress />       
    :(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"3rem"}}>
            <Typography variant="h4" style={{marginBottom:"2rem"}}>
                Journey List
            </Typography>
            <UserJourneyList />
        <PassengerJoin />

        </div>
    )
      )
}

const mapStateToProps = (state)=>({
    user:state.auth.user,
    loading:state.auth.loading
    
})

export default connect(mapStateToProps,{getVehicles,getPassengerJourneys})(UserDashboard);
