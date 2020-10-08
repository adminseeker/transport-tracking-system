import React from "react";
import VehiclesForm from "./VehiclesForm";
import {addVehicle} from "../actions/vehicles";
import {connect} from "react-redux";


const AddVehiclesPage = (props)=>{
    return(
        <div>
            <VehiclesForm onSubmit={async (vehicle)=>{await props.dispatch(addVehicle(vehicle))
                props.history.push("/dashboard")
            }}/>
        </div>
    )
}


export default connect()(AddVehiclesPage);

