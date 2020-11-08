import React from "react";
import {Link} from "react-router-dom";
import { removeJourney } from "../actions/journey";
import moment from "moment";
import { connect } from "react-redux";

const JourneysListItem = (props)=>{
    const vehicle_id = props.vehicle_id;    
    return (
    <div>
        <Link to={"/journeys/edit/"+props.journey.id}>
            <h3>{props.journey.starting_point} - {props.journey.destination}- {moment(props.journey.start_time).format('MMMM Do YYYY, h:mm:ss a')}</h3>
        </Link>
        <button onClick={async (e)=>{await props.dispatch(removeJourney(vehicle_id,props.journey.id));}}>Remove</button>
        <Link to={"/vehicles/"+vehicle_id+"/journeys/"+props.journey.id+"/passengers"}>Manage Passengers</Link>
    </div>
    );
}



export default connect()(JourneysListItem);