const defaultJourneyState = []

const journeysReducer = (state=defaultJourneyState,action)=>{
    switch(action.type){
        case "ADD_JOURNEY":
            return [
                ...state,
                action.journey
            ]
        case "EDIT_JOURNEY":
            return state.map((journey)=>{
                if(journey.journey_id === action.id){
                    console.log(journey);
                    return {
                        ...journey,
                        ...action.updates
                    }
                }else{
                    return journey;
                }
            })
        case "REMOVE_JOURNEY":
            return state.filter((journey)=>(journey.journey_id!==action.id));
        case "GET_JOURNEYS":
            return action.journeys;
        case "ERROR":
            return {
                ...state
            }
        case "LOGOUT":
            return []
        default:
            return state;
    }
}

export default journeysReducer;