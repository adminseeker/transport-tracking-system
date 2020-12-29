import React,{useState} from "react";
import {connect} from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import VehiclesForm from "./VehiclesForm";
import { editVehicles, removeVehicles, addVehicle } from "../actions/vehicles";
import EditIcon from '@material-ui/icons/Edit';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Tracking from "./Tracking";

import LocationOnIcon from '@material-ui/icons/LocationOn';
import { clearLocation } from "../actions/tracking";

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
  });

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
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  
  
const Row = (props) => {
    const { vehicle } = props;
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);
  const [AlertMsg, setAlertMsg] = useState("");
  const [AlertType, setAlertType] = useState("");

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
    const classes = useRowStyles();

    
  
    return (
      <React.Fragment>
    <CustomizedAlert open={openAlert} msg={AlertMsg} AlertType={AlertType} setOpen={setOpenAlert}/>
        <CustomizedDialogs vehicle_id={vehicle.vehicle_id} handleCloseDialog={handleCloseDialog} openDialog={openDialog} setOpenDialog={setOpenDialog} />
        <TableRow className={classes.root}>
          
          <TableCell component="th" scope="row">
            {vehicle.vehicle_type}
          </TableCell>
          <TableCell >{<Link component={RouterLink} to={"/vehicles/"+vehicle.vehicle_id+"/journeys"}>{vehicle.vehicle_name}</Link>}</TableCell>
          <TableCell >{vehicle.vehicle_number}</TableCell>
          <TableCell >{vehicle.vehicle_color}</TableCell>
          <TableCell >{vehicle.tracker_id ? vehicle.tracker_id : "N/A"}</TableCell>
          <TableCell >{vehicle.isRunning===1 ? "Yes" : "No"}</TableCell>
          <TableCell >
            <IconButton aria-label="Track" onClick={async (e)=>{await props.dispatch(clearLocation()); setOpenDialog(true)}}>
            <LocationOnIcon />
          </IconButton>
        </TableCell>
          
          <TableCell>
            
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon />  : <React.Fragment>  <EditIcon /> </React.Fragment>}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1} >
                <Typography variant="h6" gutterBottom component="div">
                <VehiclesForm vehicle={vehicle} onSubmit={async (updates)=>{
                  let data = await props.dispatch(editVehicles(updates,vehicle.vehicle_id)); 
                  setOpenAlert(true);
                  setAlertMsg(data.msg);
                  if(data.code==="1"){
                    setAlertType("success")
                    setOpen(false);  
                  }else{
                    setAlertType("error")
                  }
                  }}
                />
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        
      </React.Fragment>
    );
  }

const CustomizedDialogs = (props) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [AlertMsg, setAlertMsg] = useState("");
  const [AlertType, setAlertType] = useState("");

  
    return (
      <div >
    <CustomizedAlert open={openAlert} msg={AlertMsg} AlertType={AlertType} setOpen={setOpenAlert}/>
      
        <Dialog onClose={props.handleCloseDialog} aria-labelledby="customized-dialog-title" open={props.openDialog}>
          <DialogTitle id="customized-dialog-title" onClose={props.handleCloseDialog}>
           { !props.addVehicle ? "Tracking Details" : "Add Vehicle" }
          </DialogTitle>
          <DialogContent dividers>
            {!props.addVehicle ? <Typography gutterBottom style={{width:"421.94px",height:"73.28px"}}>
              <Tracking id={props.vehicle_id}/>
            </Typography>
            : 
            <Typography variant="h6" gutterBottom component="div">
                <VehiclesForm  onSubmit={async (vehicle)=>{
                let msg = await props.dispatch(addVehicle(vehicle)); props.setOpenDialog(false);
                setOpenAlert(true)
                setAlertMsg(msg);
                if(msg.includes("Vehicle Added")){
                  setAlertType("success")  
                }else{
                  setAlertType("error")
                }
                }} />
                </Typography>
          }
            
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={props.handleCloseDialog} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

const VehiclesList = (props)=>{
  const [openTooltip, setOpenTooltip] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  
  const handleCloseDialog = () => {
    setOpenTooltip(false);
  };
  const classes = useStyles();

  const handleClickOpenTooltip = () => {
    setOpenTooltip(true);
  };
  
    return (
        props.vehicles.length===0 ? 
        <div>
        <h3>No Vehicles</h3>
        <CustomizedDialogs  handleCloseDialog={handleCloseDialog} openDialog={openTooltip} setOpenDialog={setOpenTooltip} addVehicle={true} dispatch={props.dispatch}/>
        <Tooltip title="Add Vehicle" aria-label="add" position="right" >
        <Fab color="primary" className={classes.fixed} onClick={handleClickOpenTooltip}>
          
        <AddIcon />
        </Fab>
      </Tooltip>
        </div>
        : (
        <TableContainer component={Paper} style={{width:"60%"}}>
        <Table aria-label="collapsible table">
        <TableHead>
            <TableRow>
            <TableCell>Type</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Number</TableCell>
            <TableCell >color</TableCell>
            <TableCell >Tracker ID</TableCell>
            <TableCell >On Move</TableCell>
            <TableCell >Track</TableCell>
            <TableCell >Edit</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {props.vehicles.map((vehicle) => (
            <Row key={vehicle.vehicle_id} vehicle={vehicle} dispatch={props.dispatch}/>
            ))}
        </TableBody>
        </Table>
        <CustomizedDialogs  handleCloseDialog={handleCloseDialog} openDialog={openTooltip} setOpenDialog={setOpenTooltip} addVehicle={true} dispatch={props.dispatch}/>
        <Tooltip title="Add Vehicle" aria-label="add" position="right" >
        <Fab color="primary" className={classes.fixed} onClick={handleClickOpenTooltip}>
          
        <AddIcon />
        </Fab>
      </Tooltip>
  </TableContainer>
        )
    
    )
};

const mapStateToProps = (state,props)=>(
    {
        vehicles: state.vehicles
    }
)

export default connect(mapStateToProps)(VehiclesList);

// props.vehicles.map((vehicle)=>{
//     return <VehiclesListItem key={vehicle.vehicle_id} vehicle={vehicle}/>
// })