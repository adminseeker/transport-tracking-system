import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPassengers,addPassengers } from "../actions/passengers";
import PassengerList from "./PassengerList";
import InvitePassengers from "./InvitePassengers";

const PassengersDashboard = ({getPassengers,addPassengers,vehicle_id,journey_id}) => {
    useEffect(()=>{
        getPassengers(vehicle_id,journey_id)
    },[getPassengers,vehicle_id,journey_id]);
    const [passengers,set_passengers] =useState("");
    return (
        <div>
            <PassengerList vehicle_id={vehicle_id} journey_id={journey_id}/>
            <InvitePassengers vehicle_id={vehicle_id} journey_id={journey_id}/>
        </div>
    )
}

const mapStateToProps = (state,props)=>({
    vehicle_id:props.match.params.id1,
    journey_id:props.match.params.id2
})

export default connect(mapStateToProps,{getPassengers,addPassengers})(PassengersDashboard);