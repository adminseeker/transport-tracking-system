import React from "react";
import {Link} from "react-router-dom";
import { removePassenger} from "../actions/passengers";
import { connect } from "react-redux";

const PassengerListItem = (props)=>{
    const vehicle_id = props.vehicle_id;    
    const journey_id = props.journey_id;    
    return (
    <div>
        <Link to={"/vehicles/"+vehicle_id+"/journeys/"+journey_id+"/passengers/"+props.passenger.user_id}>
            <h3>{props.passenger.first_name}  {props.passenger.last_name}</h3>
        </Link>
        <button onClick={async (e)=>{await props.dispatch(removePassenger(vehicle_id,journey_id,props.passenger.user_id));}}>Remove</button>
    </div>
    );
}



export default connect()(PassengerListItem);