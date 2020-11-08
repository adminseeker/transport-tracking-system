const defaultLocationState = []

const locationReducer = (state=defaultLocationState,action)=>{
    switch(action.type){
        case "GET_LOCATION":
            return action.location;
        case "ERROR":
            return {
                ...state
            }
        default:
            return state;
    }
}

export default locationReducer;