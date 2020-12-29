import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, Switch, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { removeVehicles } from "../actions/vehicles";
import { connect } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '15ch',
    },
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

const VehiclesForm = (props)=>{
    const classes = useStyles();
    const [vehicle_name,set_vehicle_name] = useState(props.vehicle ? props.vehicle.vehicle_name: "");
    const [vehicle_type,set_vehicle_type] = useState(props.vehicle ? props.vehicle.vehicle_type: "");
    const [vehicle_color,set_vehicle_color] = useState(props.vehicle ? props.vehicle.vehicle_color: "");
    const [vehicle_number,set_vehicle_number] = useState(props.vehicle ? props.vehicle.vehicle_number: "");
    const [tracker_id,set_tracker_id] = useState(props.vehicle && props.vehicle.tracker_id!==null ? props.vehicle.tracker_id: null);
    const [isRunning,set_isRunning] = useState(props.vehicle  ? props.vehicle.isRunning: 0);
    const [error,setError] = useState("");
    const [AlertMsg, setAlertMsg] = useState("");
  const [AlertType, setAlertType] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

    return(
        <div>
    <CustomizedAlert open={openAlert} msg={AlertMsg} AlertType={AlertType} setOpen={setOpenAlert}/>

            <form className={classes.root} onSubmit={(e)=>{
                e.preventDefault();
                if(!vehicle_name || !vehicle_type || !vehicle_color || !vehicle_number){
                    setError("required");
                }else{
                    if(!props.vehicle){
                        props.onSubmit({
                            vehicle_name,
                             vehicle_type,
                             vehicle_color,
                             vehicle_number,
                             tracker_id,
                             isRunning
                         });
                    }else{
                        const updatedItems = {};
                        if(props.vehicle.vehicle_name!==vehicle_name)
                            updatedItems.vehicle_name=vehicle_name;
                        if(props.vehicle.vehicle_type!==vehicle_type)
                            updatedItems.vehicle_type=vehicle_type;
                        if(props.vehicle.vehicle_color!==vehicle_color)
                            updatedItems.vehicle_color=vehicle_color;
                        if(props.vehicle.vehicle_number!==vehicle_number)
                            updatedItems.vehicle_number=vehicle_number;
                        if(props.vehicle.tracker_id!==tracker_id)
                            updatedItems.tracker_id=tracker_id;
                        if(props.vehicle.isRunning!==isRunning)
                            updatedItems.isRunning=isRunning;
                        props.onSubmit(updatedItems);
                    }
                    
                    
            }
            }}>
                {error && <p>{error}</p>}
                <TextField id="outlined-basic" label="Vehicle Name" variant="outlined" focused value={vehicle_name} onChange={(e)=>{const vehicle_name_val=e.target.value; set_vehicle_name(vehicle_name_val)}}/>
                <TextField id="outlined-basic" label="Vehicle Type" variant="outlined" value={vehicle_type} onChange={(e)=>{const vehicle_type_val=e.target.value; set_vehicle_type(vehicle_type_val)}}/>
                <TextField id="outlined-basic" label="Vehicle Color" variant="outlined" value={vehicle_color} onChange={(e)=>{const vehicle_color_val=e.target.value; set_vehicle_color(vehicle_color_val)}}/>
                <TextField id="outlined-basic" label="Vehicle number" variant="outlined"  value={vehicle_number} onChange={(e)=>{const vehicle_number_val=e.target.value; set_vehicle_number(vehicle_number_val)}}/>
                <TextField id="outlined-basic" label="Tracker ID" variant="outlined"  value={tracker_id} onChange={(e)=>{const tracker_id_val=e.target.value; set_tracker_id(tracker_id_val)}}/>
                <FormControlLabel
                    control={
                    <Switch
                        checked={isRunning===1}
                        value={isRunning}
                        color="primary"
                        onClick={(e)=>{ 
                            let isRunning_val;
                            if(e.target.checked){
                                 isRunning_val=1;
                            }else{
                                isRunning_val=0;
                            }
                            set_isRunning(isRunning_val)}}
                    />
                    }
                    label="On Journey"
                />
                <Button variant="contained" color="primary" style={{float:"right"}} type="submit">Save</Button>
               {props.vehicle && <Button variant="contained" color="secondary" style={{float:"right"}} onClick={async (e)=>{
                   let msg = await props.dispatch(removeVehicles(props.vehicle.vehicle_id));
                    setOpenAlert(true);
                    setAlertMsg(msg);
                if(msg.includes("deleted")){
                  setAlertType("success")  
                }else{
                  setAlertType("error")
                }
                }}>Remove</Button>}

            </form>
            
        </div>
    );
        
}

export default connect()(VehiclesForm);

