import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Send} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Typography } from "@material-ui/core";
import { addPassengers } from '../actions/passengers';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },root2: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2)
      }
    },
    paper: {
      padding: theme.spacing(1), //grid padding
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },fab: {
      margin: theme.spacing(2),
  
    },
    fixed: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(1),
      },
  }));

  const InvitePassengers = (props) => {
    const [students,setStudents] =useState("");
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [AlertMsg, setAlertMsg] = useState("");
    const [AlertType, setAlertType] = useState("");
    const [passengers,set_passengers] =useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
      setOpen(false);
      const msg = await props.dispatch(addPassengers(passengers,props.vehicle_id,props.journey_id));
      if(String(msg)==="-1"){
        setOpenAlert(true);
        setAlertType("error");
        setAlertMsg("Invite Failed!");
      }else if(String(msg)!==""){
        setOpenAlert(true);
        setAlertType("success");
        setAlertMsg(msg);
      }else if(String(msg)===""){
        setOpen(true);
      }
  };
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Invite Passengers</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Enter Passenger Emails separated by commas to Invite Passengers
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Emails"
            type="name"
            fullWidth
            onChange={(e)=>{
                set_passengers(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmit}
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Send/>}
          >Send</Button>
        </DialogActions>
      </Dialog>
      { <Tooltip title="Invite" aria-label="Invite" position="right" >
        <Fab color="primary" className={classes.fixed} onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>}
            
        </div>
    )
}



export default connect()(InvitePassengers);
