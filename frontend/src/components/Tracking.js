import React,{useEffect} from "react";
import { connect } from "react-redux";
import moment from "moment";
import {getLocation} from "../actions/tracking";
import useSWR from "swr";   
import FacebookCircularProgress from "./FacebookCircularProgress";
import { Redirect } from "react-router-dom";

const Tracking = ({id,getLocation,location,user}) => {
    useEffect(()=>{
        getLocation(id,user.isUpdater)
        // setInterval(()=>{
        //     getLocation(id,user.isUpdater)
        // },20000);
    },[getLocation,id]);
    return (
        location.length===0 ? <FacebookCircularProgress  /> :

        !location.msg ? 
        <Redirect to={"https://google.com/maps?q="+location.latitude+","+location.longitude}>
            
            
        </Redirect>

        :
        <div>
           <h1>{location.msg}</h1>
        </div>
    )
}

const mapStateToProps = (state,props)=>({
    location:state.location,
    user:state.auth.user
})

export default connect(mapStateToProps,{getLocation})(Tracking);

// location.length===0 ? <h1>No Tracking Available</h1> :

// !location.msg ? 
// <div>
//     <h3>Latitude: {location.latitude}</h3>
//     <h3>Longitude: {location.longitude}</h3>
//     <h3>Last Updated At: {moment(location.lastUpdated).format('MMMM Do YYYY, h:mm:ss a')}</h3>
//     <h4><a href={"https://google.com/maps?q="+location.latitude+","+location.longitude} target="_blank" rel="noopener noreferrer">View Location</a></h4>
// </div>

// :
// <div>
//    <h1>{location.msg}</h1>
// </div>
// )