import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";

const UserJourneyDetails = ({journey}) => {
    return (
        <div>
            <h3>Starting Point: {journey.starting_point}</h3>
            <h3>Destination: {journey.destination}</h3>
            <h3>Vehicle Name: {journey.vehicle_name}</h3>
            <h3>Vehicle Type: {journey.vehicle_type}</h3>
            <h3>Vehicle Color: {journey.vehicle_color}</h3>
            <h3>Vehicle Number: {journey.vehicle_number}</h3>
            <h3>Departure Time: {moment(journey.start_time).format('MMMM Do YYYY, h:mm:ss a')}</h3>
            <h3>Arrival Time: {moment(journey.end_time).format('MMMM Do YYYY, h:mm:ss a')}</h3>
            <h3>Status: {journey.isActive===1 ? "Active": "Inactive"}</h3>
        </div>
    )
}

const mapStateToProps = (state,props)=>({
    journey: state.journeys.find((journey)=>(journey.journey_id == props.match.params.id))
})

export default connect(mapStateToProps)(UserJourneyDetails);


