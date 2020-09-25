import React from "react";
import { connect } from "react-redux";

const Alert = (props) => (
        props.alerts!==null && props.alerts.length >0 && props.alerts.map((alert)=>(
            <div key={alert.id}>
                <h3>{alert.msg}</h3>
            </div>
        ))
)

const mapStateToProps = (state)=>({
    alerts:state.alert
});

export default connect(mapStateToProps)(Alert);