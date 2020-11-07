import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";

const ViewPassengerDetails = ({passenger}) => {
    return (
        <div>
            <h3>First Name: {passenger.first_name}</h3>
            <h3>Last Name: {passenger.last_name}</h3>
            <h3>Email: {passenger.email}</h3>
            <h3>Gender: {passenger.gender}</h3>
            <h3>Date Of Birth: {moment(passenger.date_of_birth).format('MMMM Do YYYY, h:mm:ss a')}</h3>
        </div>
    )
}

const mapStateToProps = (state,props)=>({
    passenger: state.passengers.find((passenger)=>(passenger.user_id == props.match.params.id3))
})

export default connect(mapStateToProps)(ViewPassengerDetails);