import React from "react";
import {connect} from "react-redux";
import JourneysForm from "./JourneysForm";
import {Link} from "react-router-dom";
import {editJourney} from "../actions/journey";


const EditJourneyPage = (props)=>{
    console.log(props.journey);
    const vehicle_id = props.journey[0].vehicle_id;
    const journey_id = props.journey[0].id;
    return(
        <div>
            <JourneysForm journey={props.journey[0]} onSubmit={async (updates)=>{await props.dispatch(editJourney(updates,vehicle_id,journey_id)); props.history.push("/vehicles/"+vehicle_id+"/journeys")}}/>
        </div>
    )
}

const mapStateToProps = (state,props)=>{
    return{
        journey : state.journeys.filter((journey)=>(journey.id==props.match.params.id))
    }

};


export default connect(mapStateToProps)(EditJourneyPage);

