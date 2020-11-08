import React from "react";
import {connect} from "react-redux";
import JourneysListItem from "./JourneysListItem";

const JourneysList = (props)=>(
    <div>
        {
            props.journeys.map((journey)=>{
                return <JourneysListItem key={journey.id} journey={journey} vehicle_id={props.vehicle_id}/>
            })
        }
    </div>
);

const mapStateToProps = (state,props)=>(
    {
        journeys: state.journeys
    }
)

export default connect(mapStateToProps)(JourneysList);