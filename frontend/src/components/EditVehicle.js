import React from "react";
import {connect} from "react-redux";
import VehiclesForm from "./VehiclesForm";
import {Link} from "react-router-dom";
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
        vehicle : state.vehicles.filter((vehicle)=>(vehicle.vehicle_id==props.match.params.id))
    }

};


export default connect(mapStateToProps)(EditVehiclePage);

