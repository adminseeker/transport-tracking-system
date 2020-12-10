import React, { useState } from "react";
import { changePassword,logout} from "../actions/auth";
import {connect} from "react-redux";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


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

const ChangePassword = (props)=>{
  const classes = useStyles();

  const [formData,setFormData] = useState({
    password:"",
    newPassword:"",
    newPassword2:""
});

const [passwordError,setPasswordError] = useState("")
const [password2Error,setPassword2Error] = useState("")
const [openAlert, setOpenAlert] = useState(false);
const [AlertMsg, setAlertMsg] = useState("");
const [AlertType, setAlertType] = useState("");


const {password,newPassword,newPassword2} = formData;



const onChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value})
}

const onSubmit = async (e)=>{
    e.preventDefault();
    if(newPassword!==newPassword2){
        setPasswordError("Passwords do not match");
    }
    else{
        const res = await props.dispatch(changePassword({password,newPassword}));
        if(String(res.code)==="0"){
            setPassword2Error("Incorrect Password")
        }else if(String(res.code)==="2"){
          setOpenAlert(true);
          setAlertType("error");
          setAlertMsg(res.msg);
        }else if(String(res.code)==="1"){
          setOpenAlert(true);
          setAlertType("success");
          setAlertMsg("Password Changed Successfully!");
          await props.dispatch(logout())
        }
    }
}

  return (
    <Container component="main" maxWidth="xs">
    <CustomizedAlert open={openAlert} msg={AlertMsg} AlertType={AlertType} setOpen={setOpenAlert}/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={!!password2Error}
                helperText={!!password2Error ? "Incorrect Password!" : ""}
                InputProps={{
                    classes: {
                      input: classes.resize
                    },
                  }}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
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
                name="newPassword2"
                label="Confirm New Password"
                type="password"
                id="newPassword2"
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          <Box fontSize={16}>
          Change Password

         </Box>
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state,props)=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(ChangePassword);