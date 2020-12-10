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
            if(res.data.msg){
                await dispatch({
                    type:"REGISTER_FAIL"
                })
                return res.data.msg;
            }
            else{
                await  dispatch({
                    type:"REGISTER_SUCCESS",
                    token:res.data.token
                });

                await dispatch(loadUser());
        }
            
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
            if(err && err.response && err.response.status===400){
                return "error"
            }
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

const updateAccount = (data)=>{
    return async (dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const body = JSON.stringify(data);
        try {
            await axios.patch("/api/users",body,config);
            await dispatch(loadUser());
        } catch (err) {
            console.log(err);
              dispatch({
                type:"AUTH_ERROR"
            })
        }
    }
}

const changePassword = ({password,newPassword})=>{
    return async (dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const body = JSON.stringify({password,newPassword});
        try {
            const res = await axios.patch("/api/users/password",body,config);
            return res.data;
            
        } catch (err) {
            console.log(err);
              dispatch({
                type:"ERROR"
            })
        }
    }
}

const sendOtp = (email) =>{
    return async(dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body = JSON.stringify({email});
        try {
            const res = await axios.post("/api/auth/sendotp",body,config);
            dispatch({
                type:"FORGOT_PASSWORD",
                email:email
            });
            return res.data;
        } catch (err) {
            console.log(err);
              dispatch({
                type:"FORGOT_PASSWORD_ERROR"
            })
        }
    }
}

const resetPassword = (email,otp,newPassword)=>{
    return async(dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body = JSON.stringify({email,otp,newPassword});
        try {
            const res = await axios.post("/api/auth/resetpassword",body,config);
            dispatch({
                type:"FORGOT_PASSWORD",
                email:""
            });
            return res.data;
        } catch (err) {
            console.log(err);
              dispatch({
                type:"FORGOT_PASSWORD_ERROR"
            })
        }
    }
}

const deleteAccount = ()=>{
    return async (dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        try {
            const res = await axios.delete("/api/users/",config);
            dispatch({
                type:"LOGOUT"
            });
            return res.data;
            
        } catch (err) {
            console.log(err);
              dispatch({
                type:"ERROR"
            })
        }
    }

}

export {register,loadUser,login,logout,updateAccount,changePassword,deleteAccount,sendOtp,resetPassword};
