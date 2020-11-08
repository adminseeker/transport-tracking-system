import React from "react";
import {connect} from "react-redux";
import VehiclesForm from "./VehiclesForm";
import {editVehicles} from "../actions/vehicles";


const EditVehiclePage = (props)=>{
    return(
        <div>
            <VehiclesForm vehicle={props.vehicle[0]} onSubmit={async (updates)=>{await props.dispatch(editVehicles(updates,props.vehicle[0].vehicle_id)); props.history.push("/dashboard")}}/>
        </div>
    )
}

const mapStateToProps = (state,props)=>{
    return{
        vehicle : state.vehicles.filter((vehicle)=>(String(vehicle.vehicle_id)===String(props.match.params.id)))
    }

};


export default connect(mapStateToProps)(EditVehiclePage);

