import React, { useState } from "react";

const VehiclesForm = (props)=>{
    const [vehicle_name,set_vehicle_name] = useState(props.vehicle ? props.vehicle.vehicle_name: "");
    const [vehicle_type,set_vehicle_type] = useState(props.vehicle ? props.vehicle.vehicle_type: "");
    const [vehicle_color,set_vehicle_color] = useState(props.vehicle ? props.vehicle.vehicle_color: "");
    const [vehicle_number,set_vehicle_number] = useState(props.vehicle ? props.vehicle.vehicle_number: "");
    const [tracker_id,set_tracker_id] = useState(props.vehicle && props.vehicle.tracker_id!==null ? props.vehicle.tracker_id: null);
    const [isRunning,set_isRunning] = useState(props.vehicle  ? props.vehicle.isRunning: 0);
    const [error,setError] = useState("");
    return(
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                if(!vehicle_name || !vehicle_type || !vehicle_color || !vehicle_number){
                    setError("required");
                }else{
                    if(!props.vehicle){
                        props.onSubmit({
                            vehicle_name,
                             vehicle_type,
                             vehicle_color,
                             vehicle_number,
                             tracker_id,
                             isRunning
                         });
                    }else{
                        const updatedItems = {};
                        if(props.vehicle.vehicle_name!==vehicle_name)
                            updatedItems.vehicle_name=vehicle_name;
                        if(props.vehicle.vehicle_type!==vehicle_type)
                            updatedItems.vehicle_type=vehicle_type;
                        if(props.vehicle.vehicle_color!==vehicle_color)
                            updatedItems.vehicle_color=vehicle_color;
                        if(props.vehicle.vehicle_number!==vehicle_number)
                            updatedItems.vehicle_number=vehicle_number;
                        if(props.vehicle.tracker_id!==tracker_id)
                            updatedItems.tracker_id=tracker_id;
                        if(props.vehicle.isRunning!==isRunning)
                            updatedItems.isRunning=isRunning;
                        props.onSubmit(updatedItems);
                    }
                    
                    
            }
            }}>
                {error && <p>{error}</p>}
                <input type="text" autoFocus placeholder="Vehicle Name" value={vehicle_name} onChange={(e)=>{const vehicle_name_val=e.target.value; set_vehicle_name(vehicle_name_val)}}/>
                <input type="text" autoFocus placeholder="Vehicle type" value={vehicle_type} onChange={(e)=>{const vehicle_type_val=e.target.value; set_vehicle_type(vehicle_type_val)}}/>
                <input type="text" autoFocus placeholder="Vehicle color" value={vehicle_color} onChange={(e)=>{const vehicle_color_val=e.target.value; set_vehicle_color(vehicle_color_val)}}/>
                <input type="text" autoFocus placeholder="Vehicle number" value={vehicle_number} onChange={(e)=>{const vehicle_number_val=e.target.value; set_vehicle_number(vehicle_number_val)}}/>
                <input type="text" autoFocus placeholder="Tracker ID" value={tracker_id} onChange={(e)=>{const tracker_id_val=e.target.value; set_tracker_id(tracker_id_val)}}/>
                <label htmlFor="isRunning">on journey</label>
                <input type="checkbox" id="isRunning" name="isRunning" checked={isRunning===1} value={isRunning}  onClick={(e)=>{ 
                    let isRunning_val;
                    if(e.target.checked){
                         isRunning_val=1;
                    }else{
                        isRunning_val=0;
                    }
                    set_isRunning(isRunning_val)}}/>
                <button type="submit">Save Vehicle</button>
            </form>
            
        </div>
    );
        
}

export default VehiclesForm;