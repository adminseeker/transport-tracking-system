import axios from "axios";

const getLocation = (id,isUpdater)=>{
    return async (dispatch)=>{
        try {
            let res;
            if(isUpdater){
                res = await axios.get("/api/vehicles/track/"+id);
            }else{
                res = await axios.get("/api/passengers/me/track/"+id);
            }
            console.log(res.data);
            dispatch({
                type:"GET_LOCATION",
                location:res.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type:"TRACKING_ERROR"
            })
        }        
    }
}

const clearLocation = ()=>{
    return async (dispatch)=>{
        dispatch({
            type:"GET_LOCATION",
            location:[]
        })
    }
}
export {getLocation,clearLocation};