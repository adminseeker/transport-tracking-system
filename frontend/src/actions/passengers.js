import axios from "axios";
import {v4 as uuid} from "uuid"

const addPassengers =  (passengers,id1,id2)=>{
    return async(dispatch)=>{
        try {
            const emails = passengers.split(",");
            const body = JSON.stringify({emails});
            const config = {
                headers:{
                "Content-Type":"application/json"
                }
            }
            console.log(body);
            const res = await axios.post("/api/passengers/"+id1+"/"+id2+"/passengers/invite",body,config);
            console.log(res.data);
            
            await dispatch(getPassengers(id1,id2));
            return res.data;
        } catch (error) {
            console.log(error);
            dispatch({
                type:"PASSENGERS_ERROR"
            })
        }
    
    }
}

const getPassengers = (id1,id2)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.get("/api/passengers/"+id1+"/"+id2);
            console.log(res.data);
            dispatch({
                type:"GET_PASSENGERS",
                passengers:res.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type:"PASSENGERS_ERROR"
            })
        }        
    }
}

const removePassenger = (id1,id2,id3)=>{
    return async (dispatch)=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.delete("/api/passengers/"+id1+"/"+id2+"/"+id3,config);
            
            await dispatch(getPassengers(id1,id2));
        } catch (error) {
            console.log(error);
            dispatch({
                type:"PASSENGERS_ERROR"
            })
        }
    }
}

const removeAllPassengers = (id1,id2)=>{
    return async (dispatch)=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.delete("/api/passengers/"+id1+"/"+id2+"/all",config);
            console.log(id1+","+id2);
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
            await dispatch(getPassengers(id1,id2));
        } catch (error) {
            console.log(error);
            dispatch({
                type:"PASSENGERS_ERROR"
            })
        }
    }
}

const joinJourney = ({invite_id})=>{
    return async (dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const body = JSON.stringify({invite_id});
        try {
            const res = await axios.post("/api/passengers/join",body,config);
            return res.data;
        } catch (err) {
            console.log(err);
            dispatch({
                type:"ERROR"
            })
        }
    }
}

export {addPassengers,getPassengers,removePassenger,removeAllPassengers,joinJourney};