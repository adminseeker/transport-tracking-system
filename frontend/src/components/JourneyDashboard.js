import React, { useEffect } from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import JourneysList from "./JourneysList";
import {getJourneys} from "../actions/journey";

const JourneyDashboard = ({user,journeys,getJourneys,vehicle_id})=>{
    useEffect(()=>{
        getJourneys(vehicle_id);
    },[getJourneys,vehicle_id]);
    
    
    return (
  
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            {user.isUpdater===1 && <h2>Journey List</h2>}
            {user.isUpdater===1 && (<JourneysList vehicle_id={vehicle_id}/> ) }
        </div>
      )
}

const mapStateToProps = (state,props)=>({
    user:state.auth.user,
    journeys:state.journeys,
    vehicle_id:props.match.params.id
})

export default connect(mapStateToProps,{getJourneys})(JourneyDashboard);