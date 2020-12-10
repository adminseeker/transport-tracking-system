import React, { useState } from "react";
import {updateAccount, deleteAccount} from "../actions/auth";
import {connect} from "react-redux";

import {useHistory} from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },root2: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  resize:{
    fontSize:16
}
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

const MyAccount = (props)=>{
    const [open, setOpen] = useState(false);
    const [openGender, setOpenGender] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [AlertMsg, setAlertMsg] = useState("");
    const [AlertType, setAlertType] = useState("");
    const handleDelete = async (e)=>{
    setOpen(false);
    const res = await props.dispatch(deleteAccount());
    setOpenAlert(true);
    setAlertType("info");
    setAlertMsg(res.msg);
    hist.push("/");
    }
    
    const handleClose = () => {
      setOpen(false);
    };

    const handleGenderClose = () => {
        setOpenGender(false);
      };

    const handleGenderOpen = () => {
        setOpenGender(true);
      };
  const classes = useStyles();
  const hist = useHistory();

  const [formData,setFormData] = useState({
    first_name:props.user.first_name,
    last_name:props.user.last_name,
    email:props.user.email,
    gender:props.user.gender
});


const {first_name,last_name,email,gender} = formData;
const [selectedDate, setSelectedDate] = useState(new Date(props.user.date_of_birth));




const onChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value})
}

const handleDateChange = (date) => {
    setSelectedDate(date);
  };

const onSubmit = async (e)=>{
    e.preventDefault();
    
    await props.dispatch(updateAccount({first_name,last_name,gender,date_of_birth:selectedDate.getFullYear()+"-"+(selectedDate.getMonth()+1)+"-"+selectedDate.getDate()}));
    
    setAlertType("success");
    setAlertMsg("Updated Account Details!");
    setOpenAlert(true);
    setTimeout(()=>{
        hist.push("/dashboard");
    },4000)       
    
}

const handleChangePassword = (e)=>{
    e.preventDefault();
    hist.push("/changepassword");
}

  return (
    <Container component="main" maxWidth="xs">
    <CustomizedAlert open={openAlert} msg={AlertMsg} AlertType={AlertType} setOpen={setOpenAlert}/>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Account
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="first_name"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                value={first_name}
                onChange={onChange}
                InputProps={{
                    classes: {
                      input: classes.resize
                    },
                  }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="last_name"
                onChange={onChange}
                value={last_name}
                InputProps={{
                    classes: {
                      input: classes.resize
                    },
                  }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
               
                disabled={true}
                
                InputProps={{
                    classes: {
                      input: classes.resize
                    },
                  }}
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12} sm={6}>
      
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="dd-MM-yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                required
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
  
            </Grid>
      </MuiPickersUtilsProvider>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openGender}
            onClose={handleGenderClose}
            onOpen={handleGenderOpen}
            value={gender}
            name="gender"
            onChange={onChange}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            <MenuItem value={"others"}>Others</MenuItem>
          </Select>
        </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          <Box fontSize={16}>
          Update

         </Box>
          </Button>
          <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleChangePassword}
        >
        <Box fontSize={16}>
        Change Password
       </Box>
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={(e)=>setOpen(true)}
          
        >
        <Box fontSize={16}>
        Delete Account
       </Box>
        </Button>
        </form>
      </div>
      <Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{<Typography variant="h4">Are you sure you want to delete this account?</Typography>}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      {<Typography variant="h5">{props.user.isTeacher ? "All the assignments, materials and student submissions will be deleted with this account permanently!" : "All your submissions will be deleted with this account permanently!"}</Typography>}
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
    </Container>
  );
}

const mapStateToProps = (state,props)=>({
    isAuthenticated:state.auth.isAuthenticated,
    user:state.auth.user
})

export default connect(mapStateToProps)(MyAccount);