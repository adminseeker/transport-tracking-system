import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const register = ({first_name,last_name,email,password,gender,date_of_birth,isUpdater})=>{
    return async (dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const body = JSON.stringify({first_name,last_name,email,password,gender,date_of_birth,isUpdater});
        try {
            const res = await axios.post("/api/users",body,config);
            await  dispatch({
                type:"REGISTER_SUCCESS",
                token:res.data.token
            });

            await dispatch(loadUser());
            
        } catch (err) {
            console.log(err);
              dispatch({
                type:"REGISTER_FAIL"
            })
        }
    }
}

const login = ({email,password})=>{
    return async (dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const body = JSON.stringify({email,password});
        try {
            const res = await axios.post("/api/auth/login",body,config);
            if(!!res.data.token){
                dispatch({
                    type:"LOGIN_SUCCESS",
                    token:res.data.token
                });
            }
            

            dispatch(loadUser());
            
        } catch (err) {
            console.log(err);
            dispatch({
                type:"LOGIN_FAIL"
            })
        }
    }
}

const logout = ()=>{
    return (dispatch)=>{
        try {
            dispatch({
                type:"LOGOUT"
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const loadUser= ()=>{
    return async (dispatch)=>{
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get("/api/auth");
            dispatch({
                type:"USER_LOADED",
                user:res.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type:"AUTH_ERROR"
            })
        }
    }
}

export {register,loadUser,login,logout};
