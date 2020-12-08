import React from "react";
import {connect} from "react-redux";
import JourneysListItem from "./JourneysListItem";
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
import { addJourney, editJourney } from "../actions/journey";
import JourneysForm from "./JourneysForm";



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
        <CustomizedDialogs journey_id={journey.id} handleCloseDialog={handleCloseDialog} openDialog={openDialog} setOpenDialog={setOpenDialog} />
        <TableRow className={classes.root}>
          
          <TableCell component="th" scope="row">
            {journey.starting_point}
          </TableCell>
          <TableCell >{journey.destination}</TableCell>
          <TableCell >{moment(journey.start_time).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
          <TableCell >{moment(journey.end_time).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
          <TableCell >{journey.isActive===1 ? "Yes" : "No"}</TableCell>
          <TableCell >{<Link component={RouterLink} to={"/vehicles/"+props.vehicle_id+"/journeys/"+journey.id+"/passengers"}>{"Passengers"}</Link>}</TableCell>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon />  : <React.Fragment>  <EditIcon /> </React.Fragment>}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1} >
                <Typography variant="h6" gutterBottom component="div">
                    <JourneysForm vehicle_id={props.vehicle_id} journey={journey} onSubmit={async (updates)=>{await props.dispatch(editJourney(updates,props.vehicle_id,journey.id)); setOpen(false);}}/>
                </Typography>
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
            Add Journey
          </DialogTitle>
          <DialogContent dividers>
           
            <Typography variant="h6" gutterBottom component="div">
            <JourneysForm onSubmit={async (journey)=>{await props.dispatch(addJourney(journey,props.vehicle_id)); props.setOpenDialog(false);}} />
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


const JourneysList = (props)=>{
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
              <TableCell >Active</TableCell>
              <TableCell >Passengers</TableCell>
              <TableCell >Edit</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {props.journeys.map((journey) => (
              <Row key={journey.id} journey={journey} vehicle_id={props.vehicle_id} dispatch={props.dispatch}/>
              ))}
          </TableBody>
          </Table>
          <CustomizedDialogs  vehicle_id={props.vehicle_id} handleCloseDialog={handleCloseDialog} openDialog={openTooltip} setOpenDialog={setOpenTooltip} addJourney={true} dispatch={props.dispatch}/>
          <Tooltip title="Add Journey" aria-label="add" position="right" >
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
        journeys: state.journeys
    }
)

export default connect(mapStateToProps)(JourneysList);