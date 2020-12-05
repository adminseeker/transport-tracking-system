const defaultLocationState = []

const locationReducer = (state=defaultLocationState,action)=>{
    switch(action.type){
        case "GET_LOCATION":
            return action.location;
        case "TRACKING_ERROR":
            return {
                ...state
            }
        case "LOGOUT":
            return []
        default:
            return state;
    }
}

export default locationReducer;