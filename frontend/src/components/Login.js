import React, { useState } from "react";
import {login} from "../actions/auth";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FacebookCircularProgress from "./FacebookCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '91.9vh',
  },
  image: {
    backgroundImage: 'url(/images/tracking_login.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop:theme.spacing(6),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '70%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  resize:{
      fontSize:16
  }
}));

const Login = (props)=> {
  const classes = useStyles();

  const [formData,setFormData] = useState({
    email:"",
    password:"",
    error:false
});


const {email,password,error} = formData;

const onChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value})
}

const onSubmit = async (e)=>{
    e.preventDefault();
    const res = await props.dispatch(login({email,password}))
    if(res==="error"){
        setFormData({...formData,error:true});
    }
}
if(props.isAuthenticated){
    return <Redirect to="/dashboard" />
}

  return (
    props.loading ? <FacebookCircularProgress /> : 
    <Grid container component="main" className={classes.root}>
      
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Log in
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={onChange}
              autoComplete="email"
              autoFocus={true}
              error={error}
              InputProps={{
                classes: {
                  input: classes.resize
                },
              }}
     
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={onChange}
              autoComplete="current-password"
              error={error}
              InputProps={{
                classes: {
                  input: classes.resize
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
            <Box fontSize={16}>
             Log In

            </Box>
            </Button>
            <Grid container>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2" style={{fontSize:16}}>
                Forgot password?
              </Link>
            </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state,props)=>({
    isAuthenticated:state.auth.isAuthenticated,
    loading:state.auth.loading
})

export default connect(mapStateToProps)(Login);