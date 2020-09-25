import React, { useState, useEffect } from "react";
import {login} from "../actions/auth";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import GeneralModal from "./GeneralModal";
import { setAlert } from "../actions/alert";

const Login = ({isAuthenticated,loading,login,setAlert,history})=>{
    const[submitted,setSubmit] = useState(false);
    useEffect(()=>{
        if(submitted && !isAuthenticated)
        setAlert("Invalid credentials!!","danger",6000);
    },[setAlert,submitted,isAuthenticated]);
    
    const [formData,setFormData] = useState({
        email:"",
        password:""
    });
    const [showModal,setShowModal] = useState(false);
    const [ModalText,setModalText] = useState("");

    const {email,password} = formData;

    const onChange = (e)=>{
        setFormData({...formData , [e.target.name]:e.target.value})
    }

    const onSubmit = async (e)=>{
        e.preventDefault();
        setShowModal(true);
        setModalText("Logging In");
        await login({email,password});    
        setSubmit(true)
        setShowModal(false);
    }

    if(isAuthenticated){
       return <Redirect to="/dashboard" />
    }

    return(
        <div>
            
            <GeneralModal 
                modal = {"login_modal"}
                loader_image={"51.gif"}
                modal__title = {"login_modal__title"}
                showModal={showModal} 
                text={ModalText}
            />
            <h1>Login Page!</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email</label><br />
                    <input type="email" name="email" value={email} id="email" onChange={onChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label><br />
                    <input type="password" name="password" value={password} id="password" onChange={onChange}/>
                </div>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state,props)=>({
    isAuthenticated:state.auth.isAuthenticated,
    loading:state.auth.loading
})

export default connect(mapStateToProps,{login,setAlert})(Login);