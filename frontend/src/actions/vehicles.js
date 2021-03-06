import axios from "axios";
import {v4 as uuid} from "uuid"

const addVehicle = (vehicle)=>{
    return async (dispatch)=>{
        try {
            const body = JSON.stringify(vehicle);
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.post("/api/vehicles/",body,config);
            await dispatch(getVehicles());
            return res.data.msg;
        } catch (error) {
            console.log(error);
            dispatch({
                type:"VEHICLES_ERROR"
            })
        }
    }

}

const getVehicles = ()=>{
    return async (dispatch)=>{
        try {
            const res = await axios.get("/api/vehicles");
            dispatch({
                type:"GET_VEHICLES",
                vehicles:res.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type:"VEHICLES_ERROR"
            })
        }        
    }
}

const editVehicles = (vehicle,id)=>{
    return async (dispatch)=>{
        try {
            const body = JSON.stringify(vehicle);
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.patch("/api/vehicles/"+id,body,config);
            console.log(res.data);
            
            await dispatch(getVehicles());
            return res.data;
        } catch (error) {
            console.log(error);
            dispatch({
                type:"VEHICLES_ERROR"
            })
        }
    }
}

const removeVehicles = (id)=>{
    return async (dispatch)=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.delete("/api/vehicles/"+id,config);
            console.log(res.data);
            await dispatch(getVehicles());
            return res.data.msg;

        } catch (error) {
            console.log(error);
            dispatch({
                type:"VEHICLES_ERROR"
            })
        }
    }
}


export {addVehicle,getVehicles,editVehicles,removeVehicles};