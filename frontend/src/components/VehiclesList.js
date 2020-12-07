import React from "react";
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
import { editVehicles, removeVehicles } from "../actions/vehicles";
import EditIcon from '@material-ui/icons/Edit';


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  
  
const Row = (props) => {
    const { vehicle } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          
          <TableCell component="th" scope="row">
            {vehicle.vehicle_type}
          </TableCell>
          <TableCell >{vehicle.vehicle_name}</TableCell>
          <TableCell >{vehicle.vehicle_number}</TableCell>
          <TableCell >{vehicle.vehicle_color}</TableCell>
          <TableCell >{vehicle.tracker_id ? vehicle.tracker_id : "N/A"}</TableCell>
          <TableCell >{vehicle.isRunning===1 ? "Yes" : "No"}</TableCell>
          <TableCell >{"Track me"}</TableCell>
          
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
                <VehiclesForm vehicle={vehicle} onSubmit={async (updates)=>{await props.dispatch(editVehicles(updates,vehicle.vehicle_id)); setOpen(false);}}/>
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

const VehiclesList = (props)=>{
    return (
        props.vehicles.length===0 ? <h3>No Vehicles</h3> : (
        <TableContainer component={Paper} style={{width:"60%"}}>
        <Table aria-label="collapsible table">
        <TableHead>
            <TableRow>
            <TableCell>Type</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Number</TableCell>
            <TableCell >color</TableCell>
            <TableCell >Tracker ID</TableCell>
            <TableCell >On Journey</TableCell>
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