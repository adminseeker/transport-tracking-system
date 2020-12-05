import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import {getLocation} from "../actions/tracking";
import useSWR from "swr";

const Tracking = ({id,getLocation,location,user}) => {
    useSWR("/vehicles/track/"+id,()=>{
        getLocation(id,user.isUpdater)
        // setInterval(()=>{
        //     getLocation(id,user.isUpdater)
        // },20000);
    });
    return (
        location.length===0 ? <h1>No Tracking Available</h1> :

        !location.msg ? 
        <div>
            <h3>Latitude: {location.latitude}</h3>
            <h3>Longitude: {location.longitude}</h3>
            <h3>Last Updated At: {moment(location.lastUpdated).format('MMMM Do YYYY, h:mm:ss a')}</h3>
            <h4><a href={"https://google.com/maps?q="+location.latitude+","+location.longitude} target="_blank" rel="noopener noreferrer">View Location</a></h4>
        </div>

        :
        <div>
           <h1>{location.msg}</h1>
        </div>
    )
}

const mapStateToProps = (state,props)=>({
    location:state.location,
    id:props.match.params.id,
    user:state.auth.user
})

export default connect(mapStateToProps,{getLocation})(Tracking);