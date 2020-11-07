import React from "react";
import {connect} from "react-redux";
import UserJourneyListItem from "./UserJourneyListItem";

const UserJourneyList = (props)=>(
    <div>
        {
            props.journeys.map((journey)=>{
                return <UserJourneyListItem key={journey.journey_id} journey={journey} />
            })
        }
    </div>
);

const mapStateToProps = (state,props)=>(
    {
        journeys: state.journeys
    }
)

export default connect(mapStateToProps)(UserJourneyList);