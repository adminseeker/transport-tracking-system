import React from "react";
import {Link} from "react-router-dom";

const VehiclesListItem = (props)=>(
    <Link to={"/vehicles/edit/"+props.vehicle.vehicle_id}>
        <div>
            <h3>{props.vehicle.vehicle_name} - {props.vehicle.vehicle_type}- {props.vehicle.vehicle_number}</h3>
        </div>
    </Link>
    
);



export default VehiclesListItem;