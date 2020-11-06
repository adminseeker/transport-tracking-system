import axios from "axios";
import {v4 as uuid} from "uuid"

const addJourney = (journey,id)=>{
    return async (dispatch)=>{
        try {
            const body = JSON.stringify(journey);
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.post("/api/journey/"+id,body,config);
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
            await dispatch(getJourneys(id));
        } catch (error) {
            console.log(error);
            dispatch({
                type:"ERROR"
            })
        }
    }

}

const getJourneys = (id)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.get("/api/journey/"+id);
            console.log(res.data);
            dispatch({
                type:"GET_JOURNEYS",
                journeys:res.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type:"ERROR"
            })
        }        
    }
}

const editJourney = (journey,id1,id2)=>{
    return async (dispatch)=>{
        try {
            const body = JSON.stringify(journey);
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.patch("/api/journey/"+id1+"/"+id2,body,config);
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
            await dispatch(getJourneys(id1));
        } catch (error) {
            console.log(error);
            dispatch({
                type:"ERROR"
            })
        }
    }
}

const removeJourney = (id1,id2)=>{
    return async (dispatch)=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.delete("/api/journey/"+id1+"/"+id2,config);
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
            await dispatch(getJourneys(id1));
        } catch (error) {
            console.log(error);
            dispatch({
                type:"ERROR"
            })
        }
    }
}

export {addJourney,getJourneys,editJourney,removeJourney};    