import React, { useEffect } from "react";
import {connect} from "react-redux";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import JourneysList from "./JourneysList";
import {getJourneys} from "../actions/journey";

const JourneyDashboard = ({user,journeys,getJourneys,vehicle_id})=>{
    useEffect(()=>{
        getJourneys(vehicle_id);
    },[getJourneys,vehicle_id]);
    
    
    return (
  
        <div>
            <h1>Journey Dashboard</h1>
            {user.isUpdater===1 &&  <Link to={"/vehicles/"+vehicle_id+"/journeys/add"}>Create Journey</Link>}
            {user.isUpdater===1 && <h2>Journey List</h2>}
            {user.isUpdater===1 && (journeys.length!==0 ? <JourneysList vehicle_id={vehicle_id}/> : <h2>No journey found!!</h2>) }
        </div>
      )
}

const mapStateToProps = (state,props)=>({
    user:state.auth.user,
    journeys:state.journeys,
    vehicle_id:props.match.params.id
})

export default connect(mapStateToProps,{getJourneys})(JourneyDashboard);