import React from "react";
import JourneysForm from "./JourneysForm";
import {addJourney} from "../actions/journey";
import {connect} from "react-redux";


const AddJourneysPage = (props)=>{
    const vehicle_id = props.match.params.id;
    console.log("hi");
    return(
        <div>
            <JourneysForm onSubmit={async (journey)=>{await props.dispatch(addJourney(journey,vehicle_id))
                props.history.push("/vehicles/"+vehicle_id+"/journeys")
            }}/>
        </div>
    )
}


export default connect()(AddJourneysPage);

