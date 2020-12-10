import React,{useState} from "react";
import { removePassenger} from "../actions/passengers";
import { connect } from "react-redux";
import moment from "moment";

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { IconButton, Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FacebookCircularProgress from "./FacebookCircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    root2: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));


const PassengerListItem = (props)=>{
    const vehicle_id = props.vehicle_id;    
    const journey_id = props.journey_id;    
    const [open, setOpen] = useState(false);
  const handleDelete = async (e)=>{
    setOpen(false);
    await props.dispatch(removePassenger(vehicle_id,journey_id,props.passenger.user_id));
  }
  
  const handleClose = () => {
    setOpen(false);
  };
    const classes = useStyles();

    return (

        <div>
        {
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <div className={classes.root2} style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            
            <Avatar className={classes.orange}>{props.passenger.first_name[0]}</Avatar>
        
          <Typography className={classes.heading}>
          
          {props.passenger.first_name}  {props.passenger.last_name}
          </Typography>
          
          </div>
          <div style={{position:"absolute",right:"4rem",top:"0.9rem"}}>
        { <IconButton  aria-label="delete" onClick={async (e)=>{setOpen(true)}}><Delete  fontSize="medium" /></IconButton>}
        </div>
        </AccordionSummary>
        <AccordionDetails>
           { <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <Typography>
            Email: {props.passenger.email}
          </Typography>
          <Typography>
            Gender: {props.passenger.gender}
          </Typography>
          <Typography>
            Date Of Birth: {moment(props.passenger.date_of_birth).format('MMMM Do YYYY')}
          </Typography>
          </div>}
        </AccordionDetails>
      </Accordion>
        }
        <Dialog
  open={open}
  onClose={handleClose}
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
    <Button onClick={handleClose} color="primary">
      No
    </Button>
    <Button onClick={handleDelete} color="secondary" autoFocus>
      Yes
    </Button>
  </DialogActions>
</Dialog>
    </div>

   
    );
}



export default connect()(PassengerListItem);

// <div>
// <Link to={"/vehicles/"+vehicle_id+"/journeys/"+journey_id+"/passengers/"+props.passenger.user_id}>
//     <h3>{props.passenger.first_name}  {props.passenger.last_name}</h3>
// </Link>
// <button onClick={async (e)=>{await props.dispatch(removePassenger(vehicle_id,journey_id,props.passenger.user_id));}}>Remove</button>
// </div>