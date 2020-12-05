import React, { useState } from "react";
import {register} from "../actions/auth";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
},
formControl: {
  margin: theme.spacing(1),
  minWidth: 120,
}
}));

const RegisterUpdater = (props)=>{
  const classes = useStyles();

  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    password2:"",
    isUpdater:1
    
});

const [emailError,setEmailError] = useState("")
const [passwordError,setPasswordError] = useState("")
const [phoneError,setPhoneError] = useState("")
const [gender, setGender] = useState("");
const [open, setOpen] = useState(false);
const [selectedDate, setSelectedDate] =useState(new Date());



if(props.isAuthenticated){
    return <Redirect to="/dashboard" />
}


const {firstName,lastName,email,password,password2,isUpdater} = formData;



const onChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value})
}

const handleChange = (event) => {
  setGender(event.target.value);
};

const handleClose = () => {
  setOpen(false);
};

const handleOpen = () => {
  setOpen(true);
};

const handleDateChange = (date) => {
  setSelectedDate(date);
};

const onSubmit = async (e)=>{
    e.preventDefault();
    if(password!==password2){
        setPasswordError("Passwords do not match");
    }
    else{
        const res = await props.dispatch(register({first_name:firstName,last_name:lastName,email,password,gender,date_of_birth:selectedDate.getFullYear()+"-"+(selectedDate.getMonth()+1)+"-"+selectedDate.getDate(),isUpdater}));
        if(String(res)==="Email already registered!"){
            setEmailError(res);
        }
    }
}

  return (
    <Container component="main" maxWidth="xs">

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register As Updater
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
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
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onChange}
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
                onChange={onChange}
                error={!!emailError}
                helperText={!!emailError ? "Email Already Registered!" : ""}
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
                error={!!passwordError}
                helperText={!!passwordError ? "Passwords Do not Match!" : ""}
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
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={onChange}
                error={!!passwordError}
                helperText={!!passwordError ? "Passwords Do not Match!" : ""}
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
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={gender}
          onChange={handleChange}
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
          Register

         </Box>
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="p">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state,props)=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(RegisterUpdater);