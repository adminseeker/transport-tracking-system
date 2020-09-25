import axios from "axios";

const setAuthToken =  (token)=>{
    if(token){
       axios.defaults.headers["x-auth-token"] = token;
    }else{
        delete axios.defaults.headers["x-auth-token"];
    }
}

export default setAuthToken;