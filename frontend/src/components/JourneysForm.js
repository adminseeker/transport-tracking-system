import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, Switch } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { removeVehicles } from "../actions/vehicles";
import { connect } from "react-redux";
import { removeJourney } from "../actions/journey";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import AlarmIcon from '@material-ui/icons/Alarm';
import { IconButton, Typography } from "@material-ui/core";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '15ch',
    },
  },
}));

const  MaterialUIPickers = (props) => {

    const handleDateChange = async (date) => {
      props.setSelectedDate(date);
    };
  
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label={props.dateLabel}
            format="dd/MM/yyyy"
            value={props.selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label={props.timeLabel}
            value={props.selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
      </MuiPickersUtilsProvider>
    );
  }

const JourneysForm = (props)=>{
    const classes = useStyles();
    const [starting_point,set_starting_point] = useState(props.journey ? props.journey.starting_point: "");
    const [destination,set_destination] = useState(props.journey ? props.journey.destination: "");
    const [start_time,set_start_time] = useState(props.journey ? props.journey.start_time: new Date());
    const [end_time,set_end_time] = useState(props.journey ? props.journey.end_time: new Date());
    const [isActive,set_isActive] = useState(props.journey  ? props.journey.isActive: 0);
    const [error,setError] = useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


  const handleDeleteDialog = async (e)=>{
    setOpenDeleteDialog(false);
    await props.dispatch(removeJourney(props.vehicle_id,props.journey.id));
  }
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
    return(
        <div>
        
            <form className={classes.root} onSubmit={(e)=>{
                e.preventDefault();
                if(!starting_point || !destination || !start_time || !end_time){
                    setError("required");
                }else{
                    if(!props.journey){
                        props.onSubmit({
                            starting_point,
                             destination,
                             start_time:start_time.getFullYear()+"-"+(start_time.getMonth()+1)+"-"+start_time.getDate()+" "+start_time.getHours()+":"+start_time.getMinutes()+":"+0,
                             end_time:end_time.getFullYear()+"-"+(end_time.getMonth()+1)+"-"+end_time.getDate()+" "+end_time.getHours()+":"+end_time.getMinutes()+":"+0,
                             isActive
                         });
                    }else{
                        const updatedItems = {};
                        if(props.journey.starting_point!==starting_point)
                            updatedItems.starting_point=starting_point;
                        if(props.journey.destination!==destination)
                            updatedItems.destination=destination;
                        if(props.journey.start_time!==start_time)
                            updatedItems.start_time=start_time.getFullYear()+"-"+(start_time.getMonth()+1)+"-"+start_time.getDate()+" "+start_time.getHours()+":"+start_time.getMinutes()+":"+0;
                        if(props.journey.end_time!==end_time)
                            updatedItems.end_time=end_time.getFullYear()+"-"+(end_time.getMonth()+1)+"-"+end_time.getDate()+" "+end_time.getHours()+":"+end_time.getMinutes()+":"+0;
                        if(props.journey.isActive!==isActive)
                            updatedItems.isActive=isActive;
                        props.onSubmit(updatedItems);
                    }
                    
                    
            }
            }}>
                {error && <p>{error}</p>}
                <TextField id="outlined-basic" label="Starting Point" variant="outlined" focused value={starting_point} onChange={(e)=>{const starting_point_val=e.target.value; set_starting_point(starting_point_val)}}/>
                <TextField id="outlined-basic" label="Destination" variant="outlined"  value={destination} onChange={(e)=>{const destination_val=e.target.value; set_destination(destination_val)}}/>
                <MaterialUIPickers dateLabel={"Departure Date"} timeLabel={"Departure Time"} selectedDate={start_time} setSelectedDate={set_start_time} />
                <MaterialUIPickers dateLabel={"Arrival Date"} timeLabel={"Arrival Time"} selectedDate={end_time} setSelectedDate={set_end_time} />
                <FormControlLabel
                    control={
                    <Switch
                        checked={isActive===1}
                        value={isActive}
                        color="primary"
                        onClick={(e)=>{ 
                            let isActive_val;
                            if(e.target.checked){
                                isActive_val=1;
                            }else{
                                isActive_val=0;
                            }
                            set_isActive(isActive_val)}}
                    />
                    }
                    label="Active"
                />
                
                <Button variant="contained" color="primary" style={{float:"right"}} type="submit">Save</Button>
                {props.journey && <Button variant="contained" color="secondary" style={{float:"right"}} onClick={async (e)=>{setOpenDeleteDialog(true)}}>Remove</Button>}
                <Dialog
                  open={openDeleteDialog}
                  onClose={handleCloseDeleteDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{<Typography variant="h4">Are you sure you want to remove this passenger from this journey?</Typography>}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {<Typography variant="h5">This passenger will be removed from this journey permanently!</Typography>}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDeleteDialog} color="primary">
        No
      </Button>
      <Button onClick={handleDeleteDialog} color="secondary" autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
            </form>
            
        </div>
    );
        
}

export default connect()(JourneysForm);