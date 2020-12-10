import React,{useState} from "react";
import { connect } from "react-redux";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
import { joinJourney } from "../actions/passengers";
import FacebookCircularProgress from "./FacebookCircularProgress";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Typography } from "@material-ui/core";
import { getPassengerJourneys } from "../actions/journey";

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
  }));
  
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const CustomizedAlert = (props) => {
    const classes = useStyles();
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      props.setOpen(false);
    };
  
    return (
      <div className={classes.root2}>
        <Snackbar
          open={props.open}
          autoHideDuration={6000}
          
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity={props.AlertType}>
            <Typography variant="h5">
              {props.msg}
            </Typography>
          </Alert>
        </Snackbar>
      </div>
    );
  }

  const PassengerJoin = (props) => {
    const [open, setOpen] = React.useState(false);
    const [invite_id, set_invite_id] = React.useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [AlertMsg, setAlertMsg] = useState("");
    const [AlertType, setAlertType] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
        const res = await props.dispatch(joinJourney({invite_id:invite_id}));
        if(String(res.code)==="1"){
          setOpenAlert(true);
          setAlertType("success");
          setAlertMsg("Joined Journey!");
          await props.dispatch(getPassengerJourneys());
          setOpen(false);
        }else{
          setOpenAlert(true);
          setAlertType("error");
          setAlertMsg(res.msg);
        }
    
  };
    const classes = useStyles();
    return (
        <div className={classes.root}>
    <CustomizedAlert open={openAlert} msg={AlertMsg} AlertType={AlertType} setOpen={setOpenAlert}/>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{"Join Journey"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {"Enter Invite code to join journey"}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={"Invite Code"}
            type="name"
            fullWidth
            onChange={(e)=>{
                set_invite_id(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" onClick={handleSubmit}
          >
          {"Join"}
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title={"Join"} aria-label="add" position="right" >
        <Fab color="primary" className={classes.fixed} onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
        </div>
    )
}

export default connect()(PassengerJoin);
