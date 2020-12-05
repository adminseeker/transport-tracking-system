import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position:"fixed",
        textAlign:"center",
        marginLeft:"-20px",
        left:"50%",
        top:"50%",
        marginTop:"-20px"
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
      color: '#1a90ff',
      animationDuration: '550ms',
      marginLeft:-40
    },
    circle: {
      strokeLinecap: 'round',
    },
  }));
  
  const FacebookCircularProgress = (props) => {
    const classes = useStylesFacebook();
  
    return (
        <div className={classes.root}>

        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={40}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={40}
          thickness={4}
          {...props}
        />
      </div>
    );
  }

  export default FacebookCircularProgress;
