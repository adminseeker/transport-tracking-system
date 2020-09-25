import {v4 as uuid} from "uuid";

const setAlert = (msg,alertType="",timeout=5000)=>{
    return (dispatch)=>{
        const id = uuid();
        dispatch({
            type:"SET_ALERT",
            alert:{msg,alertType,id}
        });
        setTimeout(()=>{
            dispatch({
                type:"REMOVE_ALERT",
                id
            })
        },timeout)
    }
}

export {setAlert};