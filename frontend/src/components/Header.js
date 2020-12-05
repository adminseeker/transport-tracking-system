import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import FacebookCircularProgress from "./FacebookCircularProgress";
import {useHistory} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button, Container, Link, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 0.8,
    margin: 5
  },
}));

const Header = ({user,isAuthenticated,logout,history,loading}) => {
    
  const hist = useHistory(); 
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdaterOption = () => {
    hist.push("/register/updater");
    setAnchorEl(null);
  };

  const handlePassengerOption = () => {
    hist.push("/register/passenger");
    setAnchorEl(null);
  };

  const handleLoginButton = () => {
    hist.push("/login");
  };

  const handleDashboard = () => {
    hist.push("/dashboard");
  };

  const handleMyAccount = () => {
    hist.push("/account");
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    setAnchorEl(null);
  };

  return loading ? <FacebookCircularProgress/> : (
    <div className={classes.root}>
      <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
        
        <Typography variant="h4" className={classes.title}>
            <Link color="inherit" underline="none" href={"/"}>
            Tracknet
            </Link>
          </Typography>
          {!isAuthenticated && (
            <div>
              <Button
                aria-label="Register"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              <Box fontSize={14}>
                    Register
                </Box>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handlePassengerOption}>Passenger</MenuItem>
                <MenuItem onClick={handleUpdaterOption}>Updater</MenuItem>
              </Menu>
              <Button
                aria-label="Login"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleLoginButton}
                color="inherit"
              >
              <Box fontSize={14}>
                    Login
                </Box>
              </Button>
              
            </div>
          )}
          {isAuthenticated && (
            <div>
            <Button
                onClick={handleDashboard}
                color="inherit"
              >
                <Box fontSize={12}>
                    Dashboard
                </Box>
              </Button>
              <Button
                aria-label="User Account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              <Box fontSize={12}>
                {user && user.first_name}
                </Box>
                
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              
            </div>
          )}
           
        </Toolbar>
        </Container> 
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state)=>({
    isAuthenticated:state.auth.isAuthenticated,
    user:state.auth.user,
    loading:state.auth.loading
})

export default connect(mapStateToProps,{logout})(Header);