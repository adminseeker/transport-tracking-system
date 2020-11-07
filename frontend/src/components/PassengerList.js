import React from "react";
import { connect } from "react-redux";
import PassengerListItem from "./PassengerListItem";
import {removeAllPassengers } from "../actions/passengers";


const PassengerList = (props)=>{
    return (
    <div>
    <button onClick={async (e)=>{await props.dispatch(removeAllPassengers(props.vehicle_id,props.journey_id));}}>Remove All Passengers</button>
    {
        props.passengers.map((passenger)=>{
            return <PassengerListItem key={passenger.user_id} passenger={passenger} vehicle_id={props.vehicle_id} journey_id={props.journey_id}/>
        })
    }
    </div>
    );
}
const mapStateToProps = (state,props)=>(
{
    passengers: state.passengers
}
)

export default connect(mapStateToProps)(PassengerList);