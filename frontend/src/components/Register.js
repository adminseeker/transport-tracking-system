import React, { useState } from "react";
import {register} from "../actions/auth";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {setAlert} from "../actions/alert";

const Register = (props)=>{

    const [formData,setFormData] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        password2:"",
        gender:"",
        date_of_birth:"",
        isUpdater:0
    });

    if(props.isAuthenticated){
        return <Redirect to="/dashboard" />
    }
    

    const {first_name,last_name,email,password,password2,gender,date_of_birth,isUpdater} = formData;

    

    const onChange = (e)=>{
        setFormData({...formData , [e.target.name]:e.target.value})
    }

    const onSubmit =(e)=>{
        e.preventDefault();
        if(password!==password2){
            props.dispatch(setAlert("Passwords do not match!!","danger",6000));
        }else{
            props.dispatch(register({first_name,last_name,email,password,gender,date_of_birth,isUpdater}));
        }
    }

    return(
        <div>
            <h1>Register Page!</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="first_name">First Name</label><br />
                    <input type="text" name="first_name" value={first_name} id="first_name" onChange={onChange}/>
                </div>
                <div>
                    <label htmlFor="last_name">Last Name</label><br />
                    <input type="text" name="last_name" value={last_name} id="last_name" onChange={onChange}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label><br />
                    <input type="email" name="email" value={email} id="email" onChange={onChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label><br />
                    <input type="password" name="password" value={password} id="password" onChange={onChange}/>
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password</label><br />
                    <input type="password" name="password2" value={password2} id="password2" onChange={onChange}/>
                </div>
                <div>
                    <label htmlFor="gender">Gender</label><br />
                    <select name="gender" id="gender" value={gender} onChange={onChange}>
                        <option value={"male"}>Male</option>
                        <option value={"female"}>Female</option>
                        <option value={"others"}>Others</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date_of_birth">Date of Birth</label><br />
                    <input type="text" name="date_of_birth" value={date_of_birth} id="date_of_birth" onChange={onChange}/>
                </div>
                <div>
                    <label htmlFor="isUpdater">User Type</label><br />
                    <select name="isUpdater" id="isUpdater" value={isUpdater} onChange={onChange}>
                        <option value={1}>updater</option>
                        <option value={0}>passenger</option>
                    </select>
                </div>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state,props)=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Register);