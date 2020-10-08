const defaultVehicleState = []

const vehiclesReducer = (state=defaultVehicleState,action)=>{
    switch(action.type){
        case "ADD_VEHICLE":
            return [
                ...state,
                action.vehicle
            ]
        case "EDIT_VEHICLE":
            return state.map((vehicle)=>{
                if(vehicle.vehicle_id === action.id){
                    console.log(vehicle);
                    return {
                        ...vehicle,
                        ...action.updates
                    }
                }else{
                    return vehicle;
                }
            })
        case "REMOVE_VEHICLE":
            return state.filter((vehicle)=>(vehicle.vehicle_id!==action.id));
        case "GET_VEHICLES":
            return action.vehicles;
        case "ERROR":
            return {
                ...state
            }
        default:
            return state;
    }
}

export default vehiclesReducer;