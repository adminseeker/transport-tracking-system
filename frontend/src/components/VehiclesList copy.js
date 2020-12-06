import React from "react";
import {connect} from "react-redux";
import VehiclesListItem from "./VehiclesListItem";

const VehiclesList = (props)=>(
    <div>
        {
            props.vehicles.map((vehicle)=>{
                return <VehiclesListItem key={vehicle.vehicle_id} vehicle={vehicle}/>
            })
        }
    </div>
);

const mapStateToProps = (state,props)=>(
    {
        vehicles: state.vehicles
    }
)

export default connect(mapStateToProps)(VehiclesList);