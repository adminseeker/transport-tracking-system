import React from "react";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

const UserJourneyListItem = (props)=>(
    <div>
        <Link to={"/journey/"+props.journey.journey_id}>
            <h3>{props.journey.starting_point} - {props.journey.destination}- {moment(props.journey.start_time).format('MMMM Do YYYY, h:mm:ss a')}</h3>
        </Link>
    </div>
);



export default connect()(UserJourneyListItem);