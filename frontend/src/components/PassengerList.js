import React from "react";
import { connect } from "react-redux";
import PassengerListItem from "./PassengerListItem";
import {removeAllPassengers } from "../actions/passengers";

import { makeStyles, Container, Typography } from "@material-ui/core";
import FacebookCircularProgress from "./FacebookCircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(12),
      fontWeight: theme.typography.fontWeightRegular,
    },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection:"column",
    justifyContent: 'center',
    width:"50%",
  },
  '@media (max-width: 1024px)': {
    alignItemsAndJustifyContent: {
        width:"100%"
        }
    },
    passengersContainer:{
        width:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent: 'center',
        padding:"2rem"
    }
  }));


const PassengerList = (props)=>{
    const classes = useStyles();
    return (
    <div className={classes.root}>
    <Container className={classes.alignItemsAndJustifyContent} xs={12}>
    <div className={classes.passengersContainer}>
    <div style={{textAlign:"center"}}>
        <Typography variant="h4">
            Passengers { "- " + props.passengers.length}
        </Typography>
    </div>
    {
        props.passengers.length === 0 ?(
            <h3>No Passengers</h3>
        ) :
        props.passengers.map((passenger)=>{
            return <PassengerListItem key={passenger.user_id} passenger={passenger} vehicle_id={props.vehicle_id} journey_id={props.journey_id}/>
        })
    }
    </div>
    </Container>
    </div>
    );
}
const mapStateToProps = (state,props)=>(
{
    passengers: state.passengers
}
)

export default connect(mapStateToProps)(PassengerList);

// <button onClick={async (e)=>{await props.dispatch(removeAllPassengers(props.vehicle_id,props.journey_id));}}>Remove All Passengers</button>
