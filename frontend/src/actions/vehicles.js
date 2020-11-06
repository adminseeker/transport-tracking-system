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
            if(res.data.msg){
                const id = uuid();
                await dispatch({
                type:"SET_ALERT",
                alert:{msg:res.data.msg,alertType:"danger",id}
            });
            setTimeout(()=>{
                dispatch({
                    type:"REMOVE_ALERT",
                    id
                })
            },3000)
            }
            await dispatch(getVehicles());
        } catch (error) {
            console.log(error);
            dispatch({
                type:"ERROR"
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
                type:"ERROR"
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
            if(res.data.msg){
                const id = uuid();
                await dispatch({
                type:"SET_ALERT",
                alert:{msg:res.data.msg,alertType:"danger",id}
            });
            setTimeout(()=>{
                dispatch({
                    type:"REMOVE_ALERT",
                    id
                })
            },3000)
            }
            await dispatch(getVehicles());
        } catch (error) {
            console.log(error);
            dispatch({
                type:"ERROR"
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
            if(res.data.msg){
                const id = uuid();
                await dispatch({
                type:"SET_ALERT",
                alert:{msg:res.data.msg,alertType:"danger",id}
            });
            setTimeout(()=>{
                dispatch({
                    type:"REMOVE_ALERT",
                    id
                })
            },3000)
            }
            await dispatch(getVehicles());
        } catch (error) {
            console.log(error);
            dispatch({
                type:"ERROR"
            })
        }
    }
}


export {getVehicles,addVehicle,editVehicles,removeVehicles};