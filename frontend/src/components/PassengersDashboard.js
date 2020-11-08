import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPassengers,addPassengers } from "../actions/passengers";
import PassengerList from "./PassengerList";

const PassengersDashboard = ({getPassengers,addPassengers,vehicle_id,journey_id}) => {
    useEffect(()=>{
        getPassengers(vehicle_id,journey_id)
    },[getPassengers,vehicle_id,journey_id]);
    const [passengers,set_passengers] =useState("");
    return (
        <div>
            <h1>Passengers List</h1>
            <PassengerList vehicle_id={vehicle_id} journey_id={journey_id}/>
            <p>Enter passenger Emails separated by commas to add passengers</p>
            <input type="text" value={passengers} onChange={(e)=>{
                set_passengers(e.target.value);
            }}/><br />
            <button onClick={async (e)=>{
                await addPassengers(passengers,vehicle_id,journey_id);
            }}>Add passengers</button>
        </div>
    )
}

const mapStateToProps = (state,props)=>({
    vehicle_id:props.match.params.id1,
    journey_id:props.match.params.id2
})

export default connect(mapStateToProps,{getPassengers,addPassengers})(PassengersDashboard);