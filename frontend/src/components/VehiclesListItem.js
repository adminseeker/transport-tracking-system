import React from "react";
import {Link} from "react-router-dom";
import { removeVehicles } from "../actions/vehicles";
import { connect } from "react-redux";

const VehiclesListItem = (props)=>(
    <div>
        <Link to={"/vehicles/edit/"+props.vehicle.vehicle_id}>
            <h3>{props.vehicle.vehicle_name} - {props.vehicle.vehicle_type}- {props.vehicle.vehicle_number}</h3>
        </Link>
        <button onClick={async (e)=>{await props.dispatch(removeVehicles(props.vehicle.vehicle_id));}}>Remove</button>
        <Link to={"/vehicles/"+props.vehicle.vehicle_id+"/journeys"}>Manage Journey</Link>
         <Link to={"/vehicles/track/"+props.vehicle.vehicle_id}>Track Vehicle</Link>
    </div>
);



export default connect()(VehiclesListItem);