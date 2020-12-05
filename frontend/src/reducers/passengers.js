const defaultPassengerState = []

const passengersReducer = (state=defaultPassengerState,action)=>{
    switch(action.type){
        case "GET_PASSENGERS":
            return action.passengers;
        case "PASSENGERS_ERROR":
            return {
                ...state
            }
        case "LOGOUT":
            return []
        default:
            return state;
    }
}

export default passengersReducer;