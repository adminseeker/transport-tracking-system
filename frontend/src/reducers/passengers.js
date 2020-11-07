const defaultPassengerState = []

const passengersReducer = (state=defaultPassengerState,action)=>{
    switch(action.type){
        case "GET_PASSENGERS":
            return action.passengers;
        case "ERROR":
            return {
                ...state
            }
        default:
            return state;
    }
}

export default passengersReducer;