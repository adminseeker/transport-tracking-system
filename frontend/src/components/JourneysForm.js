import React, { useState } from "react";

const JourneysForm = (props)=>{
    const [starting_point,set_starting_point] = useState(props.journey ? props.journey.starting_point: "");
    const [destination,set_destination] = useState(props.journey ? props.journey.destination: "");
    const [start_time,set_start_time] = useState(props.journey ? props.journey.start_time: "");
    const [end_time,set_end_time] = useState(props.journey ? props.journey.end_time: "");
    const [isActive,set_isActive] = useState(props.journey  ? props.journey.isActive: 0);
    const [error,setError] = useState("");
    return(
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                if(!starting_point || !destination || !start_time || !end_time){
                    setError("required");
                }else{
                    if(!props.journey){
                        props.onSubmit({
                            starting_point,
                             destination,
                             start_time,
                             end_time,
                             isActive
                         });
                    }else{
                        const updatedItems = {};
                        if(props.journey.starting_point!==starting_point)
                            updatedItems.starting_point=starting_point;
                        if(props.journey.destination!==destination)
                            updatedItems.destination=destination;
                        if(props.journey.start_time!==start_time)
                            updatedItems.start_time=start_time;
                        if(props.journey.end_time!==end_time)
                            updatedItems.end_time=end_time;
                        if(props.journey.isActive!==isActive)
                            updatedItems.isActive=isActive;
                        props.onSubmit(updatedItems);
                    }
                    
                    
            }
            }}>
                {error && <p>{error}</p>}
                <input type="text" autoFocus placeholder="Starting Location" value={starting_point} onChange={(e)=>{const starting_point_val=e.target.value; set_starting_point(starting_point_val)}}/>
                <input type="text" autoFocus placeholder="Destination" value={destination} onChange={(e)=>{const destination_val=e.target.value; set_destination(destination_val)}}/>
                <input type="text" autoFocus placeholder="Starting Time" value={start_time} onChange={(e)=>{const start_time_val=e.target.value; set_start_time(start_time_val)}}/>
                <input type="text" autoFocus placeholder="Ending Time" value={end_time} onChange={(e)=>{const end_time_val=e.target.value; set_end_time(end_time_val)}}/>
                <label htmlFor="isActive">Active</label>
                <input type="checkbox" id="isActive" name="isActive" checked={isActive===1} value={isActive}  onClick={(e)=>{ 
                    let isActive_val;
                    if(e.target.checked){
                         isActive_val=1;
                    }else{
                        isActive_val=0;
                    }
                    set_isActive(isActive_val)}}/>
                <button type="submit">Save Journey</button>
            </form>
            
        </div>
    );
        
}

export default JourneysForm;