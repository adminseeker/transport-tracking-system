import React from "react";
import {connect} from "react-redux";
import UserJourneyListItem from "./UserJourneyListItem";

import moment from "moment";

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
import PassengerJoin from "./PassengerJoin";

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
    const { journey } = props;
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <CustomizedDialogs journey_id={journey.journey_id} handleCloseDialog={handleCloseDialog} openDialog={openDialog} setOpenDialog={setOpenDialog} />
        <TableRow className={classes.root}>
          
          <TableCell component="th" scope="row">
            {journey.starting_point}
          </TableCell>
          <TableCell >{journey.destination}</TableCell>
          <TableCell >{journey.start_time}</TableCell>
          <TableCell >{journey.end_time}</TableCell>
          <TableCell >{journey.vehicle_type}</TableCell>
          <TableCell >{journey.vehicle_name}</TableCell>
          <TableCell >{journey.vehicle_color}</TableCell>
          <TableCell >{journey.vehicle_number}</TableCell>
          <TableCell >
            <IconButton aria-label="Track" onClick={async (e)=>{await props.dispatch(clearLocation()); setOpenDialog(true)}}>
            <LocationOnIcon />
          </IconButton>
        </TableCell>
          <TableCell >{journey.isActive===1 ? "Yes" : "No"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1} >
                
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        
      </React.Fragment>
    );
  }

const CustomizedDialogs = (props) => {
  
    return (
      <div >
      
        <Dialog onClose={props.handleCloseDialog} aria-labelledby="customized-dialog-title" open={props.openDialog}>
          <DialogTitle id="customized-dialog-title" onClose={props.handleCloseDialog}>
            Tracking Details
          </DialogTitle>
          <DialogContent dividers>
          <Typography gutterBottom style={{width:"421.94px",height:"73.28px"}}>
              <Tracking id={props.journey_id} passenger={true}/>
            </Typography>
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

const UserJourneyList = (props)=>{
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
    props.journeys.length===0 ? <h3>No Journeys</h3> : (
        <TableContainer component={Paper} style={{width:"60%"}}>
        <Table aria-label="collapsible table">
        <TableHead>
            <TableRow>
            <TableCell>Starting Point</TableCell>
            <TableCell >Destination</TableCell>
            <TableCell >Departure Time</TableCell>
            <TableCell >Arrival Time</TableCell>
            <TableCell >Vehicle Type</TableCell>
            <TableCell >Vehicle Name</TableCell>
            <TableCell >Vehicle Color</TableCell>
            <TableCell >Vehicle Number</TableCell>
            <TableCell >Track</TableCell>
            <TableCell >Active</TableCell>
            
            </TableRow>
        </TableHead>
        <TableBody>
            {props.journeys.map((journey) => (
            <Row key={journey.journey_id} journey={journey} dispatch={props.dispatch}/>
            ))}
        </TableBody>
        </Table>
        <CustomizedDialogs  vehicle_id={props.vehicle_id} handleCloseDialog={handleCloseDialog} openDialog={openTooltip} setOpenDialog={setOpenTooltip} addJourney={true} dispatch={props.dispatch}/>
        <PassengerJoin />
  </TableContainer>
    )
    )
};

const mapStateToProps = (state,props)=>(
    {
        journeys: state.journeys
    }
)

export default connect(mapStateToProps)(UserJourneyList);

// props.journeys.map((journey)=>{
//     return <UserJourneyListItem key={journey.journey_id} journey={journey} />
// })